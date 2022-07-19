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
                        Parabéns! Concluio o seu pedido!
                        Por favor, clique no "Avançar" para guardar o seu pedido, ou clique no "X" se ainda quiser mudar algo! c:
                        <div>
                           {/* {props.perguntasObject} */}
                        </div>
                    </div>
                    <div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Avançar!</button>
                    </div>
                </div>
            </div>
        </div>
    )
}