import { socket } from "../../Constants/utilsConstants"
import { createTask, deleteTask, doneTask, getList } from "../../http/listAPI"
import { changeIsActive, deleteUser, getAllUsers, getUserTasksForAdmin } from "../../http/userAPI"
import { setTasksForAdmin } from "../Admin/tasksUserForAmin"
import { getUsers, UsersType } from "../Admin/usersReducer"
import { setUserList, TaskType } from "../User/listReducer"



const createTaskThunk = (data: TaskType) => async (dispatch: any) => {
    await createTask(data.title, data.isDone = false)
    getList().then((responce: any) => {
        dispatch(setUserList(
            responce.sort((a: any, b: any) => a.id - b.id)
        ))
        const createdItem = responce[responce.length - 1]
        socket.emit('createTask', createdItem)
    })
}

const doneTaskThunk = (newTask: any) => async (dispatch: any) => {
    await doneTask(newTask.id)
    getList().then((responce: any) => {
        dispatch(setUserList(
            responce.sort((a: any, b: any) => a.id - b.id)
        ))
    })
}
const deleteTaskCreatorThunk = (data: any) => async (dispatch: any) => {
    await deleteTask(data.id)
}
const deleteUserCreatorThunk = (id: number) => async (dispatch: any) => {
    await deleteUser(id).then(responce => {
        getAllUsers().then(resp => {
            dispatch(getUsers(
                resp.sort((a: any, b: any) => a.id - b.id).filter((user: UsersType) => user.role === 'USER')
            ))
        })
    })
}

const showUserTasksThunk = (id: number) => async (dispatch: any) => {
    await getUserTasksForAdmin(id).then(resp => {
        dispatch(setTasksForAdmin(
            resp.sort((a: any, b: any) => a.id - b.id)
        ))
    })
}
const setIsActiveThunk = (id: number) => async (dispatch: any) => {
    await changeIsActive(id).then(resp => {
        getAllUsers().then(resp => {
            dispatch(getUsers(
                resp.sort((a: any, b: any) => a.id - b.id).filter((user: UsersType) => user.role === 'USER')
            ))
        })
        alert('Изменен статус пользователя!')
    })
}
const getAllUsersThunk = async (dispatch: any) => {
    await getAllUsers().then(resp => {
        dispatch(getUsers(
            resp.sort((a: any, b: any) => a.id - b.id).filter((user: UsersType) => user.role === 'USER')
        ))
    })
}

const getUserTasksForAdminThunk = (newTaskId: number) => async (dispatch: any) => {
    await getUserTasksForAdmin(newTaskId).then(resp => {
        dispatch(setTasksForAdmin(
            resp.sort((a: any, b: any) => a.id - b.id)
        ))
    })

}
const getListThunk=async(dispatch:any)=>{
    getList().then((responce: any) => {
        dispatch(setUserList(
            responce.sort((a: any, b: any) => a.id - b.id)
        ))
    })
}

export {
    createTaskThunk, doneTaskThunk, deleteTaskCreatorThunk, deleteUserCreatorThunk, showUserTasksThunk, setIsActiveThunk,
    getAllUsersThunk, getUserTasksForAdminThunk,getListThunk
}