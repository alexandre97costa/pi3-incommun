import React, { useState, useContext, createContext, useEffect } from 'react'
import './styles/index.css'

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import NavDeCima from './view/forms/navdecima'
import NavDeLado from './view/backoffice/navdelado'
import Main from './view/main'
import Form from './view/forms/form'

import PrivateRoute from './view/backoffice/private_route'
import BoInicio from './view/backoffice/inicio'
import BoInicioV2 from './view/backoffice/inicio_v2'
import BoPedidos from './view/backoffice/pedidos'
import BoFormularios from './view/backoffice/formularios'
import BoClientes from './view/backoffice/clientes'
import BoPiechart from './view/backoffice/piechart'
import BoPedidosCliente from './view/backoffice/pedidos_cliente'

import BoLogin from './view/backoffice/login'
import JumboTron from './view/forms/jumbotron'


export default function App() {

	const [perguntasObject, setPerguntasObj] = useState({})

	// ! false para funcionar como deve ser, true para entrada livre 
	const [isLoggedIn, setLoggedIn] = useState(true)

	useEffect(() => {
		console.log('isLoggedIn =>', isLoggedIn)
	}, [isLoggedIn])

	// function isLoggedIn() {
	// 	console.log(JSON.parse(localStorage.getItem('user')))

	// 	// ! Usa-se este quando se tem um user_incommun na BD
	// 	return JSON.parse(localStorage.getItem('user'))?.success ?? false

	// 	// 		⬇    se quiserem simular um logout, trocar o true por false 
	// 	// return true
	// }

	return (
		<Router>
			<div className='App'>

				<Routes>
					<Route exact path='/' element={
						<>
							<NavDeCima auth={isLoggedIn}/>
							<JumboTron />
							<Main />
						</>
					} />

					<Route path='/servicos-personalizados/:nome' element={
						<>
							<NavDeCima auth={isLoggedIn}/>
							<Form
								perguntasObject={perguntasObject}
								setPerguntasObj={setPerguntasObj}
							/>
						</>
					} />

					<Route
						path='/back-office/login'
						element={<BoLogin setLoggedIn={setLoggedIn} />}

					/>





					<Route path='/back-office/' element={
						<PrivateRoute auth={isLoggedIn}>
							<div className="container-fluid">
								<div className="row vh-100">
									<NavDeLado setLoggedIn={setLoggedIn}/>
									<BoInicio />
								</div>
							</div>
						</PrivateRoute>
					} />



					<Route path='/back-office/inicio_v2' element={
						<PrivateRoute auth={isLoggedIn}>
							<div className="container-fluid">
								<div className="row vh-100">
									<NavDeLado setLoggedIn={setLoggedIn}/>
									<BoInicioV2 />
								</div>
							</div>
						</PrivateRoute>
					} />
					<Route path='/back-office/clientes' element={
						<PrivateRoute auth={isLoggedIn}>
							<div className="container-fluid">
								<div className="row vh-100">

									<BoClientes />
								</div>
							</div>
						</PrivateRoute>
					} />
					<Route path='/back-office/pedidos_cliente/:Cliente' element={
						<PrivateRoute auth={isLoggedIn}>
							<div className="container-fluid">
								<div className="row vh-100">

									<BoPedidosCliente />
								</div>
							</div>
						</PrivateRoute>
					} />

					<Route path='/back-office/formularios' element={
						<PrivateRoute auth={isLoggedIn}>
							<div className="container-fluid">
								<div className="row vh-100">
									<NavDeLado setLoggedIn={setLoggedIn}/>
									<BoFormularios />
								</div>
							</div>
						</PrivateRoute>
					} />

					<Route path='/back-office/pedidos' element={
						<PrivateRoute auth={isLoggedIn}>
							<div className="container-fluid">
								<div className="row vh-100">
									<NavDeLado setLoggedIn={setLoggedIn}/>
									<BoPedidos />
								</div>
							</div>
						</PrivateRoute>
					} />

					<Route path='/back-office/piechart' element={
						<PrivateRoute auth={isLoggedIn}>
							<div className="container-fluid">
								<div className="row vh-100">
									<NavDeLado setLoggedIn={setLoggedIn}/>
									<BoPiechart />
								</div>
							</div>
						</PrivateRoute>
					} />



					{/* se o link nao existir (404), aparece a pagina inicial */}
					<Route path='*' element={
						<Navigate to='/' replace={true} />
					} />
				</Routes>

			</div>
		</Router>
	);
}

