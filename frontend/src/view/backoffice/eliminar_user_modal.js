import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ip from '../../ip'
import authHeader from '../auth-header'



export default function EliminarUserModalComponent(props) {

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')

    function handleEliminar(e) {
        e.preventDefault()
        setLoading(true)

        const body = { email: email }

        const btnEliminarUserText = document.querySelector('#btn-eliminar-user-text')

        axios
            .post(ip + '/user/delete', body, authHeader())
            .then(res => {
                console.log(res)
                setLoading(false)

                btnEliminarUserText.textContent = res.data.success ? 'Utilizador eliminado!' : res.data.message
                
                setTimeout(() => {
                    document.querySelector('#btn-users-modal').click()
                    btnEliminarUserText.textContent = 'Eliminar'
                    setEmail('')
                }, 3000);
            })
    }


    return (
        <div className="modal fade" id="eliminar-user-modal" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="eliminar-user-modal-label" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content rounded-4 border-0 bg-dark-secondary shadow">
                    <div className="modal-header border-0 rounded-0 bg-dark-secondary text-white">
                        <h5 className="modal-title" id="eliminar-user-modal-label">
                            <button
                                className='btn btn-sm btn-outline-light rounded-circle border-0 align-top me-2'
                                onClick={e => {document.querySelector('#btn-users-modal').click()}}
                                >
                                <i className='bi bi-arrow-left'></i>
                            </button>
                            Eliminar utilizador
                        </h5>
                        <button id='btn-close-eliminar-user' type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body rounded-4 bg-light border-0 shadow">
                        <form onSubmit={e => handleEliminar(e)}>

                            <div className="form-floating mb-3">
                                <input
                                    id='email-confirm-input'
                                    className='form-control focus-warning text-dark rounded-3'
                                    type='text'
                                    maxLength={63}
                                    placeholder='email'
                                    autoComplete='none'
                                    autoCapitalize='none'
                                    required
                                    value={email}
                                    onChange={e => { setEmail(e.target.value) }}
                                />
                                <label className='text-dark' htmlFor="user-email-input">Email</label>
                            </div>

                            <button id='btn-eliminar-user' type="submit" className="btn btn-danger w-100 rounded-3 ">
                                {loading &&
                                    <div className="spinner-border spinner-border-sm fs-6 text-dark me-2" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                }
                                <span id='btn-eliminar-user-text'>Eliminar</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}