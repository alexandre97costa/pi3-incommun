import { Link } from "react-router-dom";
// import React, { useEffect, useState } from 'react';
import React from 'react';
import './navdelado.css'
import LogoIncommun from '../../assets/imgs/logotipoincommun.png'

export default function NavDeLadoComponent() {
    return (
        <div className="col-12 col-sm-3 col-lg-2 col-sm-2 bg-warning d-flex sticky-top">
            <div className="d-flex flex-sm-column flex-row flex-grow-1 align-items-center align-items-sm-start pt-2"
            >
                <Link to='/' className='navbar-brand w-100 px-3 my-3 text-light d-flex align-items-center'>
                    <img src={LogoIncommun} alt='incommun' className='w-100' />
                </Link>


                <ul className="px-3 nav nav-pills d-flex flex-sm-column flex-row flex-nowrap flex-shrink-1 flex-sm-grow-0 flex-grow-1 mb-sm-auto mb-0 justify-content-center align-items-center align-items-sm-start"
                    id="menu">

                    {/* Inicio */}
                    <li className="nav-item">
                        <Link to="/back-office/" className="nav-link px-sm-0 px-2 text-white">
                            <i className="fs-5 bi-house"></i><span className="ms-2 d-none d-sm-inline">Início</span>
                        </Link>
                    </li>

                    {/* Pedidos */}

                    <li className="dropdown">
                        <button type='button' className="nav-link dropdown-toggle px-sm-0 px-1 text-white" id="dropdown1"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fs-5 bi bi-file-earmark-spreadsheet"></i><span
                                className="ms-2 d-none d-sm-inline">Pedidos</span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdown">
                            <li><Link className="dropdown-item" to="/back-office/pedidos">Todos os pedidos</Link></li>
                            <li><Link className="dropdown-item" to="/back-office/pedidos">Pedidos Aceites</Link></li>
                            <li><Link className="dropdown-item" to="/back-office/pedidos">Pedidos Pendentes</Link></li>
                            <li><Link className="dropdown-item" to="/back-office/pedidos">Pedidos Recusados</Link></li>
                        </ul>
                    </li>

                    {/* Preços */}
                    <li className="dropdown">
                        <button type='button' className="nav-link dropdown-toggle px-sm-0 px-1 text-white" id="dropdown2"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fs-5 bi-table"></i><span className="ms-2 d-none d-sm-inline">Preços</span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdown ">
                            <li><Link to="preco_tudo.html" className="dropdown-item">Todos os preços</Link></li>
                            <li><Link to="precos_redes.html" className="dropdown-item">Gestão de Redes Sociais</Link></li>
                            <li><Link to="precos_identidade.html" className="dropdown-item">Criação de Identidade Visual</Link></li>
                            <li><Link to="preco_landingpage.html" className="dropdown-item">Criação de Landing Page</Link></li>
                            <li><Link to="precos_website_inst.html" className="dropdown-item">Criação de Site Institucional</Link></li>
                            <li><Link to="preco_loja.html" className="dropdown-item">Criação de Loja Online</Link></li>
                            <li><Link to="preco_hibrido.html" className="dropdown-item">Criação de Híbrido</Link></li>
                        </ul>
                    </li>

                    {/* Clientes */}
                    <li className="nav-item ">
                        <Link to="clientes.html" className="nav-link px-sm-0 px-2 text-white">
                            <i className="fs-5 bi-people"></i><span className="ms-2 d-none d-sm-inline ">Clientes</span>
                        </Link>
                    </li>

                    {/* Formulários */}
                    <li className="nav-item ">
                        <Link to="/back-office/formularios" className="nav-link px-sm-0 px-2 text-white">
                            <i className="fs-5 bi bi-ui-checks"></i><span
                                className="ms-2 d-none d-sm-inline ">Formulários</span>
                        </Link>
                    </li>

                    {/* Formulários V2 */}
                    <li className="nav-item ">
                        <Link to="/back-office/formularios_v2" className="nav-link px-sm-0 px-2 text-white">
                            <i className="fs-5 bi bi-ui-checks"></i><span
                                className="ms-2 d-none d-sm-inline ">Formulários_v2</span>
                        </Link>
                    </li>



                </ul>
                <div className="dropdown py-sm-4 mt-sm-auto ms-auto ms-sm-0 flex-shrink-1">
                    <Link to="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                        id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        {/* <!-- IMAGEM CASO QUEIRAS
                                <img src="" alt="imagem" width="28" height="28" className="rounded-circle"> --> */}

                        <span className="fs-6 mx-1">User</span>
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                        <li><Link className="dropdown-item" to="#">Perfil</Link></li>
                        <li><Link className="dropdown-item" to="#">Configurações</Link></li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li><Link className="dropdown-item" to="#">Sign out</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}