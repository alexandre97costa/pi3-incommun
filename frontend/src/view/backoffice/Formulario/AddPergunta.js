import React, { useEffect, useState } from "react";
import axios from 'axios';
import ip from '../../../ip';
import authHeader from '../../auth-header'

export default function AddPergunta({ handleCancelClick, grupo_id }) {


	const [newTituloPergunta, setNewTituloPergunta] = useState('')
	const [newDescricaoPergunta, setNewDescricaoPergunta] = useState('')
	const [newTipoPergunta, setNewTipoPergunta] = useState('')
	const [newValorPergunta, setNewValorPergunta] = useState('')


	function handleNovaPergunta(e) {
		e.preventDefault()
		let grupoid = grupo_id


		axios.post(ip + '/forms/add',
			{
				grupo_id: grupoid,
				titulo: newTituloPergunta,
				descricao: newDescricaoPergunta,
				tipo_pergunta: parseInt(newTipoPergunta),
				valor_unitario: parseFloat(newValorPergunta),


			}, authHeader())

			.then(function (data) {
				window.location.reload()
			})
			.catch(error => {
				return error;
			})

	}


	return (
		<form onSubmit={handleNovaPergunta}>

			<td style={{ width: "25%" }}>
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


			<td style={{ width: "15%" }}>
				<input
					className="form-control focus-warning"
					type="text"
					name="tipo_pergunta"
					required="required"
					placeholder="Tipo de pergunta"
					onChange={e => setNewTipoPergunta(e.target.value)}
				/></td>

			<td tyle={{ width: "10%" }}>
				<input
					className="form-control focus-warning"
					type="number"
					name="valor_unitario"
					required="required"
					placeholder="Valor da pergunta"
					onChange={e => setNewValorPergunta(e.target.value)}
				/></td>

			<td style={{ width: "10%" }}>
				<button type="submit"
					className="btn btn-outline-success mx-2">
					<i className="bi bi-plus-circle"></i>
				</button>



				<button type="button"
					className="btn btn-outline-danger"
					onClick={handleCancelClick}>
					<i className="bi bi-x-circle"></i>
				</button>

			</td>

		</form>
	)

};
