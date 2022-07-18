import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import authService from './view/auth.service';
import './styles/index.css'



import NavDeCima from './view/forms/navdecima'
import NavDeLado from './view/backoffice/navdelado'
import Main from './view/main'
import Form from './view/forms/form'
import JumboTron from './view/forms/jumbotron'
import Footer from './view/forms/footer'
import BoLogin from './view/backoffice/login'

import PrivateRoute from './view/backoffice/private_route'
import BoInicio from './view/backoffice/Inicio/inicio'
import BoPedidos from './view/backoffice/pedidos'
import BoFormularios from './view/backoffice/Formulario/formularios'
import BoClientes from './view/backoffice/clientes'
import BoPiechart from './view/backoffice/piechart'
import BoPedidosCliente from './view/backoffice/pedidos_cliente'
import BoVisitas from './view/backoffice/Testes/visitas'
import BoAlterarPedido from './view/backoffice/alterar_pedido';

import UsersModalComponent from './view/backoffice/users_modal'
import CriarUserModalComponent from './view/backoffice/criar_user_modal'
import EliminarUserModalComponent from './view/backoffice/eliminar_user_modal'


export default function App() {

	const [perguntasObject, setPerguntasObj] = useState({})
	const [login, setLogin] = useState(process.env.REACT_APP_MODE === 'development' || (!!authService?.getCurrentUser() ?? false))

	useEffect(() => {
		// console.log('user', process.env.REACT_APP_MODE === 'development' || (authService?.getCurrentUser() ?? false))
		console.log('user', !!authService?.getCurrentUser() ?? false)
		console.log('login', login)
	}, [login])

	function BackOffice(props) {
		return (
			<PrivateRoute auth={login}>
				<div className='container-fluid'>
					<div className='row vh-100'>
						<NavDeLado setLogin={setLogin} />
						{props.pagina}
						<UsersModalComponent />
						<CriarUserModalComponent />
						<EliminarUserModalComponent />
					</div>
				</div>
			</PrivateRoute>
		)
	}


	return (
		<Router>
			<Routes>
				<Route exact path='/' element={
					<>
						<NavDeCima auth={login} />
						<JumboTron />
						<Main />
						<Footer />
					</>
				} />

				<Route path='/servicos-personalizados/:nome' element={
					<>
						<NavDeCima auth={login} />
						<Form
							perguntasObject={perguntasObject}
							setPerguntasObj={setPerguntasObj}
						/>
						<Footer />
					</>
				} />

				<Route path='/back-office/login' element={
					<BoLogin setLogin={setLogin} />
				} />

				<Route path='/back-office/' element={
					<BackOffice pagina={<BoInicio />} />
				} />
				<Route exact path='/back-office/pedidos' element={
					<BackOffice pagina={<BoPedidos />} />
				} />
				<Route path='/back-office/formularios' element={
					<BackOffice pagina={<BoFormularios />} />
				} />
				<Route exact path='/back-office/clientes' element={
					<BackOffice pagina={<BoClientes />} />
				} />
				<Route path='/back-office/piechart' element={
					<BackOffice pagina={<BoPiechart />} />
				} />
				<Route path='/back-office/visitas' element={
					<BackOffice pagina={<BoVisitas />} />
				} />

				{/* Rotas secundárias */}
				<Route path='/back-office/pedidos/:idPedido' element={
					<BackOffice pagina={<BoAlterarPedido />} />
				} />
				<Route path='/back-office/clientes/:idCliente' element={
					<BackOffice pagina={<BoPedidosCliente />} />
				} />


				{/* se o link nao existir, volta à pagina inicial */}
				<Route path='*' element={<Navigate to='/' replace={true} />} />

			</Routes>
		</Router>
	);
}

