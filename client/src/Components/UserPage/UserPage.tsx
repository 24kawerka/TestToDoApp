import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TaskType } from '../../Redux/User/listReducer'
import UserSelector from '../../Redux/User/UserPageSelector'
import { Task } from './Task/Task'
import '../../Styles/User/userPage.scss'
import { UserInfo } from './UserInfo/UserInfo'
import { setUser, setIsAuth } from '../../Redux/User/userReducer'
import { useHistory } from 'react-router-dom'
import { LOGIN_ROUTE } from '../../Constants/routeConstants'
import { useForm } from 'react-hook-form'
import { createTaskThunk, getListThunk } from '../../Redux/Utils/createThunk'


const UserPage = () => {

    const list = useSelector(UserSelector.getUserList)
    const dispatch = useDispatch()
    const history = useHistory()
    const { handleSubmit, register } = useForm()

    useEffect((() => {
        dispatch(getListThunk)
    }), [])

    const logOut = () => {
        dispatch(setIsAuth(false))
        dispatch(setUser({}))
        history.push(LOGIN_ROUTE)
    }

    const onSubmit = (data: TaskType, e: any) => {
        dispatch(createTaskThunk(data))
        e.target.reset()
    }

    return (
        <div className='app-container'>
            <div className='app-wrapper'>
                <div className='user-info'>
                    <UserInfo />
                    <button onClick={logOut} className='log-out-button'>Выйти</button>
                </div>
                <div className='task-list'>
                    <form className="px-4 py-3" onSubmit={handleSubmit(onSubmit)}>
                        <div className='form-group'>
                            <input name="title" type="text" placeholder='Новая задача'
                                className="form-control" ref={register({ required: true })} />
                        </div>
                        <button type='submit'>Создать</button>
                    </form>
                    {list.map((task: TaskType) =>
                        <Task key={task.id} task={task} />
                    )}
                </div>
            </div>
        </div>
    )
}
export { UserPage }