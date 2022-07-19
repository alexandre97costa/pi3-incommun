import React, { useEffect, useState } from "react";
import axios from 'axios';
import ip from '../../../ip';
import authHeader from '../../auth-header'


export default function EditableRow({ handleCancelClick, id, pergunta, getForms }) {

    const [editTituloPergunta, seteditTituloPergunta] = useState(pergunta.titulo)
    const [editDescricaoPergunta, seteditDescricaoPergunta] = useState(pergunta.descricao)
    const [editTipoPerguntaId, seteditTipoPerguntaId] = useState(0)
    const [editTipoPerguntaText, seteditTipoPerguntaText] = useState(pergunta.tipo_pergunta.titulo)

    const [editValorPergunta, seteditValorPergunta] = useState(pergunta.valor_unitario)

    const [listaTiposPergunta, setlistaTiposPergunta] = useState([])


    function UpdatePergunta(e) {
        e.preventDefault()
        let idpergunta = id

        axios.put(ip + '/forms/edit_pergunta',
            {
                id: idpergunta,
                titulo: editTituloPergunta,
                descricao: editDescricaoPergunta,
                tipo_pergunta: parseInt(editTipoPerguntaId),
                valor_unitario: parseFloat(editValorPergunta),

            }, authHeader())

            .then(function (data) {
                window.location.reload()
            })
            .catch(error => {
                return error;
            })
    };

    useEffect(() => {
        GetTiposPergunta()
    }, []);


    function GetTiposPergunta() {
        axios.get(ip + '/forms/all_tipos_pergunta', authHeader())
            .then(res => {
                console.table(res.data.TipoPergunta, ['id', 'nome'])
                setlistaTiposPergunta(res.data.TipoPergunta)

            })
    };

    return (
        <form onSubmit={e => UpdatePergunta(e)}>
            <table className="table table-hover">


                <tbody>
                    <tr>
                        {/* TITULO */}
                        <td style={{ width: "30%" }}>
                            <input
                                className="form-control focus-warning"
                                type="text"
                                name="titulo"
                                required="required"
                                placeholder={pergunta.titulo}
                                value={editTituloPergunta}
                                onChange={e => seteditTituloPergunta(e.target.value)}
                            />
                        </td>

                        {/* DESCRIÇÃO */}
                        <td style={{ width: "40%" }}>
                            <input
                                className="form-control focus-warning"
                                type="text"
                                name="descricao"
                                required="required"
                                placeholder={pergunta.descricao}
                                value={editDescricaoPergunta}
                                onChange={e => seteditDescricaoPergunta(e.target.value)}
                            />
                        </td>




                        {/* TIPO DE PERGUNTA */}

                        <td style={{ width: "10%" }}>
                            <div className="dropdown">
                                <button className="form-control focus-warning dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    {editTipoPerguntaText}
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    {listaTiposPergunta.map(TipoPergunta => {
                                        return (
                                            <li
                                                className="dropdown-item"
                                                onClick={e => {
                                                    seteditTipoPerguntaId(TipoPergunta.id)
                                                    seteditTipoPerguntaText(TipoPergunta.titulo)
                                                }}
                                            >
                                                {TipoPergunta.titulo}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </td>



                        {/* VALOR UNITÁRIO */}
                        <td style={{ width: "10%" }}>
                            <input
                                className="form-control focus-warning"
                                type="number"
                                name="valor_unitario"
                                required="required"
                                placeholder={pergunta.valor_unitario}
                                value={editValorPergunta}
                                onChange={e => seteditValorPergunta(e.target.value)}
                            />
                        </td>


                        <td style={{ width: "10%" }}>

                            <button type="submit"
                                className="btn btn-success mx-2">
                                <i className="bi bi-check-lg"></i>
                            </button>

                            <button type="button"
                                className="btn btn-danger mx-2"
                                onClick={handleCancelClick}>
                                <i className="bi bi-x-lg"></i>
                            </button>

                        </td>
                    </tr>

                </tbody>
            </table >

        </form >
    )

};


