import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import AuthService from "../../view/auth.service";
import ip from '../../ip'

import LogoIncommun from '../../assets/imgs/logotipoincommun.png'



export default function PedidosComponent() {

    const [loading, setLoading] = useState(false)
    const [userEmail, setUserEmail] = useState('')
    const [userPass, setUserPass] = useState('')
    const navigate = useNavigate()

    useEffect(() => {

    }, [])

    function handleLogin(e) {
        e.preventDefault()
        setLoading(true)

        AuthService
            .login(userEmail, userPass)
            .then(res => {
                // que raio de verificação de dados fds
                // todo: melhorar a verificação que o powerpoint nao ta com nada
                if (res === '' || res === false) {
                    alert('Autenticação falhou.')
                    setLoading(false)
                } else {
                    navigate('/')
                }
            })
            .catch(error => { alert(error); throw new Error(error) })
    }

    return (
        <div className='container-fluid vh-100 bg-dark-secondary text-light'>
            <div className='row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 h-100 d-flex flex-column justify-content-center align-items-center'>
                <div className='col mb-4'>
                    <img className='w-100' src={LogoIncommun} alt="" />
                </div>
                <div className='col mb-3 justify-content-center border p-4 rounded-3'>
                    <form onSubmit={e => handleLogin(e)}>
                        <div className='h3 mb-3'>
                            Login
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                id='user-email-input'
                                className='form-control focus-warning text-dark'
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
                            <label className='text-dark' htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control focus-warning text-dark"
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
                        <button className='btn btn-warning w-100 fs-5 py-2' type='submit'>
                            {loading &&
                                <div className="spinner-border spinner-border-sm fs-6 text-dark me-2" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            }
                            Entrar
                        </button>
                    </form>
                </div>
                <div className='col mb-4'>
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