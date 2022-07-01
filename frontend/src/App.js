import React, { useState, useContext, createContext, useEffect } from 'react'
import './styles/index.css'
import AuthService from "./view/auth.service"; 

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
import authService from './view/auth.service';


export default function App() {

	const [perguntasObject, setPerguntasObj] = useState({})

	return (
		<Router>
			<div className='App'>

				<Routes>
					<Route exact path='/' element={
						<>
							<NavDeCima auth={!!authService.getCurrentUser()}/>
							<JumboTron />
							<Main />
						</>
					} />

					<Route path='/servicos-personalizados/:nome' element={
						<>
							<NavDeCima auth={!!authService.getCurrentUser()}/>
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
						<PrivateRoute auth={!!authService.getCurrentUser()}>
							<div className="container-fluid">
								<div className="row vh-100">
									<NavDeLado/>
									<BoInicio />
								</div>
							</div>
						</PrivateRoute>
					} />



					<Route path='/back-office/inicio_v2' element={
						<PrivateRoute auth={!!authService.getCurrentUser()}>
							<div className="container-fluid">
								<div className="row vh-100">
									<NavDeLado/>
									<BoInicioV2 />
								</div>
							</div>
						</PrivateRoute>
					} />
					<Route path='/back-office/clientes' element={
						<PrivateRoute auth={!!authService.getCurrentUser()}>
							<div className="container-fluid">
								<div className="row vh-100">

									<BoClientes />
								</div>
							</div>
						</PrivateRoute>
					} />
					<Route path='/back-office/pedidos_cliente/:Cliente' element={
						<PrivateRoute auth={!!authService.getCurrentUser()}>
							<div className="container-fluid">
								<div className="row vh-100">

									<BoPedidosCliente />
								</div>
							</div>
						</PrivateRoute>
					} />

					<Route path='/back-office/formularios' element={
						<PrivateRoute auth={!!authService.getCurrentUser()}>
							<div className="container-fluid">
								<div className="row vh-100">
									<NavDeLado/>
									<BoFormularios />
								</div>
							</div>
						</PrivateRoute>
					} />

					<Route path='/back-office/pedidos' element={
						<PrivateRoute auth={!!authService.getCurrentUser()}>
							<div className="container-fluid">
								<div className="row vh-100">
									<NavDeLado/>
									<BoPedidos />
								</div>
							</div>
						</PrivateRoute>
					} />

					<Route path='/back-office/piechart' element={
						<PrivateRoute auth={!!authService.getCurrentUser()}>
							<div className="container-fluid">
								<div className="row vh-100">
									<NavDeLado/>
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

