import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Count from './count'
import ip from '../../ip'

export default function InicioComponent() {

    const [pedidos, setPedidos] = useState([])
    const [totalPedidos, setTotalPedidos] = useState(0)
    const [estados, setEstados] = useState([])
    const [filtroEstadoPedido, setFiltroEstadoPedido] = useState(0)
    const [filtroEstadoPedidoDesc, setFiltroEstadoPedidoDesc] = useState('Todos os pedidos')

    const [dicaDoDia, setDicaDoDia] = useState('')
    const [autorDica, setAutorDica] = useState('')

    useEffect(() => {
        // Get os pedidos todos (por vezes filtrados e ordenados)
        axios.get('http://' + ip + ':4011/pedidos/all?estado_id=' + filtroEstadoPedido)
            .then(res => {
                // console.log(res.data)
                setPedidos(res.data)
            })
    }, [filtroEstadoPedido])


    useEffect(() => {

        // Get total de pedidos
        // por defeito, sem mandar nenhuma query (nem estado nem dias),
        // conta todos os pedidos dos ultimos 30 dias
        axios.get('http://' + ip + ':4011/pedidos/count?estado_id=0')
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


    function LoadInfoPedidosCliente() {
        return (
            pedidos.map(pedido => {
                return (

                    <div className='col d-flex flex-column'>

                        <div className='container-fluid rounded-4 border ps-4 bg-white shadow'>
                            <td className="row justify-content-center my-4 g-3" key={pedido.id}>

                                {/* Cliente */}
                                <tr className='mt-2 text-center text-dark lh-sm'>
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
                                </tr>




                                {/* Valor */}
                                <tr className='mt-2 text-center text-success fs-4'>
                                    {pedido.valor_total.toFixed(2)}
                                </tr>

                                {/* Data */}
                                <tr className='mt-2 text-center '>
                                    <span className='text-muted badge fw-normal align-middle'>
                                        {new Date(pedido.created_at).toISOString().split('T')[0]}
                                    </span>
                                </tr>

                                {/* Estado */}
                                <tr className='mt-2'>
                                    <span
                                        className={'badge w-100 fw-semibold bg-' + pedido.estado_pedido.cor + '-semi text-' + pedido.estado_pedido.cor + ' fs-6'}
                                        title={pedido.estado_pedido.obs}
                                    >
                                        <i className={'me-2 bi ' + pedido.estado_pedido.icon}></i>
                                        {pedido.estado_pedido.descricao}
                                    </span>
                                </tr>

                                {/* Opções */}
                                <tr className='mt-2'>
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
                                </tr>


                                <tr className='mt-2'>
                                    <button className='btn btn-secondary w-100'>
                                        <i className='me-2 bi bi-card-checklist'></i>
                                        Ver pedido
                                    </button>
                                </tr>

                                <tr className='my-2'>
                                    <button className='btn btn-outline-secondary w-100'>

                                        <i className='bi bi-gear-fill'></i>
                                    </button>
                                </tr>
                            </td>






























                        </div>
                    </div>
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
                                setFiltroEstadoPedido(estado.id)
                                setFiltroEstadoPedidoDesc(estado.descricao + 's')
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


        <div className="col overflow-auto h-sm-100 px-5 pt-4">

            {/* Titulo */}
            <div className="mb-3 row">
                <div className='col-6'>
                    <span className='h2 text-dark fw-bold'>
                        BEM VINDO
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
                <Count estadoId={0} />
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
                            <span className='me-2'>{filtroEstadoPedidoDesc}</span>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li>
                                <button
                                    className="dropdown-item"
                                    type='button'
                                    onClick={e => {
                                        setFiltroEstadoPedido(0)
                                        setFiltroEstadoPedidoDesc('Todos os pedidos')
                                    }}>
                                    Todos os pedidos
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
                            <span className='me-2'>Pendentes mais antigos primeiro</span>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><button className="dropdown-item" onClick={e => { }} type='button'>Pendentes mais antigos primeiro</button></li>
                            <li><button className="dropdown-item" onClick={e => { }} type='button'>Mais recentes primeiro</button></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button className="dropdown-item" onClick={e => { }} type='button'>Nome de cliente (A-Z)</button></li>
                            <li><button className="dropdown-item" onClick={e => { }} type='button'>Nome de cliente (Z-A)</button></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button className="dropdown-item" onClick={e => { }} type='button'>Valor mais elevado primeiro</button></li>
                            <li><button className="dropdown-item" onClick={e => { }} type='button'>Valor mais baixo primeiro</button></li>
                        </ul>
                    </div>

                </div>
            </div>


            {/* <!-- INICIO ORÇAMENTOS PENDENTES --> */}

            <p className="fs-normal d-flex"> Orçamentos Pendentes</p>


            <div className='mb-4 g-3 row row-cols-1 row-cols-md-2 row-cols-lg-4 row-cols-xl-4'>


                <LoadInfoPedidosCliente />
            </div>

        </div>



    )
}