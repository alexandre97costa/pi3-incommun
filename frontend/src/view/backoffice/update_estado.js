import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ip from '../../ip'
import authHeader from '../auth-header'

export default function UpdateEstado(props) {

    // o UpdateEstado precisa dos seguintes props:
    // - getPedidos: a função (que está no pedidos.js) que vai buscar os pedidos todos
    // - id: o id do pedido a editar
    // - estados: o hook que tem uma lista de todos os estados

    function SetEstadoPedido(idEstado) {
        axios
            .put(
                ip + '/pedidos/update_estado',
                {
                    pedido_id: props.id,
                    estado_id: idEstado
                },
                authHeader()
            )
            .then(res => res.data?.success ? props.getPedidos() : alert('Erro no update'))
            .catch(console.log)
    }

    return (
        <ul className='dropdown-menu shadow'>
            <li className='ps-3 text-secondary'>Definir como:</li>
            <li><hr className="dropdown-divider" /></li>
            {props.estados.map(estado => {
                return (
                    <li key={estado.id} >
                        <button
                            className={'dropdown-item fw-semibold'}
                            type='button'
                            onClick={e => { SetEstadoPedido(estado.id) }}
                        >
                            <i className={'me-2 bi ' + estado.icon + ' text-' + estado.cor}></i>
                            {estado.descricao}
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}