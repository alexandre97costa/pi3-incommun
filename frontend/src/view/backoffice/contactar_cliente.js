import React, { useEffect, useState } from 'react';
import authService from '../auth.service';

export default function ContactarCliente(props) {

    const [titulo, setTitulo] = useState('Incommun - Orçamento para Serviço Personalizado')
    const [corpo, setCorpo] = useState('')

    useEffect(() => {

    }, [])

    function handleContactar(e) {

    }

    return (
        <>
            <button
                className='btn btn-warning w-100 fw-semibold'
                data-bs-toggle='modal'
                data-bs-target="#contactar-cliente-modal"
            >
                <i className='me-2 bi bi-send-fill'></i>
                Contactar cliente
            </button>

            <div className="modal fade" id="contactar-cliente-modal" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="criar-user-modal-label" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content rounded-4 border-0 bg-dark-secondary shadow">
                        <div className="modal-header border-0 rounded-0 bg-dark-secondary text-white">
                            <h5 className="modal-title d-flex flex-row" id="criar-user-modal-label">
                                <button
                                    className='btn btn-sm btn-outline-light border-0 align-top me-2'
                                    onClick={e => { document.querySelector('#btn-users-modal').click() }}
                                >
                                    <i className='bi bi-arrow-left'></i>
                                </button>
                                <div className='d-flex flex-column ms-2'>
                                    <span>
                                        Compor email
                                    </span>
                                    <span className='small fw-normal text-secondary'>
                                        {authService.getCurrentUser().email}
                                        <i className='bi bi-arrow-right mx-2'></i>
                                        {props.destinatario}
                                    </span>
                                </div>
                            </h5>
                            <button id='btn-close-criar-user' type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body rounded-4 bg-light border-0 shadow">
                            <form onSubmit={e => handleContactar(e)}>
                                <div className="form-floating mb-3">
                                    <input
                                        // id='user-username-input'
                                        className='form-control focus-warning text-dark rounded-3'
                                        type='text'
                                        maxLength={20}
                                        placeholder='titulo'
                                        autoComplete='none'
                                        autoCapitalize='words'
                                        required
                                        value={titulo}
                                        onChange={e => { setTitulo(e.target.value) }}
                                        onInput={e => {
                                            if (!e.target.validity.valid) {
                                                e.target.classList.add('focus-danger')

                                                if (e.target.validity.valueMissing) {
                                                    e.target.setCustomValidity('O corpo é de preenchimento obrigatório.')
                                                    e.target.reportValidity()
                                                } else {
                                                    e.target.setCustomValidity('')
                                                    e.target.classList.remove('focus-danger')
                                                }
                                            }
                                        }}
                                    />
                                    <label className='text-dark' htmlFor="user-username-input">Título</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <textarea
                                        // id='user-email-input'
                                        className='form-control focus-warning text-dark rounded-3'
                                        placeholder='corpo'
                                        autoComplete='none'
                                        autoCapitalize='none'
                                        required
                                        style={{ height: '10rem' }}
                                        value={corpo}
                                        onChange={e => { setCorpo(e.target.value) }}
                                        onInput={e => {
                                            if (!e.target.validity.valid) {
                                                e.target.classList.add('focus-danger')

                                                if (e.target.validity.valueMissing) {
                                                    e.target.setCustomValidity('O corpo é de preenchimento obrigatório.')
                                                    e.target.reportValidity()
                                                } else {
                                                    e.target.setCustomValidity('')
                                                    e.target.classList.remove('focus-danger')
                                                }
                                            }
                                        }}
                                    ></textarea>
                                    <label className='text-dark' htmlFor="user-email-input">Corpo</label>
                                </div>

                                <div className='w-100 d-flex justify-content-end'>
                                    <button id='btn-criar-user' type="submit" className="btn btn-warning rounded-3 ">
                                        {false &&
                                            <div className="spinner-border spinner-border-sm fs-6 text-dark me-2" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        }
                                        <span id='btn-criar-user-text'>Enviar</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}