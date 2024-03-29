import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import NavDeLado from './navdelado'
import Count from './count'
import ip from '../../ip'
import { useParams } from "react-router-dom";
import authHeader from '../auth-header';
import UpdateEstado from './update_estado';
import authService from '../auth.service';
import ContactarCliente from './contactar_cliente';

export default function Pedidos_clienteComponent() {
    const [pedidos, setPedidos] = useState([])
    const [filtroPedido, setFiltroPedido] = useState('id')
    const [ordemPedido, setOrdemPedido] = useState('ASC')
    const [motivos, setMotivos] = useState([])
    const [estados, setEstados] = useState([])
    const [Email, setEmail] = useState("")
    const [assunto, setAssunto] = useState("")
    const [titulo, setTitulo] = useState("")
    const [corpo, setCorpo] = useState("")
    const [dicaDoDia, setDicaDoDia] = useState('')
    const [autorDica, setAutorDica] = useState('')
    const { idCliente } = useParams();
    function getPedidos() {

        axios.get(
            ip + '/clientes/list_pedidos/' +
            '?cliente=' + idCliente +
            '&filtro=' + filtroPedido +
            '&ordem=' + ordemPedido,
            authHeader()
        )
            .then(res => {
                if (res.data.success) {
                    setPedidos(res.data.data);

                }
            })
            .catch(error => { throw new Error(error) });
        axios.get(ip + '/pedidos/all_estados', authHeader())
            .then(res => { setEstados(res.data) })
        axios.get(ip + '/pedidos/all_motivos', authHeader())
            .then(res => { setMotivos(res.data) })
        axios.get('https://api.quotable.io/random?tags=success|inspirational|happiness')
            .then(res => {
                setAutorDica(res.data.author)
                setDicaDoDia(res.data.content)
            })
    }
    useEffect(() => {
        getPedidos()
    }, [idCliente, filtroPedido, ordemPedido])
    function handleFiltro(filtro, ordem, texto) {
        setFiltroPedido(filtro)
        setOrdemPedido(ordem)
        document.getElementById('dropdown-filtro').textContent = texto
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
            assunto: assunto,
            titulo: titulo,
            corpo: corpo
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
               // alert("Error 34 " + error)
            })
    }
    function LoadPedidos() {
        return (
            pedidos.map(pedido => {
                return (
                    <tr className='align-middle' key={pedido.id} id={pedido.cliente.id} data-email={pedido.cliente.email}>
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
                                {'#' + pedido.cliente.id}
                            </span>
                            <br />
                            <span className='badge p-0 fw-semibold text-light-dark lh-sm'>
                                {pedido.cliente.empresa}
                            </span>
                        </td>
                        {/* Estado */}
                        <td className='text-start'>
                            <div className='dropdown'>
                                <button
                                    className={
                                        'btn btn-sm btn-light border-0 w-100 text-start' +
                                        ' d-flex justify-content-between align-items-center  dropdown-toggle ' +
                                        ' bg-' + pedido.estado_pedido.cor +
                                        '-semi text-' + pedido.estado_pedido.cor +
                                        ' focus-' + pedido.estado_pedido.cor + ' fs-6'
                                    }
                                    type='button'
                                    data-bs-toggle='dropdown'
                                    data-bs-auto-close='outside'
                                    title={pedido.estado_pedido.obs}
                                >
                                    <span>
                                        {/* <i className={'ms-1 me-2 bi ' + pedido.estado_pedido.icon}></i> */}
                                        {pedido.estado_pedido.descricao}
                                    </span>
                                </button>
                                <UpdateEstado id={pedido.id} getPedidos={getPedidos} estados={estados} motivos={motivos} />

                            </div>
                        </td>
                        {/* Valor */}
                        <td className='text-end text-success fs-4 pe-3'>
                            {pedido.valor_total.toFixed(2)}
                        </td>

                        {/* Opções */}
                        <td className=''>
                            {(pedido.estado_id === 1 || pedido.estado_id === 2) &&
                                <button
                                id='contactar-cliente-btn'
                                className='btn btn-warning w-100 fw-semibold'
                                data-bs-toggle='modal'
                                data-bs-target="#contactar-cliente-modal"
                                onClick={() => mudarEmail(pedido.cliente.id)}
                            >
                                <i className='me-2 bi bi-send-fill'></i>
                                Contactar cliente
                                
                            </button>
                            }
                            {(pedido.estado_id === 3 || pedido.estado_id === 4) &&
                                <button data-bs-toggle="modal" data-bs-target="#contactar-cliente-modal" className='btn btn-warning w-100' disabled>
                                    <i className='me-2 bi bi-send-slash-fill'></i>
                                    Contactar cliente
                                </button>
                            }
                        </td>


                    </tr>
                )
            })
        )
    }
    return (
        <div className="col overflow-auto h-sm-100 px-5 pt-4  bg-light">
            {/* Titulo */}
            <div className="mb-3 row">
                <div className='col-6'>
                    <span className='h2 text-dark fw-bold'>
                        Pedidos do Cliente
                    </span>
                    <br />
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

            <div className='mb-4 g-3 row row-cols-1 row-cols-md-2 row-cols-lg-4 row-cols-xl-4'>
                <Count estadoId={1} cliente={idCliente} oquecontar={"cliente"} />
                <Count estadoId={2} cliente={idCliente} oquecontar={"cliente"} />
                <Count estadoId={3} cliente={idCliente} oquecontar={"cliente"} />
                <Count estadoId={4} cliente={idCliente} oquecontar={"cliente"} />

            </div>


            <div className="mb-3 row">
                <div className='col d-flex justify-content-start align-items-center fs-6 fw-normal text-muted'>
                    <span className='me-2'>
                        Ver na ordem de
                    </span>

                    <div className="dropdown bg-white me-2">
                        <button className=" btn btn-sm btn-outline-dark dropdown-toggle" type="button" id="dropdown-filtro" data-bs-toggle="dropdown" aria-expanded="false">
                            Data de criação (mais antigo - mais recente)
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdown-filtro">
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('valor_total', 'DESC', e.target.textContent) }} type='button'>Valor mais elevado primeiro</button></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('valor_total', 'ASC', e.target.textContent) }} type='button'>Valor mais baixo primeiro</button></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('created_at', 'ASC', e.target.textContent) }} type='button'>Data de criação (mais antigo - mais recente)</button></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('created_at', 'DESC', e.target.textContent) }} type='button'>Data de criação(mais recente - mais antigo)</button></li>
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
                                <th className='text-start' style={{ width: '35%' }}>Cliente</th>
                                <th className='text-start' style={{ width: '20%' }}>Estado</th>
                                <th className='text-end position-relative' style={{ width: '15%' }}>Valor Total €</th>
                                <th className='text-center' style={{ width: '20%' }} colSpan={1}></th>
                            </tr>
                        </thead>
                        <tbody>
                            <LoadPedidos />
                        </tbody>
                    </table>
                </div>
            </div>
            <ContactarCliente destinatario={Email}/>
        </div>
    )
}