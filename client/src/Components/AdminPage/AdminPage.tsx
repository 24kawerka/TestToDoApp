import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../Styles/Admin/admin.scss'
import AdminSelector from '../../Redux/Admin/AdminPageSelector'
import { getUsers, UsersType } from '../../Redux/Admin/usersReducer'
import { UserForAdmin } from './UserForAdmin'
import { getAllUsers, getUserTasksForAdmin } from '../../http/userAPI'
import Admin from '../../Redux/Admin/AdminPageSelector'
import { setTasksForAdmin, tasksForAdminType } from '../../Redux/Admin/tasksUserForAmin'
import { setIsAuth, setUser } from '../../Redux/User/userReducer'
import { useHistory } from 'react-router-dom'
import { LOGIN_ROUTE } from '../../Constants/routeConstants'
import { socket } from '../../Constants/utilsConstants'



const AdminPage = () => {
    const users = useSelector(AdminSelector.getUsers)
    const tasks = useSelector(Admin.getTasksUserForAdmin)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        getAllUsers().then(resp => {
            dispatch(getUsers(
                resp.sort((a: any, b: any) => a.id - b.id).filter((user: UsersType) => user.role === 'USER')
            ))
        })
    }, [])
    useEffect(() => {
        socket.on('newUserRegister', () => {
            alert('Добавлен новый пользователь');
            getAllUsers().then(resp => {
                dispatch(getUsers(
                    resp.sort((a: any, b: any) => a.id - b.id).filter((user: UsersType) => user.role === 'USER')
                ))
            })

        })
    }, [socket])
    const logOut = () => {
        dispatch(setIsAuth(false))
        dispatch(setUser({}))
        history.push(LOGIN_ROUTE)
    }
    useEffect(() => {
        socket.on('deleteTaskNotify', (data: any) => {
            getUserTasksForAdmin(data.userId).then(resp => {
                dispatch(setTasksForAdmin(
                    resp.sort((a: any, b: any) => a.id - b.id)
                ))
            })
        })
    }, [socket, dispatch])
    useEffect(() => {
        socket.on('createTaskNotify', (data: any) => {
            getUserTasksForAdmin(data.userId).then(resp => {
                dispatch(setTasksForAdmin(
                    resp.sort((a: any, b: any) => a.id - b.id)
                ))
            })
        })
    }, [socket, dispatch])
    useEffect(() => {
        socket.on('changeTaskNotify', (newTask: any) => {
            getUserTasksForAdmin(newTask).then(resp => {
                dispatch(setTasksForAdmin(
                    resp.sort((a: any, b: any) => a.id - b.id)
                ))
            })
        })
    }, [socket, dispatch])
    useEffect(() => {
        socket.on('doneTaskNotify', (newTaskId: any) => {
            getUserTasksForAdmin(newTaskId).then(resp => {
                dispatch(setTasksForAdmin(
                    resp.sort((a: any, b: any) => a.id - b.id)
                ))
            })
        })
    }, [socket, dispatch])
    useEffect(() => {
        socket.on('changeFirstNameNotify', (id: number) => {
            getAllUsers().then(resp => {
                dispatch(getUsers(
                    resp.sort((a: any, b: any) => a.id - b.id).filter((user: UsersType) => user.role === 'USER')
                ))
            })
        })
    }, [socket, dispatch])
    useEffect(() => {
        socket.on('changeLastNameNotify', (id: number) => {
            getAllUsers().then(resp => {
                dispatch(getUsers(
                    resp.sort((a: any, b: any) => a.id - b.id).filter((user: UsersType) => user.role === 'USER')
                ))
            })
        })
    }, [socket, dispatch])
    return (
        <div className='admin-container'>
            <div className='wrapper'>
                <div className='users-side' >
                    <h2>Пользователи</h2>
                    <div>
                        {users.map((users: UsersType) =>
                            <UserForAdmin key={users.id} users={users} />
                        )}
                    </div>
                </div>
                <div className='tasks-side'>
                    <div className='tasks-title'>
                        <h2>Список задач</h2>
                        <button className='log-out' onClick={logOut}>Выйти</button>
                    </div>
                    <div>
                        {tasks.map((task: tasksForAdminType, index: number) =>
                            <div key={index}>
                                {task.isDone === false ?
                                    <div className='user-task' >{task.title}</div>
                                    :
                                    <div className='task-done-wrapper'>
                                        <span className='user-task-done' >{task.title} </span>
                                        <span className='doneTime'>
                                            Закончена {task.updatedAt.slice(0, 10)} в {task.updatedAt.slice(11, -5)}
                                        </span>
                                    </div>
                                }
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export { AdminPage }