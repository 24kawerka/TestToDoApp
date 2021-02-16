import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../Styles/Admin/admin.scss'
import AdminSelector from '../../Redux/Admin/AdminPageSelector'
import { UsersType } from '../../Redux/Admin/usersReducer'
import { UserForAdmin } from './UserForAdmin'
import { getUserTasksForAdmin } from '../../http/userAPI'
import Admin from '../../Redux/Admin/AdminPageSelector'
import { setTasksForAdmin, tasksForAdminType } from '../../Redux/Admin/tasksUserForAmin'
import { setIsAuth, setUser } from '../../Redux/User/userReducer'
import { useHistory } from 'react-router-dom'
import { LOGIN_ROUTE } from '../../Constants/routeConstants'
import { socket } from '../../Constants/utilsConstants'
import { getAllUsersThunk, getUserTasksForAdminThunk, showUserTasksThunk } from '../../Redux/Utils/createThunk'



const AdminPage = () => {
    const users = useSelector(AdminSelector.getUsers)
    const tasks = useSelector(Admin.getTasksUserForAdmin)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getAllUsersThunk)
    }, [])
    useEffect(() => {
        socket.on('newUserRegister', () => {
            alert('Добавлен новый пользователь');
            dispatch(getAllUsersThunk)
        })
    }, [dispatch])
    const logOut = () => {
        dispatch(setIsAuth(false))
        dispatch(setUser({}))
        history.push(LOGIN_ROUTE)
    }
    useEffect(() => {
        socket.on('deleteTaskNotify', (data: any) => {
            dispatch(showUserTasksThunk(data.userId))
        })
    }, [dispatch])
    useEffect(() => {
        socket.on('createTaskNotify', (data: any) => {
            dispatch(getUserTasksForAdminThunk(data.userId))
        })
    }, [dispatch])
    useEffect(() => {
        socket.on('changeTaskNotify', (id: number) => {
            dispatch(getUserTasksForAdminThunk(id))
        })
    }, [dispatch])
    useEffect(() => {
        socket.on('doneTaskNotify', (newTaskId: any) => {
            dispatch(getUserTasksForAdminThunk(newTaskId))
        })
    }, [dispatch])
    useEffect(() => {
        socket.on('changeFirstNameNotify', (id: number) => {
            dispatch(getAllUsersThunk)
        })
    }, [dispatch])
    useEffect(() => {
        socket.on('changeLastNameNotify', (id: number) => {
            dispatch(getAllUsersThunk)
        })
    }, [dispatch])
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