import React, { useState } from "react";
import axios from 'axios';
import ip from '../../ip';

export default function EditableRow_v2({ handleCancelClick, handleEditClick, id, pergunta, LoadForms }) {

    const [edittitulopergunta, seteditTituloPergunta] = useState("")
    const [editdescricaopergunta, seteditdescricaopergunta] = useState("")
    const [edittipopergunta, setedittipopergunta] = useState("")
    const [editvalorpergunta, seteditvalorpergunta] = useState("")

    const [filtroTiposPerguntaDesc, setFiltroTiposPerguntaDesc] = useState('Tipos de Pergunta')
    const [tiposPergunta, setTiposPergunta] = useState([])

    function LoadTiposPergunta() {
        return (
            tiposPergunta.map(tipos_perguntas => {
                return (
                    <li key={tipos_perguntas.id}>
                        <button
                            className="dropdown-item"
                            type='button'
                            onClick={e => {
                                setFiltroTiposPerguntaDesc(tipos_perguntas.titulo)
                            }}
                        >
                            {tipos_perguntas.titulo}
                        </button>
                    </li>
                )
            })
        )
    }



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
                <tbody>

                                
                                <tr>
                                    <td style={{ width: "30%" }}>
                                        <input
                                            className="form-control focus-warning"
                                            type="text"
                                            name="titulo"
                                            required="required"
                                            placeholder="Introduz o titulo"
                                            value={edittitulopergunta}
                                            onChange={e => seteditTituloPergunta(e.target.value)}

                                        /></td>
                                    <td style={{ width: "40%" }}>


                                        {/* <input
                                            className="form-control focus-warning"
                                            type="text"
                                            name="descricao"
                                            required="required"
                                            placeholder="Introduz a descrição"
                                            value={editdescricaopergunta}
                                            onChange={e => seteditdescricaopergunta(e.target.value)}
                                        /> */}

                                        
                                        </td>

                                    <td style={{ width: "10%" }}>
                                        <input
                                            className="form-control focus-warning"
                                            type="text"
                                            name="tipo_pergunta"
                                            required="required"
                                            placeholder="Introduz o tipo de pergunta"
                                            value={edittipopergunta}
                                            onChange={e => setedittipopergunta(e.target.value)}
                                        /></td>
                                    <td style={{ width: "10%" }}>
                                        <input
                                            className="form-control focus-warning"
                                            type="number"
                                            name="valor_unitario"
                                            required="required"
                                            placeholder="Introduz o valor da pergunta"
                                            value={editvalorpergunta}
                                            onChange={e => seteditvalorpergunta(e.target.value)}
                                        /></td>
                                    <td style={{ width: "10%" }}>
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

