import React from 'react'

const EditableRow = ({ editForm, handleEditForm }) => {
    return (
        <tr>

            <td>
                <input
                    className="form-control focus-warning"
                    type="text"
                    required="required"
                    placeholder="Introduz o título da pergunta"
                    name="titulo"
                    value={editForm.titulo}
                    onChange={handleEditForm}
                ></input>
            </td>

            <td>
                <input
                    className="form-control focus-warning"
                    type="text"
                    required="required"
                    placeholder="Introduz a descrição da pergunta"
                    name="descricao"
                    value={editForm.descricao}
                    onChange={handleEditForm}
                ></input>
            </td>

             <td>
                <input
                    className="form-control focus-warning"
                    type="text"
                    required="required"
                    placeholder="Introduz o tipo da pergunta"
                    name="tipo_pergunta"
                    value={editForm.tipo_pergunta}
                    onChange={handleEditForm}
                ></input>
            </td> 

            <td>
                <input
                    type="number"
                    required="required"
                    placeholder="Introduz o valor da pergunta"
                    name="valor_unitario"
                    value={editForm.valor_unitario}
                    onChange={handleEditForm}
                ></input>
            </td>

            <td>
                <button type="submit"
                    className="btn btn-outline-info"                 
                ><i className="bi bi-save"></i></button>

            </td>
        </tr>
    )
}

export default EditableRow