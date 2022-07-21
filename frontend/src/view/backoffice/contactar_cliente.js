import React, { useEffect, useState } from 'react';
import axios from 'axios'
import ip from '../../ip';
import authService from '../auth.service';
import authHeader from '../auth-header';

export default function ContactarCliente(props) {

    const [assunto, setAssunto] = useState('Temos o seu orçamento pronto!')
    const [titulo, setTitulo] = useState('Incommun - Serviços personalizados à sua medida!')
    const [corpo, setCorpo] = useState('Escreve alguma coisa...')

    const [loading, setLoading] = useState(false)

    useEffect(() => {

    }, [])
    function Cancelar() {
        setAssunto("Temos o seu orçamento pronto!")
        setTitulo("Incommun - Serviços personalizados à sua medida!")
        setCorpo("Escreve alguma coisa.")

    }
    function handleContactar(e) {
        e.preventDefault();

        const btn = document.getElementById('contactar-cliente-btn')
        const btnText = document.getElementById('btn-criar-user-text')
        btnText.textContent = 'A enviar...'
        setLoading(true)

        setAssunto('')
        setTitulo('')
        setCorpo('')

        axios
            .post(
                ip + '/clientes/enviar_email',
                {
                    email_cliente: props.destinatario,
                    email_admin: authService.getCurrentUser()?.email,
                    assunto: assunto,
                    titulo: titulo,
                    corpo: corpo,

                },
                authHeader()
            )
            .then(res => {
                if (res.data.success) {
                    btnText.textContent = res.data.message
                    setLoading(false)

                    setTimeout(() => {
                        btn.click()
                        btnText.textContent = 'Enviar'
                        setAssunto('Temos o seu orçamento pronto!')
                        setTitulo('Incommun - Serviços personalizados à sua medida!')
                        setCorpo('Escreve alguma coisa...')
                    }, 1000);

                }
            })
    }

    return (
        <>
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
                                    <span className='small fw-normal text-secondary d-none'>
                                        <span>De: </span>
                                        <span className='text-secondary'>
                                            {authService.getCurrentUser()?.email ?? 'your@email.com'}
                                        </span>
                                    </span>
                                    <span className='small fw-normal text-secondary'>
                                        <i className='bi bi-arrow-right mx-2 d-none text-warning'></i>
                                        <span>Para: </span>
                                        <span className='text-secondary'>
                                            {props.destinatario}
                                        </span>
                                    </span>
                                </div>
                            </h5>
                            <button id='btn-close-criar-user' type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" onClick={() => Cancelar()} aria-label="Close"></button>
                        </div>
                        <div className="modal-body rounded-4 bg-light border-0 shadow">
                            <form onSubmit={e => handleContactar(e)}>
                                <div className="form-floating mb-3">
                                    <input
                                        // id='user-username-input'
                                        className='form-control focus-warning text-dark rounded-3'
                                        type='text'
                                        placeholder='titulo'
                                        autoComplete='none'
                                        autoCapitalize='words'
                                        required
                                        value={assunto}
                                        onChange={e => { setAssunto(e.target.value) }}
                                        onInput={e => {
                                            if (!e.target.validity.valid) {
                                                e.target.classList.add('focus-danger')

                                                if (e.target.validity.valueMissing) {
                                                    e.target.setCustomValidity('O assunto é de preenchimento obrigatório.')
                                                    e.target.reportValidity()
                                                } else {
                                                    e.target.setCustomValidity('')
                                                    e.target.classList.remove('focus-danger')
                                                }
                                            }
                                        }}
                                    />
                                    <label className='text-dark' htmlFor="user-username-input">Assunto</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        // id='user-username-input'
                                        className='form-control focus-warning text-dark rounded-3'
                                        type='text'
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
                                                    e.target.setCustomValidity('O titulo é de preenchimento obrigatório.')
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
                                        {loading &&
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