import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import NavDeLado from './navdelado'
import Count from './count'
import ip from '../../ip'

export default function PedidosComponent() {

    const [pedidos, setPedidos] = useState([])
    const [totalPedidos, setTotalPedidos] = useState(0)
    const [estados, setEstados] = useState([])

    const [dicaDoDia, setDicaDoDia] = useState('')
    const [autorDica, setAutorDica] = useState('')

    useEffect(() => {
        // Get os pedidos todos
        axios.get('http://' + ip + ':4011/pedidos/all')
            .then(res => {
                // console.log(res.data)
                setPedidos(res.data)
            })

        // Get total de pedidos
        // por defeito, sem mandar nenhuma query (nem estado nem dias),
        // conta todos os pedidos dos ultimos 30 dias
        axios.get('http://' + ip + ':4011/pedidos/count')
            .then(res => {
                setTotalPedidos(res.data.count)
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


    }, [])


    function LoadPedidos() {
        return (
            pedidos.map(pedido => {
                return (
                    <tr className='align-middle' key={pedido.id}>
                        {/* Data */}
                        <td className='text-center '>
                            <span className='text-muted badge fw-normal align-middle'>
                                {new Date(pedido.created_at).toISOString().split('T')[0]}
                            </span>
                        </td>
                        {/* Cliente */}
                        <td className='text-start text-dark lh-sm'>
                            <span className='fs-5 fw-semibold position-relative'>
                                {pedido.cliente.nome}
                            </span>
                            <span className='d-none fs-5 fw-semibold text-warning ms-2 '>
                                {'#' + pedido.cliente_id}
                            </span>
                            <br />
                            <span className='badge p-0 fw-semibold text-light-dark lh-sm'>
                                {pedido.cliente.empresa}
                            </span>
                        </td>
                        {/* Estado */}
                        <td className='text-start'>
                            <span
                                className={'badge text-start w-100 fw-semibold bg-' + pedido.estado_pedido.cor + '-semi text-' + pedido.estado_pedido.cor + ' fs-6'}
                                title={pedido.estado_pedido.obs}
                            >
                                <i className={'me-2 bi ' + pedido.estado_pedido.icon}></i>
                                {pedido.estado_pedido.descricao}
                            </span>
                        </td>
                        {/* Valor */}
                        <td className='text-end text-success fs-4 pe-3'>
                            {pedido.preco_total.toFixed(2)}
                        </td>

                        {/* Opções */}
                        <td className=''>
                            {(pedido.estado_id === 1 || pedido.estado_id === 2) &&
                                <button className='btn btn-warning w-100 fw-semibold' >
                                    <i className='me-2 bi bi-send-fill'></i>
                                    Contactar cliente
                                </button>
                            }
                            {(pedido.estado_id === 3 || pedido.estado_id === 4) &&
                                <button className='btn btn-warning w-100' disabled>
                                    <i className='me-2 bi bi-send-slash-fill'></i>
                                    Contactar cliente
                                </button>
                            }
                        </td>

                        <td className=''>
                            <button className='btn btn-secondary w-100'>
                                <i className='me-2 bi bi-card-checklist'></i>
                                Ver pedido
                            </button>
                        </td>

                        <td className=''>
                            <button className='btn btn-outline-secondary w-100'>

                                <i className='bi bi-gear-fill'></i>
                            </button>
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
                        <button className="dropdown-item" type='button'>
                            {estado.descricao + 's'}
                        </button>
                    </li>
                )
            })
        )
    }

    return (
        <div className="container-fluid bg-light">
            <div className="row vh-100">

                <NavDeLado />

                <div className="col overflow-auto h-sm-100 px-5 pt-4">

                    {/* Titulo */}
                    <div className="mb-3 row">
                        <div className='col-6'>
                            <span className='h2 text-dark fw-bold'>
                                Pedidos
                            </span>
                            <br />
                            <span className='fs-6 fw-normal text-muted'>
                                {'Foram criados ' + totalPedidos + ' pedidos nos últimos 30 dias.'}
                            </span>
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
                    <div className='mb-4 g-3 row row-cols-1 row-cols-md-2 row-cols-lg-4 row-cols-xl-4'>
                        <Count estadoId={1} />
                        <Count estadoId={2} />
                        <Count estadoId={3} />
                        <Count estadoId={4} />

                    </div>

                    <div className="mb-3 row">
                        <div className='col d-flex justify-content-start align-items-center fs-6 fw-normal text-muted'>
                            <span className='me-2'>
                                Ver
                            </span>

                            <div className="dropdown bg-white me-2">
                                <button className=" btn btn-sm btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className='me-2'>Todos os pedidos</span>
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><button className="dropdown-item" type='button'>Todos os pedidos</button></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <LoadEstados />
                                </ul>
                            </div>

                            <span className='me-2'>
                                na ordem de
                            </span>

                            <div className="dropdown bg-white me-2">
                                <button className=" btn btn-sm btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className='me-2'>mais recentes primeiro</span>
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><button className="dropdown-item" type='button'>Action</button></li>
                                    <li><button className="dropdown-item" type='button'>Another action</button></li>
                                    <li><button className="dropdown-item" type='button'>Something else here</button></li>
                                </ul>
                            </div>

                        </div>
                        {/* TODO Filtros */}
                    </div>

                    <div className="mb-3 row px-2">
                        <div className='col p-3 bg-white rounded-4 border shadow'>
                            <table className='table'>
                                <thead>
                                    <tr className=''>
                                        <th className='text-center' style={{ width: '10%' }}>Data</th>
                                        <th className='text-start' style={{ width: '25%' }}>Cliente</th>
                                        <th className='text-start' style={{ width: '15%' }}>Estado</th>
                                        <th className='text-end position-relative' style={{ width: '12%' }}>Valor Total €</th>
                                        <th className='text-center' style={{ width: '40%' }} colSpan={3}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <LoadPedidos />
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            </div>
        </div>

    )
}