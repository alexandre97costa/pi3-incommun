import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import AuthService from "../../view/auth.service";
import ip from '../../ip'

import LogoIncommun from '../../assets/imgs/logotipoincommun.png'



export default function LoginComponent() {

    const [loading, setLoading] = useState(false)
    const [userEmail, setUserEmail] = useState('')
    const [userPass, setUserPass] = useState('')
    const navigate = useNavigate()

    useEffect(() => {

    }, [])

    function handleLogin(e) {
        e.preventDefault()
        setLoading(true)
        let btn = e.nativeEvent.submitter
        let btnText = document.getElementById('login-btn-text')

        e.nativeEvent.submitter.classList.add('btn-danger')

        setTimeout(() => {
            e.nativeEvent.submitter.classList.remove('btn-danger')
        }, 3000);

        AuthService
            .login(userEmail, userPass)
            .then(res => {

                if (res.success) {
                    navigate('/back-office/inicio_v2')
                } else {
                    console.log(res)
                    setLoading(false)
                    btn.classList.add('btn-danger')
                    btnText.textContent = res.response.data.message
                    setTimeout(() => {
                        btn.classList.remove('btn-danger')
                        btnText.textContent = 'Entrar'
                    }, 3000);

                    // alert(res.response.data.message)
                }

            })
            .catch(error => { setLoading(false); alert(error); })
    }

    return (
        <div className='container-fluid vh-100 bg-dark-secondary text-light'>
            <div className='row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 h-100 d-flex flex-column justify-content-center align-items-center'>
                <div className='col p-0 mb-4'>
                    <Link to='/'>
                        <img className='w-100' src={LogoIncommun} alt="" />
                    </Link>
                </div>
                <div className='col mb-4 justify-content-center border p-4 rounded-0'>
                    <form onSubmit={e => handleLogin(e)}>
                        <div className='h3 mb-4'>
                            Login
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                id='user-email-input'
                                className='form-control focus-warning text-dark rounded-0'
                                type='email'
                                pattern='[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$'
                                maxLength={63}
                                placeholder='email'
                                autoComplete='email'
                                autoCapitalize='none'
                                required
                                value={userEmail}
                                onChange={e => { setUserEmail(e.target.value) }}
                                onInput={e => {
                                    if (!e.target.validity.valid) {
                                        e.target.classList.add('focus-danger')

                                        if (e.target.validity.patternMismatch) {
                                            e.target.setCustomValidity('Por favor, introduza um email válido.')
                                            e.target.reportValidity()
                                        } else if (e.target.validity.valueMissing) {
                                            e.target.setCustomValidity('O email é de preenchimento obrigatório.')
                                            e.target.reportValidity()
                                        } else if (e.target.validity.tooLong) {
                                            e.target.setCustomValidity('O seu email é demasiado grande. De certeza que está a inserir corretamente?')
                                            e.target.reportValidity()
                                        } else {
                                            e.target.setCustomValidity('')
                                            e.target.classList.remove('focus-danger')
                                        }
                                    }
                                }}
                            />
                            <label className='text-dark' htmlFor="floatingInput">Email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control focus-warning text-dark rounded-0"
                                id="user-pass-input"
                                placeholder="Password"
                                required
                                value={userPass}
                                onChange={e => { setUserPass(e.target.value) }}
                                onInput={e => {
                                    if (!e.target.validity.valid) {
                                        e.target.classList.add('focus-danger')

                                        if (e.target.validity.valueMissing) {
                                            e.target.setCustomValidity('A password é de preenchimento obrigatório.')
                                            e.target.reportValidity()
                                        } else {
                                            e.target.setCustomValidity('')
                                            e.target.classList.remove('focus-danger')
                                        }
                                    }
                                }}
                            />
                            <label className='text-dark' htmlFor="floatingPassword">Password</label>
                        </div>
                        <button className='btn btn-warning w-100 fs-5 py-2 rounded-0' type='submit' style={{ transition: '0.5s' }}>
                            {loading &&
                                <div className="spinner-border spinner-border-sm fs-6 text-dark me-2" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            }
                            <span id='login-btn-text'>Entrar</span>
                        </button>
                    </form>
                </div>
                <div className='col p-0 mb-4'>
                    <div className='small text-secondary lh-sm'>
                        Esta área é reservada a administradores da Incommun Creative Lab.
                        Como cliente, não precisa de se registar para usar os nossos serviços.
                        <Link to={'/'} className="link-secondary ms-2">Voltar à página inicial.</Link>
                    </div>
                </div>
            </div>
        </div>

    )
}