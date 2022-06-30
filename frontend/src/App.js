import React, { useState, useContext, createContext } from 'react'
import './styles/index.css'

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

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

	function isLoggedIn() {
		// ! Usa-se este quando se tem um user_incommun na BD
		// return !!localStorage.getItem('user')

		// 		⬇    se quiserem simular um logout, trocar o true por false 
		return true
	}

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
						isLoggedIn() ?
						<div className="container-fluid">
							<div className="row vh-100">
								<NavDeLado />
								<BoInicio />
							</div>
						</div>
						:<Navigate to='/' replace={true} />
					} />

					<Route path='/back-office/inicio_v2' element={
						isLoggedIn() ?
						<div className="container-fluid">
							<div className="row vh-100">
								<NavDeLado />
								<BoInicioV2 />
							</div>
						</div>
						:<Navigate to='/' replace={true} />
					} />
					<Route path='/back-office/clientes' element={
						isLoggedIn() ?
						<div className="container-fluid">
							<div className="row vh-100">
								
								<BoClientes />
							</div>
						</div>
						:<Navigate to='/' replace={true} />
					} />
					<Route path='/back-office/pedidos_cliente/:Cliente' element={
						isLoggedIn() ?
						<div className="container-fluid">
							<div className="row vh-100">
								
								<BoPedidosCliente />
							</div>
						</div>
						:<Navigate to='/' replace={true} />
					} />

					<Route path='/back-office/formularios' element={
						isLoggedIn() ?
						<div className="container-fluid">
							<div className="row vh-100">
								<NavDeLado />
								<BoFormularios />
							</div>
						</div>
						:<Navigate to='/' replace={true} />
					} />

					<Route path='/back-office/pedidos' element={
						isLoggedIn() ?
						<div className="container-fluid">
							<div className="row vh-100">
								<NavDeLado />
								<BoPedidos />
							</div>
						</div>
						:<Navigate to='/' replace={true} />
					} />

					<Route path='/back-office/piechart' element={
						isLoggedIn() ?
						<div className="container-fluid">
							<div className="row vh-100">
								<NavDeLado />
								<BoPiechart />
							</div>
						</div>
						:<Navigate to='/' replace={true} />
					} />

				</Routes>
			</div>
		</Router>
	);
}

