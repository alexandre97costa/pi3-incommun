import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import NavDeLado from './navdelado'
import Count from './count'
import ip from '../../ip'

export default function ClientesComponent() {
    const [clientes, setClientes] = useState([])
    const [totalClientes, setTotalClientes] = useState(0)
    const [estados, setEstados] = useState([])
    const [filtroEstadoCliente, setFiltroEstadoCliente] = useState(0)
    const [filtroEstadoClienteDesc, setFiltroEstadoClienteDesc] = useState('Todos os clientes')

    const [dicaDoDia, setDicaDoDia] = useState('')
    const [autorDica, setAutorDica] = useState('')

    /*useEffect(() => {
        // Get os pedidos todos (por vezes filtrados e ordenados)
        axios.get('http://' + ip + ':4011/Clientes/all?estado_id=' + filtroEstadoCliente)
            .then(res => {
                // console.log(res.data)
                setClientes(res.data)
            })
    }, [filtroEstadoCliente])*/
    useEffect(() => {
        axios.get('http://localhost:4011/clientes/list')
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
    }, [])

    useEffect(() => {

        axios.get('http://localhost:4011/clientes/total')
        .then(res => {
            setTotalClientes(res.data.data)
        });
    }, [])

    /*useEffect(() => {

        // Get total de pedidos
        // por defeito, sem mandar nenhuma query (nem estado nem dias),
        // conta todos os pedidos dos ultimos 30 dias
        axios.get('http://' + ip + ':4011/clientes/all')
            .then(res => {
                setTotalClientes(res.data.count)
            })

        // Get os estados todos que houver na bd (para o filtro/dropdown)
        axios.get('http://' + ip + ':4011/pedidos/all_estados')
            .then(res => {
                setEstados(res.data)
            })

        // Get dica do dia
        axios.get('https://api.quotable.io/random?tags=success|inspirational|happiness')
            .then(res => {
                setAutorDica(res.data.author)
                setDicaDoDia(res.data.content)
            })


    }, [])*/


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
                        <button type="button" className="btn btn-dark fs-6 bi-send me-2">Detalhes Cliente</button>
                        </td>
                        
                    </tr>
                )
            })
        )
    }
    
    function LoadEstados() {
        return (
            estados.map(estado => {
                return (
                    <li key={estado.id}>
                        <button
                            className="dropdown-item"
                            type='button'
                            onClick={e => {
                                setFiltroEstadoCliente(estado.id)
                                setFiltroEstadoClienteDesc(estado.descricao + 's')
                            }}
                        >
                            {estado.descricao + 's'}
                        </button>
                    </li>
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
                        <div className='col-6 text-end'>
                            <span className='fs-5 lh-sm text-indigo fw-bold ' title={dicaDoDia + ' - ' + autorDica}>
                                Dica do dia :)
                            </span><br />
                            <span className=' p-2 badge fw-normal bg-light lh-sm text-secondary text-end text-wrap w-75'>
                                {dicaDoDia + ' ~' + autorDica}
                            </span>
                        </div>
                    </div>
                    

                    <div className="mb-3 row">
                        <div className='col d-flex justify-content-start align-items-center fs-6 fw-normal text-muted'>
                            <span className='me-2'>
                                Ver
                            </span>

                            <div className="dropdown bg-white me-2">
                                <button className=" btn btn-sm btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className='me-2'>{setFiltroEstadoClienteDesc}</span>
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            type='button'
                                            onClick={e => {
                                                setFiltroEstadoCliente(0)
                                                setFiltroEstadoClienteDesc('Todos os clientes')
                                            }}>
                                            Todos os Clientes
                                        </button>
                                    </li>
                                   
                                    <li><hr className="dropdown-divider" /></li>
                                    <LoadEstados />
                                </ul>
                            </div>

                            <span className='me-2'>
                                na ordem de
                            </span>

                            <div className="dropdown bg-white me-2">
                                <button className=" btn btn-sm btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className='me-2'></span>
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><button className="dropdown-item" onClick={e => { }} type='button'>Nome de cliente (A-Z)</button></li>
                                    <li><button className="dropdown-item" onClick={e => { }} type='button'>Nome de cliente (Z-A)</button></li>
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
        </div>

    )
    
}
