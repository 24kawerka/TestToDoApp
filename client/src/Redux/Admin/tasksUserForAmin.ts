import { SET_NEW_TASK_LIST, SET_TASKS_FOR_ADMIN } from "../../Constants/actionTypeConstants"


type tasksForAdminType = {
    title: string | null,
    isDone: boolean | null,
    userId: number | null,
    updatedAt: string
}

type InitialTasksType = {
    listForAdmin: Array<tasksForAdminType>
}
const InitialTasks: InitialTasksType = {
    listForAdmin: []
}
type setTasksForAdminActionType = {
    type: typeof SET_TASKS_FOR_ADMIN,
    tasks: Array<tasksForAdminType>
}
type setNewTaskListActionType = {
    type: typeof SET_NEW_TASK_LIST,
    data: tasksForAdminType
}

type tasksUserForAdminActionType = setTasksForAdminActionType | setNewTaskListActionType

const tasksUserForAdminReducer = (state = InitialTasks, action: tasksUserForAdminActionType): InitialTasksType => {
    switch (action.type) {
        case SET_TASKS_FOR_ADMIN: {
            return {
                ...state,
                listForAdmin: action.tasks.map(p => p)
            }
        }
        case SET_NEW_TASK_LIST: {
            state.listForAdmin.push(action.data)
            return {
                ...state,
            }
        }
        default: return state
    }
}

const setTasksForAdmin = (tasks: Array<tasksForAdminType>) => {
    return {
        type: SET_TASKS_FOR_ADMIN,
        tasks
    }
}

const setNewTaskList = (data: tasksForAdminType) => {
    return {
        type: SET_NEW_TASK_LIST,
        data
    }
}

export { tasksUserForAdminReducer, setTasksForAdmin, setNewTaskList }

export type { tasksForAdminType }