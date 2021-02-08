import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import userSelector from '../../../Redux/User/UserPageSelector'
import '../../../Styles/User/userInfo.scss'
import { UserType } from '../../../Redux/User/userReducer'
import { changeFirstName, changeLastName } from '../../../http/userAPI'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { LOGIN_ROUTE } from '../../../Constants/routeConstants'
import { socket } from '../../../Constants/utilsConstants'

const UserInfo = () => {
    const user: UserType = useSelector(userSelector.getUser)
    const { handleSubmit, register } = useForm()
    const history = useHistory()
    const [firstNameInput, showFirstNameInput] = useState(1)
    const [lastNameInput, showLastNameInput] = useState(1)

    type newFirstNameType = {
        newFirstName: string
    }
    type newLastNameType = {
        newLastName: string
    }
    const changeUserFirstName = (newFirstName: newFirstNameType) => {
        changeFirstName(user.id, newFirstName.newFirstName).then(resp => {
            socket.emit('changeFirstName', user.id)
            alert('Имя изменено, перезайдите в аккаунт');
            history.push(LOGIN_ROUTE)

        })
    }
    const changeUserLastName = (newLastName: newLastNameType) => {
        changeLastName(user.id, newLastName.newLastName).then(resp => {
            socket.emit('changeLastName', user.id)
            alert('Фамилия изменена, перезайдите в аккаунт');
            history.push(LOGIN_ROUTE)
        })
    }
    return (
        <div>
            <div className='name-container'>
                {firstNameInput === 1 ?
                    <> <div className='name'>{user.firstName}</div>
                        <button className='change-name-button' onClick={() => showFirstNameInput(2)}>Сменить</button></>
                    :
                    <div>
                        <form className="form-inline" onSubmit={handleSubmit(changeUserFirstName)}>
                            <div className='user-input'>
                                <div className="form-group mx-sm-3 mb-2">
                                    <input type="text" name="newFirstName" placeholder='Имя' className='input-field'
                                        ref={register({ required: true })} />
                                </div>
                                <button type="submit" className='submit-user-button'>&#10004;</button>
                                <button onClick={() => showFirstNameInput(1)} className='return-user-button'>&#10006;</button>
                            </div>
                        </form>
                    </div>
                }
            </div>
            <div className='name-container'>
                {lastNameInput === 1 ?
                    <> <div className='name'>{user.lastName}</div>
                        <button className='change-name-button' onClick={() => showLastNameInput(2)}>Сменить</button></>
                    :
                    <div>
                        <form className="form-inline" onSubmit={handleSubmit(changeUserLastName)}>
                            <div className='user-input'>
                                <div className="form-group mx-sm-3 mb-2">
                                    <input type="text" name="newLastName" placeholder='Фамилия'
                                        ref={register({ required: true })} />
                                </div>
                                <button type="submit" className='submit-user-button'>&#10004;</button>
                                <button onClick={() => showLastNameInput(1)} className='return-user-button'>&#10006;</button>
                            </div>
                        </form>
                    </div>
                }


            </div>
        </div >
    )
}
export { UserInfo }