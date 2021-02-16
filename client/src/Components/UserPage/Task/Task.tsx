import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeTask, getList } from '../../../http/listAPI'
import '../../../Styles/User/task.scss'
import UserSelector from '../../../Redux/User/UserPageSelector'
import { setUserList, TaskType } from '../../../Redux/User/listReducer'
import { useForm } from 'react-hook-form'
import { doneTaskThunk, deleteTaskCreatorThunk } from '../../../Redux/Utils/createThunk'
import { socket } from '../../../Constants/utilsConstants'

type PropsTaskType = {
    task: {
        title: string,
        isDone: boolean,
        id: number,
        userId: number,
        updatedAt: string
    }
}

const Task = (props: PropsTaskType) => {
    const { handleSubmit, register } = useForm()
    const list = useSelector(UserSelector.getUserList)
    const dispatch = useDispatch()
    const [inputField, showInputField] = useState(1)


    //need changes local change task and create thunk
    const onSubmit = async (newTask: any) => {
        await changeTask(props.task.id, newTask.newTask, props.task.isDone).then(resp => {
            getList().then((responce: any) => {
                dispatch(setUserList(
                    responce.sort((a: any, b: any) => a.id - b.id)
                ))
            })
        })
        socket.emit('changeTask', props.task.userId)
        showInputField(1)
    }

    const deleteTaskCreator = (data: any) => {
        dispatch(deleteTaskCreatorThunk(data))
        const newList = list.filter((task: TaskType) => task.id !== data.id)
        dispatch(setUserList(
            newList.sort((a: any, b: any) => a.id - b.id)
        ))
        socket.emit('deleteTask', (data))
    }
    const doneTaskCreator = (newTask: any) => {
        dispatch(doneTaskThunk(newTask))
        socket.emit('doneTask', (props.task.userId))
    }
    const showTime = () => {
        alert(`Закончена ${props.task.updatedAt.slice(0, 10)} в ${props.task.updatedAt.slice(11, -5)}`)
    }

    return (
        <div className='task-container'>
            {inputField === 1 ?
                <div className='title-task-container'>
                    {props.task.isDone === false ?
                        <div className='title'>{props.task.title}</div>
                        :
                        <div className='title-done'>{props.task.title}</div>
                    }
                    {props.task.isDone === false ?
                        <button onClick={() => showInputField(2)} className='change-button'>Изменить</button>
                        :
                        null}
                </div>
                :
                <form className="form-inline" onSubmit={handleSubmit(onSubmit)}>
                    <div className='title-task-input'>
                        <div className="form-group mx-sm-3 mb-2">
                            <input type="text" name="newTask" placeholder={props.task.title}
                                ref={register({ required: true })} />
                        </div>
                        <button type="submit" className='submit-button'>&#10004;</button>
                        <button onClick={() => showInputField(1)} className='return-button'>&#10006;</button>
                    </div>
                </form>
            }
            {props.task.isDone === false ?
                <button onClick={() => doneTaskCreator(props.task)} className='done-button'>Завершить</button>
                :
                <>
                    <button className='done-button' onClick={showTime}>
                        Закончена
                </button>

                </>
            }
            <button onClick={() => deleteTaskCreator(props.task)} className='delete-button'>
                Удалить
                      </button>

        </div >
    )
}
export { Task }
