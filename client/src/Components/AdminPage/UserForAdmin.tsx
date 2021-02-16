import React from 'react'
import { useDispatch } from 'react-redux'
import '../../Styles/Admin/admin.scss'
import { deleteUserCreatorThunk, setIsActiveThunk, showUserTasksThunk } from '../../Redux/Utils/createThunk'



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
        dispatch(showUserTasksThunk(id))
    }
    const deleteUserCreator = (id: number) => {
        dispatch(deleteUserCreatorThunk(id))
    }
    const setIsActive = (id: number) => {
        dispatch(setIsActiveThunk(id))
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