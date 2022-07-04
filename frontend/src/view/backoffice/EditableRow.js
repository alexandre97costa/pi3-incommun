import React, { useState } from "react";
import axios from 'axios';
import ip from '../../ip';

export default function EditableRow_v2({ handleCancelClick, handleEditClick, id, pergunta,  LoadForms }) {

    const [edittitulopergunta, seteditTituloPergunta] = useState("")
    const [editdescricaopergunta, seteditdescricaopergunta] = useState("")
    const [edittipopergunta, setedittipopergunta] = useState("")
    const [editvalorpergunta, seteditvalorpergunta] = useState("")


    const [editForm, setEditForm] = useState({
        titulo: "",
        descricao: "",
        tipo_pergunta: "",
        valor_unitario: "",

    });



    function UpdatePergunta(e) {
        e.preventDefault()
        let idpergunta = id

        axios.put(ip + '/forms/edit',
            {
                id: idpergunta,
                titulo: edittitulopergunta,
                descricao: editdescricaopergunta,
                tipo_pergunta: parseInt(edittipopergunta),
                valor_unitario: parseFloat(editvalorpergunta),

            })

            .then(function (data) {
                window.location.reload()
            })
            .catch(error => {
                return error;
            })
    }


    return (
        <form onSubmit={e => UpdatePergunta(e)}>
            <table className="table table-hover">
                <tbody><tr>
                  

                        <td>
                            <input
                                className="form-control focus-warning"
                                type="text"
                                name="titulo"
                                required="required"
                                placeholder="Introduz o titulo"
                                value={edittitulopergunta}
                                onChange={e => seteditTituloPergunta(e.target.value)}

                            /></td>
                        <td>
                            <input
                                className="form-control focus-warning"
                                type="text"
                                name="descricao"
                                required="required"
                                placeholder="Introduz a descrição"
                                value={editdescricaopergunta}
                                onChange={e => seteditdescricaopergunta(e.target.value)}
                            /></td>

                        <td>
                            <input
                                className="form-control focus-warning"
                                type="text"
                                name="tipo_pergunta"
                                required="required"
                                placeholder="Introduz o tipo de pergunta"
                                value={edittipopergunta}
                                onChange={e => setedittipopergunta(e.target.value)}
                            /></td>
                        <td>
                            <input
                                className="form-control focus-warning"
                                type="number"
                                name="valor_unitario"
                                required="required"
                                placeholder="Introduz o valor da pergunta"
                                value={editvalorpergunta}
                                onChange={e => seteditvalorpergunta(e.target.value)}
                            /></td>
                        <td>
                            <button type="submit"
                                className="btn btn-outline-info mx-2">
                                <i className="bi bi-box-arrow-down"></i>
                            </button>

                            <button type="button"
                                className="btn btn-outline-danger"
                                onClick={handleCancelClick}>
                                <i className="bi bi-x-circle"></i>
                            </button>
                        </td>
                        </tr>

                </tbody>
            </table>

        </form>
    )

};

