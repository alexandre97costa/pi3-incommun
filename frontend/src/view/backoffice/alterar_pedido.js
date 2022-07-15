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
    const [motivos, setMotivos] = useState([])
    const [valorTotal, setValorTotal] = useState(0.00)

    // Editar resposta
    const [editRespostaId, setEditRespostaId] = useState(0)
    const [editRespostaValor, setEditRespostaValor] = useState(0)

    // Dates
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    const created = new Date(pedido?.created_at).toLocaleDateString('pt-PT', dateOptions)
    const updated = new Date(pedido?.updated_at).toLocaleDateString('pt-PT', dateOptions)


    const [fallbackText, setFallbackText] = useState('A carregar...')
    const [verPerguntasZero, setVerPerguntasZero] = useState(false)
    const [reverter, setReverter] = useState(false)

    useEffect(() => {
        getPedido()

        axios.get(ip + '/pedidos/all_estados', authHeader()).then(res => { setEstados(res.data) })
        axios.get(ip + '/pedidos/all_motivos', authHeader()).then(res => { setMotivos(res.data) })

    }, [])

    useEffect(() => {
        console.log(pedido)
        calcularValorTotal()
    }, [pedido])


    useEffect(() => {
        let input = document.getElementById('edit-valor-' + editRespostaId)
        if (typeof (input) != 'undefined' && input != null) { input.focus() }
    }, [editRespostaId, editRespostaValor])

    function getPedido() {
        axios
            .get(ip + '/pedidos/all?pedido_id=' + idPedido, authHeader())
            .then(res => {
                setPedido(res.data.data[0])
                setFallbackText('Este pedido não tem respostas.')
            })
    }

    function calcularValorTotal() {
        if (!pedido.respostas) { return }

        let valores_calculados = Array.from(pedido.respostas, resposta => {
            return resposta.inteiro * resposta.valor_unitario
        })
        let valor_total = valores_calculados.reduce((a, b) => a + b)

        setValorTotal(valor_total.toFixed(2))
    }

    function handleEditValor(id) {
        pedido.respostas.forEach(resposta => {
            if (resposta.id === id) {
                resposta.valor_unitario = editRespostaValor
                setEditRespostaId(0)
                calcularValorTotal()
            }
        })
    }

    function updatePedido() {
        pedido.valor_total = valorTotal
        const body = {
            pedido: pedido
        }
        axios.put(ip + '/pedidos/update', body, authHeader())
    }

    function LoadRespostas() {
        if (!pedido.respostas) { return }



        return (
            pedido.respostas.map(resposta => {

                // Para mudar a coluna de resposta consoante o tipo de pergunta (checkbox, slider, etc)
                function Resposta() {
                    const posts = resposta.texto.split(', ')[0]
                    const stories = resposta.texto.split(', ')[1]
                    const reels = resposta.texto.split(', ')[2]

                    switch (resposta.pergunta.tipo_id) {
                        // Checkbox
                        case 1:
                            return (
                                <td> {!!resposta.inteiro ?
                                    <i className='fs-5 bi bi-check-lg text-success'></i> :
                                    <i className='fs-5 bi bi-x-lg text-danger'></i>
                                } </td>
                            )

                        // Redes Sociais (7-10)
                        case 7:
                            return (
                                <td> {!!resposta.inteiro ?
                                    <span>{posts + ' posts'}</span> :
                                    <i className='fs-5 bi bi-x-lg text-danger'></i>
                                } </td>
                            )
                        case 8:
                            return (
                                <td> {!!resposta.inteiro ?
                                    <span>{posts + ' posts, ' + stories + ' stories'}</span> :
                                    <i className='fs-5 bi bi-x-lg text-danger'></i>
                                } </td>
                            )
                        case 9:
                            return (
                                <td> {!!resposta.inteiro ?
                                    <span>{posts + ' posts, ' + reels + ' reels'}</span> :
                                    <i className='fs-5 bi bi-x-lg text-danger'></i>
                                } </td>
                            )
                        case 10:
                            return (
                                <td> {!!resposta.inteiro ?
                                    <span>{posts + ' posts, ' + stories + ' stories, ' + reels + ' reels'}</span> :
                                    <i className='fs-5 bi bi-x-lg text-danger'></i>
                                } </td>
                            )
                        default:
                            break;
                    }
                }

                function ValorUnitario() {
                    return (
                        (editRespostaId === resposta.id) ?
                            <td>
                                <input
                                    id={'edit-valor-' + resposta.id}
                                    className='form-control focus-warning'
                                    type='number'
                                    step='0.1'
                                    min='0.1'
                                    value={editRespostaValor}
                                    onChange={e => setEditRespostaValor(e.target.value)}
                                />
                            </td>
                            :
                            <td className={!resposta.inteiro && 'text-decoration-line-through'}>
                                {resposta.inteiro > 1 ?
                                    <div>
                                        <span className='text-dark fs-5'>
                                            {resposta.valor_unitario}
                                        </span>
                                        {' (x ' + resposta.inteiro + ')'}
                                    </div>
                                    :
                                    <span className='text-dark fs-5'>
                                        {resposta.valor_unitario}
                                    </span>
                                    
                                }
                            </td>

                    )
                }

                function Botoes() {
                    return (
                        (editRespostaId === resposta.id) ?
                            <td>
                                <div className='d-flex justify-content-end'>
                                    <button
                                        type='button'
                                        className='btn btn-success me-2'
                                        onClick={e => handleEditValor(resposta.id)}
                                    >
                                        <i className='bi bi-check-lg'></i>
                                    </button>
                                    <button
                                        type='button'
                                        className='btn btn-danger'
                                        onClick={e => setEditRespostaId(0)}
                                    >
                                        <i className='bi bi-x-lg'></i>
                                    </button>
                                </div>
                            </td>
                            :
                            <td className=''>
                                {!!resposta.inteiro &&
                                    <div className='d-flex justify-content-end '>
                                        <button
                                            type='button'
                                            className='btn btn-outline-warning'
                                            onClick={e => {
                                                setEditRespostaId(resposta.id)
                                                setEditRespostaValor(resposta.valor_unitario)
                                            }}
                                        >
                                            <i className='bi bi-pencil-fill'></i>
                                        </button>
                                    </div>
                                }
                            </td>
                    )
                }

                return (
                    <tr key={resposta.id} className={
                        (!(!verPerguntasZero && !resposta.inteiro) ? ' ' : 'd-none ') +
                        (!resposta.inteiro && 'bg-secondary bg-opacity-10 ') +
                        'fw-normal text-secondary'
                    }>
                        {/* Pergunta */}
                        <td className={!!resposta.inteiro ? 'text-dark' : 'text-secondary'} >
                            {resposta.pergunta.titulo}
                        </td>

                        <Resposta />

                        <ValorUnitario />

                        <Botoes />

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
                                data-bs-auto-close='outside'
                            >
                                {pedido.estado_pedido?.descricao ?? ''}
                            </button>
                            <UpdateEstado id={pedido.id} getPedidos={getPedido} estados={estados} motivos={motivos} />
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
                    <div className='text-end d-flex flex-column'>

                        <span className='d-flex flex-column h1 text-success text-end fw-light border border-1 p-3 rounded-4 bg-white shadow'>
                            <span className='h5 text-dark text-end fw-semibold'>{'Valor Total em €'}</span>
                            {valorTotal}
                        </span>

                    </div>
                </div>
            </div>

            {/* Tabela */}
            {!!(pedido.respostas?.length ?? 0) ?
                <div className="mb-4 row px-2">
                    <div className='col p-3 pb-1 bg-white rounded-4 border shadow'>
                        <div className="form-check form-switch w-100 mb-3 mt-2">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="verPerguntasZero"
                                style={{ width: '2.5rem', margin: 0 }}
                                checked={verPerguntasZero}
                                onChange={e => setVerPerguntasZero(!verPerguntasZero)}
                            />
                            <label className="form-check-label text-secondary ms-2" htmlFor="verPerguntasZero">
                                Ver perguntas sem resposta
                            </label>
                        </div>
                        <table className='table align-middle'>
                            <thead>
                                <tr className=''>
                                    <th className='text-start' style={{ width: '20%' }}>Pergunta</th>
                                    <th className='text-start' style={{ width: '50%' }}>Resposta</th>
                                    <th className='text-start' style={{ width: '20%' }}>Valor Unitário €</th>
                                    <th className='text-start' style={{ width: '10%' }}>&nbsp;</th>
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
                    <span id="text-sem-respostas" className='fs-3 text-secondary'>{fallbackText}</span>
                </div>
            }

            {/* Opções do pedido */}
            {!!(pedido.respostas?.length ?? 0) &&
                <div className='row mb-5'>
                    <div className='col-12 d-flex justify-content-end'>

                        {!reverter ?

                            <button
                                className='btn btn-outline-dark rounded-3 me-3'
                                onClick={e => { setReverter(true) }}
                            >
                                Reverter alterações
                            </button>
                            :
                            <div className=''>
                                <span className='me-3'>Tem a certeza?</span>
                                <button
                                    className='btn btn-danger rounded-3 me-3'
                                    onClick={e => { getPedido(); setReverter(false) }}
                                >
                                    Reverter alterações
                                </button>
                                <button
                                    className='btn btn-outline-dark rounded-3 me-3 px-5'
                                    onClick={e => { setReverter(false) }}
                                >
                                    Cancelar
                                </button>
                            </div>
                        }
                        <button
                            className='btn btn-success rounded-3'
                            onClick={e => updatePedido()}
                        >
                            Guardar alterações
                        </button>
                    </div>
                </div>
            }

        </div>



    )


}