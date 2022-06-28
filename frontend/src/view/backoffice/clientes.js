import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import NavDeLado from './navdelado'
import Count from './count'
import ip from '../../ip'
import mailImg from '../../assets/imgs/mail2.png'

export default function ClientesComponent() {
    const [clientes, setClientes] = useState([])
    const [totalClientes, setTotalClientes] = useState(0)
    const [filtroCliente, setFiltroCliente] = useState(0)


    
    useEffect(() => {
        axios.get(ip + '/clientes/list?filtro=' + filtroCliente)
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
    }, [filtroCliente])

    useEffect(() => {

        axios.get(ip + '/clientes/total')
        .then(res => {
            setTotalClientes(res.data.data)
        });
    }, [])

    
    function LoadClientes() {
        return (
            clientes.map(cliente => {
                return (
                    <tr className='align-middle' key={cliente.id}>
                        {/* Data */}
                        <td className='text-center '>
                            <span className='text-muted badge fw-normal align-middle'>
                                {cliente.id}
                            </span>
                        </td>
                        {/* Cliente */}
                        <td className='text-start text-dark lh-sm'>
                            <span className='fs-5 fw-semibold position-relative'>
                                {cliente.nome}
                            </span>
                        </td>
                        <td className='text-start text-dark lh-sm'>
                            <span className='fs-5 fw-semibold position-relative'>
                                {cliente.email}
                            </span>
                        </td>
                        <td className='text-start text-dark lh-sm'>
                            <span className='fs-5 fw-semibold position-relative'>
                                {cliente.tlm}
                            </span>
                        </td>
                        <td >
                        <button type="button" className="btn btn-warning fs-6 bi-cash-stack me-2">Pedidos Cliente</button>
                        </td>
                        <td >
                        <button type="button" data-bs-toggle="modal" data-bs-target="#modal-contactar" className="btn btn-secondary fs-6 bi-send ">Contactar Cliente</button>
                        </td>
                        
                    </tr>
                )
            })
        )
    }
    
  
    return (
        <div className="container-fluid">
            <div className="row vh-100">

                {/* <NavDeLado /> */}
                <NavDeLado />

                <div className="col overflow-auto h-sm-100 px-5 pt-4">

                    {/* Titulo */}
                    <div className="mb-3 row">
                        <div className='col-6'>
                            <span className='h2 text-dark fw-bold'>
                                Clientes
                                
                            </span>
                           
                            <br />
                            <br />
                            <div
								class="py-2 border rounded-4 bg-light d-flex w-50 flex-row justify-content-between align-items-center shadow p-3 bg-body rounded">
                            <span className='h5 text-dark fw-bold'>
                            <i class="m-0 fs-2  text-primary bi bi-people"></i>
                            &nbsp;{'Total Clientes: ' + totalClientes}
                                
                            </span>
                            </div>
                            <br />
                            
                        </div>
                        
                    </div>
                    

                    <div className="mb-3 row">
                        <div className='col d-flex justify-content-start align-items-center fs-6 fw-normal text-muted'>
                            <span className='me-2'>
                                Ver na ordem de
                            </span>

                            <div className="dropdown bg-white me-2">
                                <button className=" btn btn-sm btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className='me-2'></span>
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><button className="dropdown-item" onClick={e => {setFiltroCliente(1) }} type='button'>Nome de cliente (A-Z)</button></li>
                                    <li><button className="dropdown-item" onClick={e => {setFiltroCliente(2) }} type='button'>Nome de cliente (Z-A)</button></li>
                                    <li><button className="dropdown-item" onClick={e => {setFiltroCliente(3) }} type='button'>ID</button></li>
                                    <li><button className="dropdown-item" onClick={e => {setFiltroCliente(4) }} type='button'>Data de criação</button></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className="mb-3 row px-2">
            <div className='col p-3 bg-white rounded-4 border shadow'>
                <table className='table'>
                    <thead>
                        <tr className=''>
                            <th className='text-center' style={{ width: '10%' }}>ID</th>
                            <th className='text-start' style={{ width: '20%' }}>Nome</th>
                            <th className='text-start' style={{ width: '15%' }}>Email</th>
                            <th className='text-start' style={{ width: '15%' }}>Telemóvel</th>
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
                    
                  
                </div>

            </div>
            <div className="modal fade" id="modal-contactar" tabIndex="-1" aria-labelledby="modal-contactar-label" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg ">
                    {/* Versão 1 */}
                    <div className="d-none modal-content border-0 rounded-0">
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col-4 bg-dark text-light p-3 pb-0 d-flex flex-column justify-content-between'>
                                    <div className="modal-header border-0">
                                        <div className="fs-1 fw-light text-warning modal-title" id="modal-contactar-label">Contactar cliente</div>
                                    </div>
                                    <img className='img-fluid' style={{}} src={mailImg} alt="" />
                                </div>

                                <div className='col-8 bg-light p-3  '>
                                    <div className="modal-body">
                                        ...
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-outline-secondary rounded-0" data-bs-dismiss="modal">Cancelar</button>
                                        <button type="button" className="btn btn-warning rounded-0 fw-semibold">Enviar email</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Versão 2 */}
                    <div className="modal-content border-0">
                        <div className="modal-header rounded-4 border-0">
                            <div className="modal-title fs-4 fw-light" id="exampleModalLabel">Contactar cliente</div>
                        </div>
                        <div className="modal-body">

                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                                    <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating">
                                <textarea className="form-control" rows={4} placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                                <label htmlFor="floatingTextarea">Comments</label>
                            </div>

                        </div>
                        <div className="modal-footer border-0">
                            <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-warning fw-semibold">Enviar email</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
    
}
