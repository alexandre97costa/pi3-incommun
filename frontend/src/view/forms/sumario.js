import React, { useEffect, useState } from 'react'

export default function SumarioComponent(props) {
    return (

        
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Mensagem da Incommun!</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        Pedido concluído! Caso queira alterar alguma coisa, ainda vai a tempo de cancelar
                        <div>
                           {/* {props.perguntasObject} */}
                        </div>
                    </div>
                    <div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-warning rounded-0" data-bs-dismiss="modal" onClick={e => props.postPedido(props.cliente)}>Voltar à Página Inicial</button>
                    </div>
                </div>
            </div>
        </div>
    )
}