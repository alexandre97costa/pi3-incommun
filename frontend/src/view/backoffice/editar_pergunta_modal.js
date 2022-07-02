import axios from 'axios';
import React, { useEffect, useState } from "react";
import ip from '../../ip'
import authHeader from '../auth-header'

export default function editPerguntaModal(props) {

    const [edittituloperguntamodal, seteditTituloPerguntamodal] = useState("")
    const [editdescricaoperguntamodal, seteditdescricaoperguntamodal] = useState("")
    const [edittipoperguntamodal, setedittipoperguntamodal] = useState("")
    const [editvalorperguntamodal, seteditvalorperguntamodal] = useState("")


function UpdateModal(e) {
    e.preventDefault()
    let idpergunta = e.target.getAttribute('data-id')

    axios.post(ip + '/forms/edit?id=' + idpergunta,
        {
            titulo: edittipoperguntamodal,
            descricao: editdescricaoperguntamodal,
            tipo_pergunta: parseInt(edittipoperguntamodal),
            valor_unitario: parseFloat(editvalorperguntamodal),

        }, authHeader())

        .then(function (data) {
            window.location.reload()
        })
        .catch(error => {
            return error;
        })
}

return(


<div className="modal fade" id="editar_pergunta_modal" tabIndex="-1" aria-labelledby="editar_pergunta_modal_label" aria-hidden="true">
    <div className="modal-dialog modal-xl">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="editar_pergunta_modal_label">Editar Pergunta</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>


            <div className="modal-body">

                <form onSubmit={e => UpdateModal(e)}>
                    <input
                        className="form-control focus-warning"
                        type="text"
                        name="titulo"
                        required="required"
                        placeholder="Introduz o titulo"
                        value={edittituloperguntamodal} onChange={e => seteditTituloPerguntamodal(e.target.value)}
                    />

                    <input
                        className="form-control focus-warning"
                        type="text"
                        name="descricao"
                        required="required"
                        placeholder="Introduz a descrição"
                        value={editdescricaoperguntamodal} onChange={e => seteditdescricaoperguntamodal(e.target.value)}
                    />


                    <input
                        className="form-control focus-warning"
                        type="text"
                        name="tipo_pergunta"
                        required="required"
                        placeholder="Introduz o tipo de pergunta"
                        value={edittipoperguntamodal} onChange={e => setedittipoperguntamodal(e.target.value)}
                    />

                    <input
                        className="form-control focus-warning"
                        type="number"
                        name="valor_unitario"
                        required="required"
                        placeholder="Introduz o valor da pergunta"
                        value={editvalorperguntamodal} onChange={e => seteditvalorperguntamodal(e.target.value)}
                    />

                    <button type="submit" className="btn btn-primary" >Update</button>

                </form>


            </div>

        </div>
    </div>
</div>
)
}