import { Link } from "react-router-dom";
// import React, { useEffect, useState } from 'react';
import React from 'react';
import './navdelado.css'
import LogoIncommun from '../../assets/imgs/logotipoincommun.png'

export default function NavDeLado2Component() {
    return (
        <div className="col-12 col-sm-3 col-lg-2 col-sm-2 bg-warning d-flex sticky-top px-0">
            <div className="d-flex flex-sm-column flex-row flex-grow-1 align-items-center align-items-sm-start pt-2"
            >
                <Link to='/' className='navbar-brand w-100 my-0 my-sm-4 text-light d-flex justify-content-start align-items-center'>
                    <img src={LogoIncommun} alt='incommun' className='w-75 ms-4' />
                </Link>


                {/* <ul id="menu" className=" nav nav-pills d-flex flex-sm-column flex-row flex-nowrap flex-shrink-1 flex-sm-grow-0 flex-grow-1 mb-sm-auto mb-0 justify-content-center align-items-center align-items-sm-start"> */}
                <ul id="menu" className="nav d-flex flex-row flex-sm-column  w-100">

                    {/* Inicio */}
                    <li className="mb-2">
                        <Link to="/back-office/" className="btn btn-outline-dark border-0 rounded-0 px-2 px-sm-0 d-flex align-items-center">
                            <i className="bi bi-house fs-4 ms-sm-3 ms-md-4 me-sm-2"></i>
                            <span className=" d-none d-sm-inline">Início</span>
                        </Link>
                    </li>

                    {/* Pedidos */}
                    <li className="mb-2">
                        <Link to="/back-office/pedidos" className="btn btn-outline-dark border-0 rounded-0 px-2 px-sm-0 d-flex align-items-center">
                            <i className="bi bi-file-earmark-spreadsheet fs-4 ms-sm-3 ms-md-4 me-sm-2"></i>
                            <span className="d-none d-sm-inline">Pedidos</span>
                        </Link>
                    </li>

                    {/* Formulários V2 */}
                    <li className="mb-2">
                        <Link to="/back-office/formularios" className="btn btn-outline-dark border-0 rounded-0 px-2 px-sm-0 d-flex align-items-center">
                            <i className="bi bi-ui-checks fs-4 ms-sm-3 ms-md-4 me-sm-2"></i>
                            <span className="d-none d-sm-inline ">
                                Formulários
                                <span className="badge bg-success px-1 ms-2">1</span>
                            </span>
                        </Link>
                    </li>


                    {/* Clientes */}
                    <li className="mb-2">
                        <Link to="/back-office/" className="btn btn-outline-dark border-0 rounded-0 px-2 px-sm-0 d-flex align-items-center">
                            <i className="bi bi-people fs-4 ms-sm-3 ms-md-4 me-sm-2"></i>
                            <span className="d-none d-sm-inline ">Clientes</span>
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