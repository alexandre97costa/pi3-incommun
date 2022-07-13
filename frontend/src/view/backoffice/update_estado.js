import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ip from '../../ip'
import authHeader from '../auth-header'

export default function UpdateEstado(props) {

    // o UpdateEstado precisa dos seguintes props:
    // - getPedidos: a função (que está no pedidos.js) que vai buscar os pedidos todos
    // - id: o id do pedido a editar
    // - estados: o hook que tem uma lista de todos os estados
    // - motivos: o hook que tem uma lista de todos os motivos

    function SetEstadoPedido(idEstado, idMotivo = 0) {

        const body = {
            pedido_id: props.id,
            estado_id: idEstado,
            motivo_id: idMotivo
        }

        // console.log(body)

        axios
            .put(
                ip + '/pedidos/update_estado',
                body,
                authHeader()
            )
            .then(res => res.data?.success ? props.getPedidos() : alert('Erro no update'))
            .catch(console.log)
    }

    function LoadMotivosRecusa(propss) {
        return (
            props.motivos.map(motivo => {
                return (
                    <li key={motivo.id}>
                        <button
                            type='button'
                            className='dropdown-item fw-semibold'
                            onClick={e => { SetEstadoPedido(propss.estadoId, motivo.id) }}
                        >
                            {motivo.descricao}
                        </button>
                    </li>
                )
            })
        )

    }

    return (
        <ul className='dropdown-menu shadow'>
            <li className='text-secondary dropdown-header fs-6'>Definir como:</li>
            <li><hr className="dropdown-divider" /></li>
            {props.estados.map(estado => {
                return (
                    (estado.id !== 4) ?
                        <li key={estado.id} >
                            <button
                                type='button'
                                className={'dropdown-item fw-semibold'}
                                onClick={e => { SetEstadoPedido(estado.id) }}
                            >
                                <i className={'me-2 bi ' + estado.icon + ' text-' + estado.cor}></i>
                                {estado.descricao}
                            </button>
                        </li>
                        :
                        <li key={estado.id} className='dropend'> {/* Se for estado Recusado */}
                            <button
                                type='button'
                                className={'dropdown-item fw-semibold dropdown-toggle'}
                                data-bs-toggle='dropdown'
                                data-bs-auto-close='inside'
                                data-bs-offset='-12,0'
                            // onClick={e => { SetEstadoPedido(estado.id) }}
                            >
                                <i className={'me-2 bi ' + estado.icon + ' text-' + estado.cor}></i>
                                {estado.descricao}
                            </button>
                            <ul className="dropdown-menu shadow">
                                <li className='text-secondary dropdown-header fs-6'>Motivo:</li>
                                <li><hr className="dropdown-divider" /></li>
                                <LoadMotivosRecusa estadoId={estado.id}/>
                            </ul>
                        </li>

                )
            })}
        </ul>
    )
}