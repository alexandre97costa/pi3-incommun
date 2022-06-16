import axios from 'axios';
import React, { useEffect, useState } from "react";

import ip from '../../ip'

export default function FormulariosComponente() {

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
				<div className="col-12 mb-4" key={form.id}>
					<div className="accordion accordion-flush col-12" id={"formulario" + form.id}>
						<div className="accordion-header" id={"formulario" + form.id}>
							<button
								type="button"
								className="accordion-button collapsed border-bottom border-warning"
								data-bs-toggle="collapse" data-bs-target={"#titulodoformulario" + form.id}
							>
								<div className="text-warning fs-3">
									{form.titulo}
								</div>
							</button>
						</div>
						{
							form.grupos.map(grupo => {
								return (
									<div key={grupo.id}>

										<div id={"titulodoformulario" + form.id} className="accordion-collapse collapse col-12 text-end">
											<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#grupo" + grupo.id}>
												<div className="text-success fs-4 ms-2 mb-0">{grupo.titulo}</div>
											</button>
										</div>

										<div id={"grupo" + grupo.id} className="accordion-collapse collapse">
											<div className="accordion-body p-0 ms-5 mt-0 mb-0">

												<table className="table table-borderless">
													<thead>
														<tr>
															<td style={{ width: "20%" }}>Titulo</td>
															<td style={{ width: "30%" }}>Descrição</td>
															<td style={{ width: "10%" }}>Tipo</td>
															<td style={{ width: "10%" }}>Valor</td>
															<td style={{ width: "30%" }}>Ações</td>
														</tr>
													</thead>
													<tbody>
														{
															grupo.pergunta.map(pergunta => {
																return (

																	<tr key={pergunta.id}>

																		<td>
																			<input type="text" className="form-control" value={pergunta.titulo}></input>
																		</td>


																		<td>
																			<textarea className="form-control" rows="1" value={pergunta.descricao} id="floatingTextarea"></textarea>
																		</td>


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

																		<td>
																			<input type="number" className="form-control" value={pergunta.valor_unitario}></input>
																		</td>

																		<td>
																			<button type="button" className="btn btn btn-success me-1"> <i className="text-white bi bi-save m-1"></i>Guardar</button>
																			<button type="button" className="btn btn btn-danger ms-1"> <i className="bi bi-folder-x"></i> Eliminar</button>

																		</td>

																	</tr>
																)
															})}
													</tbody>
												</table>
											</div>
										</div>
									</div>
								)
							})}

					</div>
				</div>
			)
		})
	}

	function LoadForms2() {
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
																			onChange={e => { }}
																		/></td>

																		<td><textarea
																			rows={1}
																			className="form-control focus-warning"
																			value={pergunta.descricao}
																			onChange={e => { }}
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
																			onChange={e => { }}
																		></input></td>

																		<td>
																			<button
																				type="button"
																				className="btn btn btn-outline-success me-2"
																				onClick={e => { }}
																			>
																				<i className="bi bi-save"></i>
																			</button>
																			<button
																				type="button"
																				className="btn btn btn-outline-danger"
																				onClick={e => { }}
																			>
																				<i className="bi bi-trash3"></i>
																			</button>
																		</td>

																	</tr>
																)
															})}
														</tbody>
													</table>
												</div>
											</div>
										</div>
									)
								})}
							</div>

						</div>
					</div>
				</div>
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
					<LoadForms2 />
				</div>
				{/* <LoadForms /> */}

			</div>

		</div>
	)

}