import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import NavDeLado from './navdelado';
import ip from '../../ip'
import authHeader from '../auth-header';
import { Link } from "react-router-dom"


export default function ClientesComponent() {
    const [clientes, setClientes] = useState([])
    const [totalClientes, setTotalClientes] = useState(0)
    const [filtroCliente, setFiltroCliente] = useState('id')
    const [ordemCliente, setOrdemCliente] = useState('ASC')
    const [Email, setEmail] = useState("")
    const [Assunto, setAssunto] = useState("")
    const [Titulo, setTitulo] = useState("")
    const [Corpo, setCorpo] = useState("")

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
        setAssunto("")
        setTitulo("")
        setCorpo("")

    }
    function mudarEmail(id) {
        const div1 = document.getElementById(id)
        const exampleAttr = div1.getAttribute('data-email');
        setEmail(exampleAttr);
    }
    function EnviarMail() {
        // url de backend

        const url = ip + '/clientes/enviar_email'
        const datapost = {
            email_cliente: Email,
            assunto: Assunto,
            titulo: Titulo,
            corpo: Corpo
        }
        setAssunto("")
        setTitulo("")
        setCorpo("")
        console.log(datapost);
        axios.post(url, datapost)
            .then(response => {
                if (response.data.success === true) {
                    alert(response.data.message)
                }

            }).catch(error => {
                alert("Error 34 " + error)
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
                        <td >

                            <button type="button" data-bs-toggle="modal" data-bs-target="#modal-contactar" onClick={() => mudarEmail(cliente.id)} className="me-2 bi bi-send-fill btn btn-warning w-100">&nbsp;Contactar Cliente</button>
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

            <div className="modal fade" id="modal-contactar" tabIndex="-1" aria-labelledby="modal-contactar-label" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg ">
                    <div className="modal-content border-0">
                        <div className="modal-header rounded-4 border-0">
                            <div className="modal-title fs-4 fw-light" id="exampleModalLabel">Contactar cliente</div>
                        </div>
                        <div className="modal-body">

                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={Email} onChange={(value) =>
                                    setEmail(value.target.value)} />
                                <label htmlFor="floatingInput">Email</label>
                            </div>
                            <div className="form-floating mb-3">
                                <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea" value={Assunto} onChange={(value) =>
                                    setAssunto(value.target.value)}></textarea>
                                <label htmlFor="floatingTextarea">Assunto</label>
                            </div>
                            <div className="form-floating mb-3">
                                <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea" value={Titulo} onChange={(value) =>
                                    setTitulo(value.target.value)}></textarea>
                                <label htmlFor="floatingTextarea">Título</label>
                            </div>
                            <div className="form-floating mb-3">
                                <textarea className="form-control" rows={4} placeholder="Leave a comment here" id="floatingTextarea" value={Corpo} onChange={(value) =>
                                    setCorpo(value.target.value)}></textarea>
                                <label htmlFor="floatingTextarea">Corpo</label>
                            </div>

                        </div>
                        <div className="modal-footer border-0">
                            <button type="button" className="btn btn-outline-secondary" onClick={() => Cancelar()} data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-warning fw-semibold" onClick={() => EnviarMail()}>Enviar email</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}