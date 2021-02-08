import React from 'react'
import { useForm } from 'react-hook-form'
import { registration } from '../../http/userAPI'
import '../../Styles/auth.scss'
import { setIsAuth, setUser } from '../../Redux/User/userReducer'
import { useHistory } from 'react-router-dom'
import { LOGIN_ROUTE } from '../../Constants/routeConstants'
import { useDispatch } from 'react-redux'
import { socket } from '../../Constants/utilsConstants'


const Registration = () => {
    const { handleSubmit, register } = useForm()
    const history = useHistory()
    const dispatch = useDispatch()

    const onSubmit = async (data: any) => {
        const responce = await registration(data.email, data.password, data.firstName, data.lastName)
        dispatch(setUser(responce))
        dispatch(setIsAuth(true))
        socket.emit('newUser')
        history.push(LOGIN_ROUTE)
    }
    return (
        <div className='container'>
            <div className='login-form'>
                <h1>РЕГИСТРАЦИЯ</h1>
                <form className="px-4 py-3" onSubmit={handleSubmit(onSubmit)}>
                    <div className='form-group'>
                        <label className="form-label">Имя</label>
                        <input name="firstName" type="text" placeholder='Введите имя'
                            className="form-control"
                            ref={register({ required: true })} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Фамилия</label>
                        <input name="lastName" className="form-control" type="text" placeholder='Фамилия'
                            ref={register({ required: true })} />
                    </div>
                    <div className='form-group'>
                        <label className="form-label">Email</label>
                        <input name="email" type="text" placeholder='email@gmail.com'
                            className="form-control" ref={register({ required: true })} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Пароль</label>
                        <input name="password" className="form-control" type="password" placeholder='Пароль'
                            ref={register({ required: true })}
                        />
                    </div>
                    <button className="btn btn-primary" type='submit' >
                        Создать
                    </button>
                </form>
            </div>
        </div>
    )
}

export { Registration }
