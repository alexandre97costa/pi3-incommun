import axios from 'axios';

import React, { useEffect, useState } from "react";

import ip from '../../ip'

export default function FormulariosComponente(props) {

	const [forms, setForms] = useState([])
	const [tiposPergunta, setTiposPergunta] = useState([])

	const [filtroTiposPergunta, setFiltroTiposPergunta] = useState(0)
	const [filtroTiposPerguntaDesc, setFiltroTiposPerguntaDesc] = useState('Tipos de Pergunta')

	useEffect(() => {
		axios.get(ip + '/forms/all_backoffice')
			.then(res => {
				console.table(res.data.formularios, ['id', 'nome'])
				setForms(res.data.formularios)
			})
	}, [])

	useEffect(() => {
		// Get os pedidos todos (por vezes filtrados e ordenados)
		axios.get(ip + '/forms/all_tipos_pergunta')
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


	function LoadForms() {
		return forms.map(form => {
			return (
				<div className="accordion-item border-0" key={form.id}>
					<div className="accordion-header" id={'form-' + form.id}>
						<button
							type="button"
							className="accordion-button collapsed fs-3"
							data-bs-toggle="collapse" data-bs-target={'#form-collapse-' + form.id}
							aria-expanded="false" aria-controls={'form-collapse-' + form.id}
						>
							{form.titulo}
						</button>
					</div>
					<div
						id={'form-collapse-' + form.id}
						className="accordion-collapse collapse"
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
													className='accordion-button collapsed fs-4 bg-light'
													data-bs-toggle="collapse" data-bs-target={'#grupo-collapse-' + grupo.id}
													aria-expanded="false" aria-controls={'grupo-collapse-' + grupo.id}
												>
													{grupo.titulo}
												</button>
											</div>
											<div
												id={'grupo-collapse-' + grupo.id}
												className="accordion-collapse collapse"
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

																		<td><input
																			type="text"
																			className="form-control focus-warning"
																			value={pergunta.titulo}
																			
																		/></td>

																		<td><textarea
																			rows={1}
																			className="form-control focus-warning"
																			value={pergunta.descricao}
																			
																		/></td>

																		<td>
																			<div className="dropdown bg-white me-2">
																				<button className=" btn btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
																					{/* <span className='me-2'>{filtroTiposPerguntaDesc}</span> */}
																					<span className='me-2'>{pergunta.tipo_pergunta.titulo}</span>
																				</button>
																				<ul className="dropdown-menu">
																					<li>
																						<button
																							type='button'
																							className="dropdown-item"
																							onClick={e => {
																								setFiltroTiposPergunta(0)
																								setFiltroTiposPerguntaDesc('Tipo de Pergunta')
																							}}>
																						</button>
																					</li>

																					<LoadTiposPergunta />
																				</ul>
																			</div>
																		</td>

																		<td><input
																			type="number"
																			className="form-control"
																			value={pergunta.valor_unitario}
																			
																		></input></td>

																		<td>
																			<button
																				type="button"
																				className="btn btn btn-outline-success me-2"
																				
																			>
																				<i className="bi bi-save"></i>
																			</button>
																			<button
																				type="button"
																				className="btn btn btn-outline-danger"
																				
																			>
																				<i className="bi bi-trash3"></i>
																			</button>
																		</td>

																	</tr>
																)
															})}
														</tbody>
													</table>
													<h2> Adicionar Pergunta</h2>
													<form className='newformpergunta'>


														<input

															type="text"
															name="titulo"
															required="required"
															placeholder="Introduz o título da pergunta"

														/>

														<input
															type="text"
															name="descricao"
															required="required"
															placeholder="Introduz a descrição da pergunta"


														/>

														<input
															type="text"
															name="tipo_pergunta"
															required="required"
															placeholder="Introduz o tipo da pergunta"


														/>

														<input
															type="number"
															name="valor_unitario"
															required="required"
															placeholder="Introduz valor da pergunta"



														/>

														<button type="submit" className="btn btn-primary">Adicionar</button>

													</form>
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
				<div className="accordion accordion-flush" id="form-accordion">
					<LoadForms />
				</div>
			</div>

		</div>
	)

}