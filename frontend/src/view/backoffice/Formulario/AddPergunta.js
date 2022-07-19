import React, { useEffect, useState } from "react";
import axios from 'axios';
import ip from '../../../ip';
import authHeader from '../../auth-header'

export default function AddPergunta({ handleCancelClick, grupo_id }) {


	const [newTituloPergunta, setNewTituloPergunta] = useState('')
	const [newDescricaoPergunta, setNewDescricaoPergunta] = useState('')
	const [newTipoPerguntaId, setnewTipoPerguntaId] = useState(0)
	const [newTipoPerguntaText, setnewTipoPerguntaText] = useState('Tipo de pergunta')
	const [newValorPergunta, setNewValorPergunta] = useState('')
	const [listaTiposPergunta, setlistaTiposPergunta] = useState([])

	

	const [show, setShow] = useState(false)


	function handleNovaPergunta(e) {
		e.preventDefault()
		let grupoid = grupo_id


		axios.post(ip + '/forms/add',
			{
				grupo_id: grupoid,
				titulo: newTituloPergunta,
				descricao: newDescricaoPergunta,
				tipo_pergunta: parseInt(newTipoPerguntaId),
				valor_unitario: parseFloat(newValorPergunta),


			}, authHeader())

			.then(function (data) {
				window.location.reload()
			})
			.catch(error => {
				return error;
			})

	}


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
		!show ?
			<div className='w-100 d-flex justify-content-end'>
				<button type="button"
					className="btn btn-success mx-2 fs-6"
					onClick={(e) => setShow(true)}>
					Nova Pergunta
					<i className="ms-2 bi bi-plus-lg"></i>
				</button>
			</div>
			:
			<form onSubmit={handleNovaPergunta}>
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
									onChange={e => setNewTituloPergunta(e.target.value)}
								/>
							</td>

							<td style={{ width: "40%" }}>
								<input
									className="form-control focus-warning"
									type="text"
									name="descricao"
									required="required"
									placeholder="Introduz a descrição"
									onChange={e => setNewDescricaoPergunta(e.target.value)}
								/></td>



							<td style={{ width: "10%" }}>
								<div className="dropdown">
									<button 
									 type="button"
									className="form-control focus-warning dropdown-toggle d-flex justify-content-between align-items-center" 
									id="dropdownMenuButton1" data-bs-toggle="dropdown"
									 aria-expanded="false">
										{newTipoPerguntaText}
									</button>
									<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
										{listaTiposPergunta.map(TipoPergunta => {
											return (
												<li 
													className="dropdown-item"
													onClick={e => {
														setnewTipoPerguntaId(TipoPergunta.id)
														setnewTipoPerguntaText(TipoPergunta.titulo) 
													}}
												>
													{TipoPergunta.titulo}
												</li>
											)
										})}
									</ul>
								</div>
							</td>

							<td tyle={{ width: "10%" }}>
								<input
									className="form-control focus-warning"
									type="number"
									name="valor_unitario"
									required="required"
									placeholder="Valor da pergunta"
									onChange={e => setNewValorPergunta(e.target.value)}
								/>
							</td>


							<td style={{ width: "10%" }}>
								<button type="submit"
									className="btn btn-outline-success mx-2">
									<i className="bi bi-plus-circle"></i>
								</button>



								<button type="button"
									className="btn btn-outline-danger mx-2"
									onClick={e => setShow(false)}>
									<i className="bi bi-x-circle"></i>
								</button>
							</td>
						</tr>
					</tbody>
				</table>

			</form>
	)

};
