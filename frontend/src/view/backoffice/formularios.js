import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ip from '../../ip'
import authHeader from '../auth-header'
import ReadOnlyRow from './ReadOnlyRow';
import EditableRow from './EditableRow';

export default function FormulariosComponente() {

	const [forms, setForms] = useState([])
	const [tiposPergunta, setTiposPergunta] = useState([])

	const [filtroTiposPergunta, setFiltroTiposPergunta] = useState(0)
	const [filtroTiposPerguntaDesc, setFiltroTiposPerguntaDesc] = useState('Tipos de Pergunta')

	const [editPerguntaId, setEditPerguntaId] = useState(null)

	const [editForm, setEditForm] = useState({
		titulo: "",
		descricao: "",
		tipo_pergunta: "",
		valor_unitario: "",

	})

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

	const handleEditClick = (e, pergunta) => {
		e.preventDefault();
		setEditPerguntaId(pergunta.id);

		const formValues = {
			titulo: pergunta.titulo,
			descricao: pergunta.descricao,
			tipo_pergunta: pergunta.tipo_pergunta,
			valor_unitario: pergunta.valor_unitario
		}

		setEditForm(formValues);

	};



	const handleEditForm = (e => {
		e.preventDefault();

		const fieldTitulo  = e.target.getAttribute("titulo");
		const fieldValue = e.target.value;

		const newForm = { ... editForm };
		newForm [ fieldTitulo] = fieldValue;

		setEditForm(newForm)

	})



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
													{grupo.pergunta.map(pergunta => {
														return (
															<tr key={pergunta.id}>


															
																<table className="table table-hover">
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
																		
																		{editPerguntaId === pergunta.id ? (
																		<EditableRow />
																		 ) : (
																		<ReadOnlyRow pergunta={pergunta}
																		 handleEditClick={handleEditClick}
																		/>
																		)}
																	</tbody>


																</table>
																

															</tr>

														)
													})}


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

};