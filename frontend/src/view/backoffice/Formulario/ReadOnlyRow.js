import React from 'react'
import authHeader from '../../auth-header'

const ReadOnlyRow = ({ pergunta, handleEditClick }) => {
    return (


        <table className="table table-hover">
            <tbody>
                <tr>
                    <td style={{ width: "30%" }}>
                        <div className="">
                            <p className="fs-6 fw-normal text-secundary text-start p-2" >{pergunta.titulo}</p>
                        </div>
                    </td>

                    <td style={{ width: "40%" }}>

                        <div className="">
                            <p className="fs-6 fw-normal text-secundary text-start p-2">{pergunta.descricao}</p>
                        </div></td>

                    <td style={{ width: "10%" }}>

                        <div className="">
                            <p className="fs-6 fw-normal text-secundary text-center p-2">{pergunta.tipo_pergunta.titulo}</p>
                        </div>

                    </td>

                    <td style={{ width: "10%" }}>
                        <div className="">
                            <p className="fs-6 fw-normal text-secundary text-center p-2">{pergunta.valor_unitario}</p>
                        </div>
                    </td>

                    <td style={{ width: "10%" }}>
                        <button type="button"
                            className="btn btn-outline-warning mx-2"
                            onClick={(e) => handleEditClick(e, pergunta)}
                        ><i className="bi bi-pencil-square"></i></button>

                    </td>
                </tr>
            </tbody>
        </table>


    )
}

export default ReadOnlyRow