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

    // Datas
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    const created = new Date(pedido?.created_at).toLocaleDateString('pt-PT', dateOptions)
    const updated = new Date(pedido?.updated_at).toLocaleDateString('pt-PT', dateOptions)

    function getPedido() {
        axios
            .get(ip + '/pedidos/all?pedido_id=' + idPedido, authHeader())
            .then(res => setPedido(res.data.data[0]))
    }

    useEffect(() => {
        getPedido()
    }, [])

    useEffect(() => {
        console.log(pedido)
    }, [pedido])


    return (
        <div className=" bg-light col overflow-auto h-sm-100 px-5 pt-4">

            {/* Titulo */}
            <div className="mb-3 row ">
                <div className='col-6'>
                    <span className='h2 text-dark fw-bold'>
                        {'Alterar Pedido '}
                        <span className='badge border border-1 border-dark bg-white text-dark me-2 px-2 py-1 rounded-3 fs-5'>
                            {'#' + idPedido}
                        </span>
                        <span className={
                            'badge  bg-' + (pedido.estado_pedido?.cor ?? '') + 
                            '-semi text-' + (pedido.estado_pedido?.cor ?? '') + 
                            ' px-2 py-1 rounded-3 fs-5'
                            }>
                            {pedido.estado_pedido?.descricao ?? ''}
                        </span>
                    </span>
                </div>

                <div className='col-6'>
                    <ul className='list-group shadow rounded-4'>
                        <li className='list-group-item'>
                            <span className='fw-bold'>Data de criação: </span>
                            <span className='fw-normal'>{created}</span>
                        </li>
                        <li className='list-group-item'>
                            <span className='fw-bold'>Cliente: </span>
                            <span className='fw-normal'>{pedido.cliente?.nome ?? ''}</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Opções do pedido */}
            <div className='row'>

            </div>

            {/* Tabela */}
            <div className="mb-3 row px-2">
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
                            {/* <LoadPedidos /> */}
                        </tbody>
                    </table>
                </div>
            </div>


        </div>



    )


}