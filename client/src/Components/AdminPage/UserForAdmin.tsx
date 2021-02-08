import React from 'react'
import { useDispatch } from 'react-redux'
import { changeIsActive, deleteUser, getAllUsers, getUserTasksForAdmin } from '../../http/userAPI'
import '../../Styles/Admin/admin.scss'
import { setTasksForAdmin } from '../../Redux/Admin/tasksUserForAmin'
import { getUsers, UsersType } from '../../Redux/Admin/usersReducer'



type UserType = {
    users: {
        firstName: string,
        lastName: string,
        id: number,
        isOnline: boolean
    }
}

const UserForAdmin = (props: UserType) => {
    const dispatch = useDispatch()
    const showUserTasks = (id: number) => {
        getUserTasksForAdmin(id).then(resp => {
            dispatch(setTasksForAdmin(
                resp.sort((a: any, b: any) => a.id - b.id)
            ))
        })
    }
    const deleteUserCreator = async (id: number) => {
        await deleteUser(id).then(responce => {
            getAllUsers().then(resp => {
                dispatch(getUsers(
                    resp.sort((a: any, b: any) => a.id - b.id).filter((user: UsersType) => user.role === 'USER')
                ))
            })
        })
    }
    const setIsActive = async (id: number) => {
        await changeIsActive(id).then(resp => {
            getAllUsers().then(resp => {
                dispatch(getUsers(
                    resp.sort((a: any, b: any) => a.id - b.id).filter((user: UsersType) => user.role === 'USER')
                ))
            })
            alert('Изменен статус пользователя!')
        })

    }
    return (
        <div className='user-list-container'>
            <button className='show-tasks'
                onClick={() => showUserTasks(props.users.id)} >
                {`${props.users.firstName} ${props.users.lastName}`}
            </button>
            {props.users.isOnline === true ?
                <button onClick={() => setIsActive(props.users.id)}>&#128274;</button>
                :
                <button onClick={() => setIsActive(props.users.id)}>&#128275;</button>
            }
            <button onClick={() => deleteUserCreator(props.users.id)}>x</button>

        </div>
    )
}



export { UserForAdmin }