import React from 'react'
import axios from 'axios';
import ip from '../../../ip';
import authHeader from '../../auth-header'

const AddRow = ({handleCancelClick,id}) => {


const [dataPergunta, setDataPergunta]= useState("");
const [newTitulo, setNewTitulo] = useState("");
const [newDescricao, setNewDescricao] = useState("");
const [newTipoPergunta, setNewTipoPergunta] = useState("");
const [newValorUnitario, setNewValorUnitario] = useState("");

const [listaTiposPergunta, setListaTiposPergunta] = useState([])



function SendCreate() {
    e.preventDefault()

    const url = baseUrl + "/filmes/create/"
        const datapost = {
            titulo: newTitulo,
            descricao: newDescricao,
            tipo_pergunta: newTipoPergunta,
            valor_unitario: newValorUnitario,
        }
    
    axios.post (ip + '')
}







  return (
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
								onChange={handleAddFormChange}
							/></td>



						<td style={{ width: "40%" }}>
							<input
								className="form-control focus-warning"
								type="text"
								name="descricao"
								required="required"
								placeholder="Introduz a descrição"
								onChange={handleAddFormChange}
							/>
						</td>



						<td style={{ width: "10%" }}>
							<input
								className="form-control focus-warning"
								type="text"
								name="tipo_pergunta"
								required="required"
								placeholder="Introduz o tipo de pergunta"
								onChange={handleAddFormChange}
							/>
							{/* 
                            <div class="dropdown">
                                <button class="form-control focus-warning dropdown-toggle"
                                    type="button"
                                    id="dropdownMenu2"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false">

                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                    <li>
                                        <button class="dropdown-item"
                                            type="button">
                                            {LoadTiposPergunta}
                                        </button>
                                    </li>
                                </ul>
                            </div> 

 */}
						</td>


						<td style={{ width: "10%" }}>
							<input
								className="form-control focus-warning"
								type="number"
								name="valor_unitario"
								required="required"
								placeholder="Introduz o valor da pergunta"
								onChange={handleAddFormChange}
							/>
						</td>



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
  )
}

export default AddRow