import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import NavDeLado from './navdelado'
import Count from './count'
import ip from '../../ip'

export default function PedidosComponent() {

    const [pedidos, setPedidos] = useState([])
    const icons = [
        'bi-envelope',
        'bi-envelope-paper-heart',
        'bi-arrow-through-heart-fill',
        'bi-heartbreak-fill',
    ]
    const cores = [
        'warning',
        'primary',
        'teal',
        'danger',
    ]

    const [dicaDoDia, setDicaDoDia] = useState('')
    const [autorDica, setAutorDica] = useState('')

    useEffect(() => {
        // Get os pedidos todos
        axios.get('http://' + ip + ':4011/pedidos/all')
            .then(res => {
                console.log(res.data)
                setPedidos(res.data)
            })

        // Get a dica do dia
        axios.get('https://api.quotable.io/random?tags=success|inspirational|happiness')
            .then(res => {
                console.log('🚀 / res', res)

                setDicaDoDia(res.data.content)
                setAutorDica(res.data.author)
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
                                className={'badge text-start w-100 fw-semibold bg-' + cores[pedido.estado_id - 1] + '-semi text-' + cores[pedido.estado_id - 1] + ' fs-6'}
                                title={pedido.estado_pedido.obs}
                            >
                                <i className={'me-2 bi ' + icons[pedido.estado_id - 1]}></i>
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
                                Vista geral do último mês
                            </span>
                        </div>
                        <div className='col-6 text-end'>
                            <span className='fs-5 lh-sm text-indigo fw-bold ' title={dicaDoDia + ' - ' + autorDica}>
                                Dica do dia :)
                            </span><br/>
                            <span className=' p-2 badge fw-normal bg-light lh-sm text-secondary text-end text-wrap w-75'>
                                {dicaDoDia + ' ~' + autorDica}
                            </span>
                        </div>
                    </div>
                    <div className='mb-4 g-3 row row-cols-1 row-cols-md-2 row-cols-lg-4 row-cols-xl-4'>
                        <Count estado={1} icon='bi-heart-fill' />
                        <Count estado={2} icon='bi-heart-fill' />
                        <Count estado={3} icon='bi-heart-fill' />
                        <Count estado={4} icon='bi-heartbreak-fill' />

                    </div>

                    <div className="mb-3 row">
                        <div className='col d-flex justify-content-between'>
                            <span className='fs-6 fw-normal text-muted'>
                                Pedidos
                            </span>
                            <div className='d-none btn-group bg-white '>
                                <button
                                    type='button'
                                    className='btn btn-outline-secondary  form-check d-flex align-items-center fs-6'
                                >
                                    <span>Todos</span>
                                    <i className='bi bi-check-square-fill ms-3 fs-6'></i>
                                </button>

                                <button
                                    type='button'
                                    className='btn btn-outline-secondary form-check d-flex align-items-center'
                                >
                                    <span>Pendentes</span>
                                    <i className='bi bi-square ms-3 fs-6'></i>
                                </button>

                                <button
                                    type='button'
                                    className='btn btn-outline-secondary form-check d-flex align-items-center'
                                >
                                    <span>Enviados</span>
                                    <i className='bi bi-square ms-3 fs-6'></i>
                                </button>

                                <button
                                    type='button'
                                    className='btn btn-outline-secondary form-check d-flex align-items-center'
                                >
                                    <span>Aceites</span>
                                    <i className='bi bi-square ms-3 fs-6'></i>
                                </button>

                                <button
                                    type='button'
                                    className='btn btn-outline-secondary form-check d-flex align-items-center'
                                >
                                    <span>Recusados</span>
                                    <i className='bi bi-check-square ms-3 fs-6'></i>
                                </button>
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