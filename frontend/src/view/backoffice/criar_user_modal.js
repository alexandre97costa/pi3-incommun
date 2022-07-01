import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ip from '../../ip'
import authHeader from '../auth-header'



export default function CriarUserModalComponent(props) {

    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleCriar(e) {
        e.preventDefault()
        setLoading(true)
        
        axios
        .post(ip + 'user/register', {
            username: username,
            email: email,
            password: password,
            role: 1
        }, authHeader())
            .then(res => {
                console.log(res)
                setLoading(false)
                // document.querySelector('#btn-close-criar-user').click()
            })
    }


    return (
        <div className="modal fade" id="criar-user-modal" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="criar-user-modal-label" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content rounded-4 border-0 bg-dark-secondary shadow">
                    <div className="modal-header border-0 rounded-0 bg-dark-secondary text-white">
                        <h5 className="modal-title" id="criar-user-modal-label">Criar novo utilizador</h5>
                        <button id='btn-close-criar-user' type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body rounded-4 bg-light border-0 shadow">
                        <form onSubmit={e => handleCriar(e)}>
                            <div className="form-floating mb-3">
                                <input
                                    id='user-username-input'
                                    className='form-control focus-warning text-dark rounded-3'
                                    type='text'
                                    maxLength={20}
                                    placeholder='username'
                                    autoComplete='none'
                                    autoCapitalize='words'
                                    required
                                    value={username}
                                    onChange={e => { setUsername(e.target.value) }}
                                    onInput={e => {
                                        if (!e.target.validity.valid) {
                                            e.target.classList.add('focus-danger')

                                            if (e.target.validity.valueMissing) {
                                                e.target.setCustomValidity('O nome é de preenchimento obrigatório.')
                                                e.target.reportValidity()
                                            } else if (e.target.validity.tooLong) {
                                                e.target.setCustomValidity('O seu nome é demasiado grande. Basta o primeiro!')
                                                e.target.reportValidity()
                                            } else {
                                                e.target.setCustomValidity('')
                                                e.target.classList.remove('focus-danger')
                                            }
                                        }
                                    }}
                                />
                                <label className='text-dark' htmlFor="floatingInput">Nome</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    id='user-email-input'
                                    className='form-control focus-warning text-dark rounded-3'
                                    type='email'
                                    pattern='[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$'
                                    maxLength={63}
                                    placeholder='email'
                                    autoComplete='email'
                                    autoCapitalize='none'
                                    required
                                    value={email}
                                    onChange={e => { setEmail(e.target.value) }}
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
                                    className="form-control focus-warning text-dark rounded-3"
                                    id="user-pass-input"
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={e => { setPassword(e.target.value) }}
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


                            <button type="submit" className="btn btn-warning w-100 rounded-3 fs-5">
                                {loading &&
                                    <div className="spinner-border spinner-border-sm fs-6 text-dark me-2" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                }
                                Criar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}