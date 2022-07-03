import React from 'react'

const EditableRow = ({ editForm, handleEditForm, handleCancelClick }) => {
    return (
        <tr>

            <td>
                <input
                    className="form-control focus-warning"
                    type="text"
                    required="required"
                    placeholder={editForm.titulo}
                    name="titulo"
                    onChange={handleEditForm}
                ></input>
            </td>

            <td>
                <input
                    className="form-control focus-warning"
                    type="text"
                    required="required"
                    placeholder={editForm.descricao}
                    name="descricao"
                    onChange={handleEditForm}
                ></input>
            </td>

            <td>
                <input
                    className="form-control focus-warning"
                    type="text"
                    required="required"
                    placeholder={editForm.tipo_pergunta}
                    name="tipo_pergunta"
                    onChange={handleEditForm}
                ></input>
            </td>

            <td>
                <input
                    className="form-control focus-warning"
                    type="number"
                    required="required"
                    placeholder={editForm.valor_unitario}
                    name="valor_unitario"
                    onChange={handleEditForm}
                ></input>
            </td>

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
    )
}

export default EditableRow