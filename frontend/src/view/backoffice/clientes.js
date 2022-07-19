import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import NavDeLado from './navdelado';
import ip from '../../ip'
import authHeader from '../auth-header';
import { Link } from "react-router-dom"
import ContactarCliente from './contactar_cliente';
import authService from '../auth.service';

export default function ClientesComponent() {
    const [clientes, setClientes] = useState([])
    const [totalClientes, setTotalClientes] = useState(0)
    const [filtroCliente, setFiltroCliente] = useState('id')
    const [ordemCliente, setOrdemCliente] = useState('ASC')
    const [Email, setEmail] = useState("")
    const [assunto, setAssunto] = useState("Temos o seu orçamento pronto!")
    const [titulo, setTitulo] = useState("Incommun - Serviços personalizados à sua medida!")
    const [corpo, setCorpo] = useState("Escreve alguma coisa.")
    const [loading, setLoading] = useState(false)
    const [dicaDoDia, setDicaDoDia] = useState('')
    const [autorDica, setAutorDica] = useState('')

    useEffect(() => {
        // Get total de clientes
        // por defeito, sem mandar nenhuma query (nem estado nem dias),
        // conta todos os clientes dos ultimos 30 dias
        axios.get(ip + '/clientes/count?id=0&oquecontar=todos', authHeader())
            .then(res => {
                setTotalClientes(res.data.count)
            })
        // Get dica do dia
        axios.get('https://api.quotable.io/random?tags=success|inspirational|happiness')
            .then(res => {
                setAutorDica(res.data.author)
                setDicaDoDia(res.data.content)
            })
    }, [])

    useEffect(() => {

        axios.get(ip + '/clientes/list?ordem=' + ordemCliente + '&filtro=' + filtroCliente, authHeader())
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setClientes(data);

                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error)
            });
    }, [filtroCliente, ordemCliente])

    useEffect(() => {

        axios.get(ip + '/clientes/total', authHeader())
            .then(res => {
                setTotalClientes(res.data.data)
            });
    }, [])
    function handleFiltro(filtro, ordem, texto) {
        setFiltroCliente(filtro);
        setOrdemCliente(ordem);
        document.getElementById('dropdown-filtro').textContent = texto
    }
    function Cancelar() {

        setEmail("")
        setAssunto("Temos o seu orçamento pronto!")
        setTitulo("Incommun - Serviços personalizados à sua medida!")
        setCorpo("Escreve alguma coisa.")

    }
    function mudarEmail(id) {
        const div1 = document.getElementById(id)
        const exampleAttr = div1.getAttribute('data-email');
        setEmail(exampleAttr); 
    }
    function handleContactar(e) {
        e.preventDefault();

        const btn = document.getElementById('contactar-cliente-btn')
        const btnText = document.getElementById('btn-criar-user-text')
        btnText.textContent = 'A enviar...'
        setLoading(true)



        axios
            .post(
                ip + '/clientes/enviar_email',
                {
                    email_cliente: Email,
                    email_admin: authService.getCurrentUser()?.email,
                    assunto: assunto,
                    titulo: titulo,
                    corpo: corpo
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
    function LoadClientes() {
        return (
            clientes.map(cliente => {
                return (
                    <tr className='align-middle' key={cliente.id} id={cliente.id} data-email={cliente.email}>
                        {/* Cliente */}
                        <td className='text-start text-dark lh-sm'>
                            <span className='fs-5 fw-semibold position-relative'>
                                {cliente.nome}
                            </span>
                            <br></br>
                            <span className='badge p-0 fs-6 fw-semibold text-muted lh-sm'>
                                {cliente.empresa}
                            </span>
                        </td>
                        <td className='text-start text-dark lh-sm'>
                            <span className='fs-5 fw-semibold  position-relative'>
                                {cliente.email}
                            </span>
                            <br></br>
                            <span className='badge p-0 fs-6 fw-semibold text-muted lh-sm'>
                                {cliente.tlm}
                            </span>
                        </td>
                        
                        <td className='text-start text-dark lh-sm'>
                            <span className='fs-4 fw-semibold position-relative'>
                                {cliente.distrito}
                            </span>
                        </td>
                        <td  className=''>
                        <button data-bs-toggle="modal" data-bs-target="#contactar-cliente-modal" onClick={() => mudarEmail(cliente.id)} className='btn btn-warning w-100 fw-semibold' >
                                    <i className='me-2 bi bi-send-fill'></i>
                                    Contactar cliente
                                </button>
                        </td>
                        <td >
                            <Link to={"/back-office/clientes/" + cliente.id} className="btn btn-secondary  fs-6 bi-cash-stack me-2">&nbsp;Pedidos Cliente</Link>
                        </td>
                    </tr>
                )
            })
        )
    }
    return (
        
        <div className="col overflow-auto h-sm-100 px-5 pt-4 bg-light">
            {/* Titulo */}
            <div className="mb-3 row">
                <div className='col-6'>
                    <span className='h2 text-dark fw-bold'>
                        Clientes
                    </span>
                    <br />
                    <span className='fs-6 fw-normal text-muted'>
                        {'Foram criados ' + totalClientes + ' clientes nos últimos 30 dias.'}
                    </span>
                </div>

                {/*dica do dia*/}
                <div className='col-6 text-end'>
                    <span className='fs-5 lh-sm text-indigo fw-bold ' title={dicaDoDia + ' - ' + autorDica}>
                        Dica do dia :)
                    </span><br />
                    <span className=' p-2 badge fw-normal bg-light lh-sm text-secondary text-end text-wrap w-75'>
                        {dicaDoDia + ' ~' + autorDica}
                    </span>
                </div>
            </div>  
            <br />
            <div className="mb-3 row"> 
                <div className="row">
                    <div className="px-xxl-4 px-xl-3 px-sm-2 px-xs-1 col-12 col-sm-6 col-lg-3 align-self-center">
                        <div className="py-2 border rounded-4 bg-light d-flex w-100 flex-row justify-content-between align-items-center shadow p-3 bg-body rounded ">
                            <span className='me-1'>
                                <i className="m-0 fs-2  text-primary bi bi-people"></i>
                            </span>
                            &nbsp;&nbsp;
                            <span className='h5 text-dark '>
                                Total Clientes:
                            </span>
                            <span className='fw-bold fs-4 p-1'>
                                {totalClientes}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className="mb-3 row">
                <div className='col d-flex justify-content-start align-items-center fs-6 fw-normal text-muted'>
                    <span className='me-2'>
                        Ver na ordem de
                    </span>

                    <div className="dropdown bg-white me-2">
                        <button className=" btn btn-sm btn-outline-dark dropdown-toggle" type="button" id="dropdown-filtro" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className='me-2'></span>
                            Data de criação
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdown-filtro">
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('nome', 'ASC', e.target.textContent) }} type='button'>Nome de cliente (A-Z)</button></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('nome', 'DESC', e.target.textContent) }} type='button'>Nome de cliente (Z-A)</button></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('distrito', 'ASC', e.target.textContent) }} type='button'>Distrito (A-Z)</button></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('distrito', 'DESC', e.target.textContent) }} type='button'>Distrito (Z-A)</button></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('created_at', 'ASC', e.target.textContent) }} type='button'>Data de criação</button></li>
                        </ul>
                    </div>

                </div>
            </div>
            <div className="mb-3 row px-2">
                <div className='col p-3 bg-white rounded-4 border shadow'>
                    <table className='table'>
                        <thead>
                            <tr className=''>
                                <th className='text-start' style={{ width: '20%' }}>Nome</th>
                                <th className='text-start' style={{ width: '25%' }}>Contactos</th>
                                <th className='text-start' style={{ width: '15%' }}>Distrito</th>
                                <th className='text-center' style={{ width: '20%' }} colSpan={1}></th>
                                <th className='text-center' style={{ width: '20%' }} colSpan={1}></th>
                            </tr>
                        </thead>
                        <tbody>
                            <LoadClientes />
                        </tbody>
                    </table>
                </div>
            </div>

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
                                            {Email}
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
        </div>
    )

}