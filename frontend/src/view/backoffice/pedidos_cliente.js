import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import NavDeLado from './navdelado'
import Count from './count'
import ip from '../../ip'
import mailImg from '../../assets/imgs/mail2.png'
import { useParams } from "react-router-dom";

export default function Pedidos_clienteComponent() {
    const [pedidos, setPedidos] = useState([])
    const [filtroPedido, setFiltroPedido] = useState('id')
    const [ordemPedido, setOrdemPedido] = useState('ASC')
    const { Cliente } = useParams();
    
    useEffect(() => {
        axios.get(ip + '/clientes/list_pedidos/?cliente=' + Cliente + '&?filtro=' + filtroPedido + '&?ordem=' + ordemPedido)
        .then(res => {
            if (res.data.success) {
                //alert(filtroPedido + "," + Cliente);
                setPedidos(res.data.data);
            }
        })
        .catch(error => { throw new Error(error) });
    }, [Cliente, filtroPedido, ordemPedido])


    function handleFiltro(filtro, ordem, texto) {
        setFiltroPedido(filtro) 
        setOrdemPedido(ordem)
        document.getElementById('dropdown-filtro').textContent = texto
    }


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
                            {pedido.valor_total.toFixed(2)}
                        </td>

                        {/* Opções */}
                        <td className=''>
                            {(pedido.estado_id === 1 || pedido.estado_id === 2) &&
                                <button data-bs-toggle="modal" data-bs-target="#modal-contactar" className='btn btn-warning w-100 fw-semibold' >
                                    <i className='me-2 bi bi-send-fill'></i>
                                    Contactar cliente
                                </button>
                            }
                            {(pedido.estado_id === 3 || pedido.estado_id === 4) &&
                                <button data-bs-toggle="modal" data-bs-target="#modal-contactar" className='btn btn-warning w-100' disabled>
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
                                Pedidos do Cliente
                                
                            </span>
                           
                            <br />
                            <br />
                        
                            
                        </div>
                        
                    </div>
                    

                    <div className="mb-3 row">
                        <div className='col d-flex justify-content-start align-items-center fs-6 fw-normal text-muted'>
                            <span className='me-2'>
                                Ver na ordem de
                            </span>

                            <div className="dropdown bg-white me-2">
                                <button className=" btn btn-sm btn-outline-dark dropdown-toggle" type="button" id="dropdown-filtro" data-bs-toggle="dropdown" aria-expanded="false">
                                    id
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdown-filtro">
                                    <li><button className="dropdown-item" onClick={e => { handleFiltro('id',            'ASC',  e.target.textContent) }} type='button'>id</button></li>
                                    <li><button className="dropdown-item" onClick={e => { handleFiltro('valor_total',   'DESC', e.target.textContent) }} type='button'>Valor mais elevado primeiro</button></li>
                                    <li><button className="dropdown-item" onClick={e => { handleFiltro('valor_total',   'ASC',  e.target.textContent) }} type='button'>Valor mais baixo primeiro</button></li>
                                    <li><button className="dropdown-item" onClick={e => { handleFiltro('created_at',    'ASC',  e.target.textContent) }} type='button'>Data de criação (mais antigo - mais recente)</button></li>
                                    <li><button className="dropdown-item" onClick={e => { handleFiltro('created_at',    'DESC', e.target.textContent) }} type='button'>Data de criação(mais recente - mais antigo)</button></li>
                                </ul>
                            </div>

                        </div>
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
                                <th className='text-center' style={{ width: '40%' }} colSpan={2}></th>
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