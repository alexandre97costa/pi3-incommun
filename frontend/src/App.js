import React, { useState } from 'react'
import './styles/index.css'

import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'

import NavDeCima from './view/forms/navdecima'
import NavDeLado from './view/backoffice/navdelado'
import Main from './view/main'
import Form from './view/forms/form'

import BoInicio from './view/backoffice/inicio'
import BoInicioV2 from './view/backoffice/inicio_v2'
import BoPedidos from './view/backoffice/pedidos'
import BoFormularios from './view/backoffice/formularios'
import BoClientes from './view/backoffice/clientes'
import BoPiechart from './view/backoffice/piechart'
import BoPedidosCliente from './view/backoffice/pedidos_cliente'

import BoLogin from './view/backoffice/login'


export default function App() {

	const [perguntasObject, setPerguntasObj] = useState({})

	return (
		<Router>
			<div className='App'>

				<Routes>
					<Route exact path='/' element={
						<>
							<NavDeCima />
							<Main />
						</>
					} />

					<Route path='/servicos-personalizados/:nome' element={
						<>
							<NavDeCima />
							<Form
								perguntasObject={perguntasObject}
								setPerguntasObj={setPerguntasObj}
							/>
						</>
					} />

					<Route 
						path='/back-office/login'
						element={<BoLogin />}

					/>

					<Route path='/back-office/' element={
						<div className="container-fluid">
							<div className="row vh-100">
								<NavDeLado />
								<BoInicio />
							</div>
						</div>
					} />

					<Route path='/back-office/inicio_v2' element={
						<div className="container-fluid">
							<div className="row vh-100">
								<NavDeLado />
								<BoInicioV2 />
							</div>
						</div>
					} />
					<Route path='/back-office/clientes' element={
						<div className="container-fluid">
							<div className="row vh-100">
								
								<BoClientes />
							</div>
						</div>
					} />
					<Route path='/back-office/pedidos_cliente/:Cliente' element={
						<div className="container-fluid">
							<div className="row vh-100">
								
								<BoPedidosCliente />
							</div>
						</div>
					} />

					<Route path='/back-office/formularios' element={
						<div className="container-fluid">
							<div className="row vh-100">
								<NavDeLado />
								<BoFormularios />
							</div>
						</div>
					} />

					<Route path='/back-office/pedidos' element={
						<div className="container-fluid">
							<div className="row vh-100">
								<NavDeLado />
								<BoPedidos />
							</div>
						</div>
					} />

					<Route path='/back-office/piechart' element={
						<div className="container-fluid">
							<div className="row vh-100">
								<NavDeLado />
								<BoPiechart />
							</div>
						</div>
					} />

				</Routes>
			</div>
		</Router>
	);
}

