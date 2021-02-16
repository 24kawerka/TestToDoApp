import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { ADMIN_ROUTE, REGISTRATION_ROUTE, USER_ROUTE } from '../../Constants/routeConstants'
import { login } from '../../http/userAPI'
import { setIsAuth, setUser } from '../../Redux/User/userReducer'
import '../../Styles/auth.scss'


type DataLoginType = {
    email: string,
    password: string
}
const Auth = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { handleSubmit, register } = useForm()
    const onSubmit = async (data: DataLoginType, e: any) => {
        try {
            const responce: any = await login(data.email, data.password)
            dispatch(setUser(responce))
            dispatch(setIsAuth(true))
            e.target.reset()
            if (responce.role === "ADMIN") {
                history.push(ADMIN_ROUTE + `?id=${responce.id}`)
            } else {
                history.push(USER_ROUTE + `?id=${responce.id}`)
            }
        }
        catch (error) {
            e.target.reset()
            alert(error.request.response.slice(12, -2));

        }
    }

    return (
        <div className='container'>
            <div className='login-form'>
                <h1>TODO ПРИЛОЖЕНИЕ</h1>
                <form className="px-4 py-3" onSubmit={handleSubmit(onSubmit)}>
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
                    <div>
                        <button className="btn btn-primary" type="submit">
                            Войти
                    </button>
                        <NavLink to={REGISTRATION_ROUTE}><div className='regist-link'>Создать аккаунт</div></NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

export { Auth }
