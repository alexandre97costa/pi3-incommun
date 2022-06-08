import React, { useState } from 'react'
import './styles/index.css'

import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'

import NavDeCima from './view/forms/navdecima'
import Main from './view/main'
import Form from './view/forms/form'

import BoInicio from './view/backoffice/inicio'
import BoPedidos from './view/backoffice/pedidos'
import BoFormularios from './view/backoffice/formularios'
import BoFormulariosV2 from './view/backoffice/formularios_v2'


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

					<Route path='/back-office/' element={<BoInicio />} />
					<Route path='/back-office/pedidos' element={<BoPedidos />} />
					<Route path='/back-office/formularios' element={<BoFormularios />} />
					<Route path='/back-office/formularios_v2' element={<BoFormulariosV2 />} />



				</Routes>
			</div>
		</Router>
	);
}

