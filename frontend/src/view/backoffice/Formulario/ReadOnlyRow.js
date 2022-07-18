import axios from 'axios'
import React from 'react'
import authHeader from '../../auth-header'
import ip from '../../../ip';


export default function ReadOnlyRow({pergunta, handleEditClick, getForms }) {


   
    function handleDeletePergunta(perguntaid) {


		axios.delete(ip + '/forms/delete', {data: 
			{
				id:perguntaid,

			}, ...authHeader()
        })

			.then(function (data) {
				getForms()
			})
			.catch(error => {
				return error;
			})

	}





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
                        ><i className="bi bi-pencil-fill"></i>
                        </button>

                        

                        <button type="button"
                            className="btn btn-outline-danger mx-2"
                            onClick={() => handleDeletePergunta(pergunta.id)}
                        ><i className="bi bi-trash-fill"></i>
                        </button>
                    </td>
                   
                </tr>
               
            </tbody>
        </table>




    )
};

