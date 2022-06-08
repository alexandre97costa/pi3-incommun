import axios from 'axios';
import React, { useEffect, useState } from "react";

import ip from '../../ip'

export default function FormulariosComponente() {

	const [forms, setForms] = useState([])
	const [tiposPergunta, setTiposPergunta] = useState([])

	const [filtroTiposPergunta, setFiltroTiposPergunta] = useState(0)
	const [filtroTiposPerguntaDesc, setFiltroTiposPerguntaDesc] = useState('Tipos de Pergunta')


	useEffect(() => {
		axios.get('http://' + ip + ':4011/forms/all_backoffice')
			.then(res => {
				console.table(res.data.formularios, ['id', 'nome'])
				setForms(res.data.formularios)
			})
	}, [])

	useEffect(() => {
		// Get os pedidos todos (por vezes filtrados e ordenados)
		axios.get('http://' + ip + ':4011/forms/all_tipos_pergunta')
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
				<div className="col-12  mb-4"> <div key={form.id}>

					<div class="accordion accordion-flush  col-12" id={"formulario" + form.id}>
						<div class="accordion-header" id={"formulario" + form.id}>

							<button class="accordion-button collapsed border-bottom border-warning" type="button" data-bs-toggle="collapse" data-bs-target={"#titulodoformulario" + form.id}>
								<div className="text-warning fs-3"> 	{form.titulo} </div>
							</button>
						</div>
						{
							form.grupos.map(grupo => {
								return (
									<div key={grupo.id}>
										<>

											<div id={"titulodoformulario" + form.id} class="accordion-collapse collapse col-12 text-end">
												<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#grupo" + grupo.id}>
													<div className="text-success fs-4 ms-2 mb-0">{grupo.titulo}</div>
												</button>
											</div>

											<div id={"grupo" + grupo.id} class="accordion-collapse collapse">
												<div class="accordion-body p-0 ms-5 mt-0 mb-0">

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
																				<textarea class="form-control" rows="1" value={pergunta.descricao} id="floatingTextarea"></textarea>
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
																											className="dropdown-item"
																											type='button'
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
										</></div>
								)
							})}

					</div>
				</div>

				</div>

			)
		})
	}

	return (
		<div className="container-fluid">
			<div className="row vh-100">

			


				<div className="col overflow-auto h-sm-100">

					<div className="row px-4">
						{/* Titulo */}
						<div className='col-12 my-4'>
							<div className='display-3 text-indigo'>
								Formulários
							</div>
						</div>
					</div>

					<div className='row px-4'>
						<LoadForms />
						{/*Aqui será onde ficará o conteúdo dos formulários!?*/}

					</div>

				</div>

			</div>
		</div>
	)

}