import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import ip from '../../ip'
import authHeader from '../auth-header'

import ContactarCliente from './contactar_cliente';
import UpdateEstado from './update_estado';

export default function AlterarPedido() {

    const { idPedido } = useParams()
    const [pedido, setPedido] = useState({})
    const [estados, setEstados] = useState([])

    // Datas
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    const created = new Date(pedido?.created_at).toLocaleDateString('pt-PT', dateOptions)
    const updated = new Date(pedido?.updated_at).toLocaleDateString('pt-PT', dateOptions)

    useEffect(() => {
        getPedido()

        axios.get(ip + '/pedidos/all_estados', authHeader())
            .then(res => { setEstados(res.data) })

    }, [])

    useEffect(() => {
        // console.log(pedido)
    }, [pedido])

    function getPedido() {
        axios
            .get(ip + '/pedidos/all?pedido_id=' + idPedido, authHeader())
            .then(res => setPedido(res.data.data[0]))
    }

    function LoadRespostas() {
        if (!pedido.respostas) { return }
        return (
            pedido.respostas.map(resposta => {
                return (
                    <tr key={resposta.id}>
                        <td>{resposta.pergunta.titulo}</td>
                        <td>{resposta.id}</td>
                        <td>{resposta.valor_unitario}</td>
                        <td>{resposta.inteiro}</td>
                    </tr>
                )
            })

        )
    }


    return (
        <div className=" bg-light col overflow-auto h-sm-100 px-5 pt-4">

            {/* Titulo */}
            <div className="mb-4 row">
                <div className='col-8 d-flex flex-column'>
                    <span className='h2 text-dark fw-bold d-flex align-items-center mb-3'>
                        {'Alterar Pedido #' + idPedido}
                        {/* Estado */}
                        <div className='dropdown ms-3'>
                            <button
                                className={
                                    'btn dropdown-toggle badge  bg-' + (pedido.estado_pedido?.cor ?? '') +
                                    '-semi text-' + (pedido.estado_pedido?.cor ?? '') +
                                    ' px-2 py-2 m-0 rounded-3 fs-5'
                                }
                                type='button'
                                data-bs-toggle='dropdown'
                            >
                                {pedido.estado_pedido?.descricao ?? ''}
                            </button>
                            <UpdateEstado id={pedido.id} getPedidos={getPedido} estados={estados} />
                        </div>
                    </span>
                    <span className='fs-6 fw-normal text-muted'>
                        <i className='bi bi-calendar-event text-secondary fs-5 me-2'></i>
                        <span className='fw-bold'>Data de criação: </span>
                        {created}
                    </span>
                    <span className='fs-6 fw-normal text-muted'>
                        <i className='bi bi-person text-secondary fs-5 me-2'></i>
                        <span className='fw-bold'>Cliente: </span>
                        <Link
                            to={'/back-office/clientes/' + (pedido.cliente?.id)}
                            className='link-secondary ms-2 '
                        >
                            {pedido.cliente?.nome ?? ''}
                        </Link>
                    </span>
                </div>

                <div className='col-4 '>
                    <div className=' pt-4 text-end d-flex flex-column'>

                        <span className='h5 text-dark text-end fw-semibold'>{'Valor Total em €'}</span>
                        <span className='h1 text-success text-end fw-light border border-1 p-2 rounded-4 bg-white shadow'>{(pedido.valor_total?.toFixed(2) ?? 0.00)}</span>

                    </div>
                </div>
            </div>

            {/* Tabela */}
            {!!(pedido.respostas?.length ?? 0) ?
                <div className="mb-4 row px-2">
                    <div className='col p-3 bg-white rounded-4 border shadow'>
                        <table className='table'>
                            <thead>
                                <tr className=''>
                                    <th className='text-start' style={{ width: '' }}>Pergunta</th>
                                    <th className='text-start' style={{ width: '' }}>Resposta</th>
                                    <th className='text-start' style={{ width: '' }}>Valor Unitário</th>
                                    <th className='text-start' style={{ width: '' }}>Quantidade</th>
                                </tr>
                            </thead>
                            <tbody>
                                <LoadRespostas />
                            </tbody>
                        </table>
                    </div>
                </div>
                :
                <div className='mb-4 row text-center px-2'>
                    <span className='fs-3 text-secondary'>Este pedido não tem respostas.</span>
                </div>
            }

            {/* Opções do pedido */}
            {!!(pedido.respostas?.length ?? 0) &&
                <div className='row mb-5'>
                    <div className='col-12 d-flex justify-content-end'>
                        <button
                            className='btn btn-outline-dark rounded-3 me-3'
                        >
                            Reverter alterações
                        </button>
                        <button
                            className='btn btn-warning rounded-3'
                        >
                            Guardar alterações
                        </button>
                    </div>
                </div>
            }

        </div>



    )


}