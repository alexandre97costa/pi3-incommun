import React from 'react'

const EditableRow = () => {
    return (
        <tr>

            <td>
                <input
                    className="form-control focus-warning"
                    type="text"
                    required="required"
                    placeholder="Introduz o título da pergunta"
                    name="titulo"
                ></input>
            </td>

            <td>
                <input
                    className="form-control focus-warning"
                    type="text"
                    required="required"
                    placeholder="Introduz a descrição da pergunta"
                    name="titulo"
                ></input>
            </td>

            <td>
                <input
                    className="form-control focus-warning"
                    type="text"
                    required="required"
                    placeholder="Introduz o tipo da pergunta"
                    name="titulo"
                ></input>
            </td>

            <td>
                <input
                    className="form-control focus-warning"
                    type="number"
                    required="required"
                    placeholder="Introduz o valor da pergunta"
                    name="titulo"
                ></input>
            </td>
        </tr>
    )
}

export default EditableRow