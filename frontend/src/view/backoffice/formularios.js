import axios from 'axios';
import { useParams } from "react-router-dom";

import React, { useEffect, useState } from "react";
import ip from '../../ip'
import authHeader from '../auth-header'

export default function FormulariosComponente() {

	const [forms, setForms] = useState([])
	const [tiposPergunta, setTiposPergunta] = useState([])

	const [filtroTiposPergunta, setFiltroTiposPergunta] = useState(0)
	const [filtroTiposPerguntaDesc, setFiltroTiposPerguntaDesc] = useState('Tipos de Pergunta')

	const [edittitulopergunta, seteditTituloPergunta] = useState("")
	const [editdescricaopergunta, seteditdescricaopergunta] = useState("")
	const [edittipopergunta, setedittipopergunta] = useState("")
	const [editvalorpergunta, seteditvalorpergunta] = useState("")


	useEffect(() => {
		axios.get(ip + '/forms/all_backoffice', authHeader())
			.then(res => {
				console.table(res.data.formularios, ['id', 'nome'])
				setForms(res.data.formularios)
			})
	}, [])

	useEffect(() => {
		// Get os pedidos todos (por vezes filtrados e ordenados)
		axios.get(ip + '/forms/all_tipos_pergunta', authHeader())
			.then(res => {
				console.log(res.data)
				setTiposPergunta(res.data.data)
			})
	}, [filtroTiposPergunta])


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



	function UpdateTituloPergunta(e) {
		e.preventDefault()
		let idpergunta = e.target.getAttribute('data-id')

		axios.post(ip + '/forms/edit?id=' + idpergunta,
			{
				titulo: edittitulopergunta,
				descricao: editdescricaopergunta,
				tipo_pergunta: parseInt(edittipopergunta),
				valor_unitario: parseFloat(editvalorpergunta),

			}, authHeader())

			.then(function (data) {
				window.location.reload()
			})
			.catch(error => {
				return error;
			})
	}


	function LoadForms() {
		return forms.map(form => {
			return (
				<div className="accordion-item border-0" key={form.id}>
					<div className="accordion-header" id={'form-' + form.id}>
						<button
							type="button"
							className="accordion-button collapsed.show fs-3"
							data-bs-toggle="collapse" data-bs-target={'#form-collapse-' + form.id}
							aria-expanded="false" aria-controls={'form-collapse-' + form.id}
						>
							{form.titulo}
						</button>
					</div>
					<div
						id={'form-collapse-' + form.id}
						className="accordion-collapse collapse.show"
						data-bs-parent="#form-accordion"
						aria-labelledby={'#form-' + form.id}
					>
						<div className="accordion-body p-0 border">

							<div className="accordion accordion-flush" id={"form-grupo-accordion-" + form.id}>
								{form.grupos.map(grupo => {
									return (
										<div className='accordion-item ' key={grupo.id}>
											<div className='accordion-header' id={'grupo-' + grupo.id}>
												<button
													type='button'
													className='accordion-button collapsed.show fs-4 bg-light'
													data-bs-toggle="collapse" data-bs-target={'#grupo-collapse-' + grupo.id}
													aria-expanded="false" aria-controls={'grupo-collapse-' + grupo.id}
												>
													{grupo.titulo}
												</button>
											</div>
											<div
												id={'grupo-collapse-' + grupo.id}
												className="accordion-collapse collapse.show"
												data-bs-parent={"#form-grupo-accordion-" + form.id}
												aria-labelledby={'#grupo-' + grupo.id}
											>
												<div className='accordion-body'>
													<table className="table table-borderless">
														<thead className='fw-semibold'>
															<tr>
																<td style={{ width: "30%" }}>Titulo</td>
																<td style={{ width: "40%" }}>Descrição</td>
																<td style={{ width: "10%" }}>Tipo</td>
																<td style={{ width: "10%" }}>Valor</td>
																<td style={{ width: "10%" }}>Ações</td>
															</tr>
														</thead>

														<tbody>
															{grupo.pergunta.map(pergunta => {
																return (
																	<tr key={pergunta.id}>

																		<td>

																			<input
																				type="text"
																				className="form-control focus-warning"
																				defaultValue={pergunta.titulo}
																			/>
																		</td>

																		<td><textarea
																			rows={1}
																			className="form-control focus-warning"
																			defaultValue={pergunta.descricao}

																		/></td>

																		<td>
																			<div className="dropdown bg-white me-2">
																				<button className=" btn btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
																					
																					<span className='me-2'>{pergunta.tipo_pergunta.titulo}</span>
																				</button>
																				<ul className="dropdown-menu">
																					<li>
																						<button
																							type='button'
																							className="dropdown-item"
																						>
																						</button>
																					</li>

																					<LoadTiposPergunta />
																				</ul>
																			</div>
																		</td>

																		<td><input
																			type="number"
																			className="form-control"
																			defaultValue={pergunta.valor_unitario}

																		></input></td>

																		<td>
																			<button type="submit" className="btn btn btn-outline-success me-2"
																				onClick={() => UpdateTituloPergunta()}>edit<i className="bi bi-save"></i></button>



																			<button type="button" className="btn btn btn-outline-danger"

																			>
																				<i className="bi bi-trash3"></i>
																			</button>
																		</td>

																	</tr>

																)
															})}
														</tbody>
													</table>



													{/* <h2> Adicionar Pergunta</h2>
													<form className='newformpergunta'>

														<table className="table table-borderless pb-2">
															<thead className='fw-semibold'>

																<tr>
																	<td style={{ width: "30%" }}>Titulo</td>
																	<td style={{ width: "40%" }}>Descrição</td>
																	<td style={{ width: "10%" }}>Tipo</td>
																	<td style={{ width: "10%" }}>Valor</td>
																	<td style={{ width: "10%" }}>Ação</td>
																</tr>

															</thead>
															<tbody>


																<td><input
																	className="form-control focus-warning"
																	type="text"
																	name="titulo"
																	required="required"
																	placeholder="Introduz o título da pergunta"

																/></td>

																<td><input
																	className="form-control focus-warning"
																	type="text"
																	name="descricao"
																	required="required"
																	placeholder="Introduz a descrição da pergunta"


																/></td>

																<td><input
																	className="form-control focus-warning"

																	type="dropdown"
																	name="tipo_pergunta"
																	required="required"
																	placeholder="Introduz o tipo da pergunta"


																/></td>

																<td>	<input
																	className="form-control focus-warning"
																	type="number"
																	name="valor_unitario"
																	required="required"
																	placeholder="Introduz valor da pergunta"

																/></td>

																<button type="submit" className="btn btn-primary" >Adicionar</button>
															</tbody>
														</table>
													</form> */}

												</div>
											</div>
										</div>
									)
								})}


							</div>

						</div >

					</div >

				</div >

			)
		})
	}

	return (

		<div className="col overflow-auto h-sm-100 px-5 pt-4">

			<div className="mb-3 row">
				{/* Titulo */}
				<div className='col-12'>
					<div className='h2 text-dark fw-bold'>
						Formulários
					</div>
				</div>
			</div>

			<div className='row'>

				<form onSubmit={e => UpdateTituloPergunta(e)}>
					<input
						className="form-control focus-warning"
						type="text"
						name="titulo"
						required="required"
						placeholder="Introduz o titulo"
						value={edittitulopergunta} onChange={e => seteditTituloPergunta(e.target.value)}
					/>

					<input
						className="form-control focus-warning"
						type="text"
						name="descricao"
						required="required"
						placeholder="Introduz a descrição"
						value={editdescricaopergunta} onChange={e => seteditdescricaopergunta(e.target.value)}
					/>


					<input
						className="form-control focus-warning"
						type="text"
						name="tipo_pergunta"
						required="required"
						placeholder="Introduz o tipo de pergunta"
						value={edittipopergunta} onChange={e => setedittipopergunta(e.target.value)}
					/>

					<input
						className="form-control focus-warning"
						type="number"
						name="valor_unitario"
						required="required"
						placeholder="Introduz o valor da pergunta"
						value={editvalorpergunta} onChange={e => seteditvalorpergunta(e.target.value)}
					/>

					<button type="submit" className="btn btn-primary" >Adicionar</button>

				</form>


				<div className="accordion accordion-flush" id="form-accordion">
					<LoadForms />

				</div>
			</div>

		</div>
	)

};