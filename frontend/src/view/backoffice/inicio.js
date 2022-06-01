// import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
// import React, { useEffect, useState } from 'react';
import React from 'react';
import NavDeLado from './navdelado'

export default function InicioComponent() {

    return (
        <div className="container-fluid">
            <div className="row vh-100">

                <NavDeLado />

                {/* <!-- INICIO DA BARRA TOP INFORMATIVA --> */}

                <div className="col d-flex flex-column h-sm-100">
                    <main className="row overflow-auto">

                        <p className="fs-3 d-flex ps-3 pt-2 mb-3"> BEM VINDO!</p>
                        <p className="fs-normal d-flex pt-0 ps-3"> Vista geral do último mês</p>
                        <div className="row">

                            <div className="px-xxl-4 px-xl-3 px-sm-2 px-xs-1 col-12 col-sm-6 col-lg-3 align-self-center">
                                <div
                                    className="py-2 border rounded-4 bg-light d-flex w-100 flex-row justify-content-between align-items-center shadow p-3 bg-body rounded">
                                    <div className="d-flex w-0 flex-row justify-content.between">
                                        <i className="m-0 ps-4 fs-2 bi bi-cash-stack text-primary"></i>
                                        <h6 className="m-0 pt-1 ps-3 text-start">Total <br /> Orçamentos</h6>
                                    </div>
                                    <p className="m-0 pe-3 fs-5 fw-bold">100</p>
                                </div>
                            </div>

                            <div className="px-xxl-4 px-xl-3 px-sm-2 px-xs-1 col-12 col-sm-6 col-lg-3 align-self-center">
                                <div
                                    className="py-2 border rounded-4 bg-light d-flex w-100 flex-row justify-content-between align-items-center shadow p-3 bg-body rounded">
                                    <div className="d-flex w-0 flex-row justify-content.between">
                                        <i className="m-0 ps-4 fs-2 bi bi-cart-dash text-warning"></i>
                                        <h6 className="m-0 pt-1 ps-3 text-start">Orçamentos <br /> Pendentes</h6>
                                    </div>
                                    <p className="m-0 pe-3 fs-5 fw-bold">100</p>
                                </div>
                            </div>

                            <div className="px-xxl-4 px-xl-3 px-sm-2 px-xs-1 col-12 col-sm-6 col-lg-3 align-self-center">
                                <div
                                    className="py-2 border rounded-4 bg-light d-flex w-100 flex-row justify-content-between align-items-center shadow p-3 bg-body rounded">
                                    <div className="d-flex w-0 flex-row justify-content.between">
                                        <i className="m-0 ps-4 fs-2 bi bi-cart-check text-success"></i>
                                        <h6 className="m-0 pt-1 ps-3 text-start">Orçamentos <br /> Aceites</h6>
                                    </div>
                                    <p className="m-0 pe-3 fs-5 fw-bold">100</p>
                                </div>
                            </div>

                            <div className="px-xxl-4 px-xl-3 px-sm-2 px-xs-1 col-12 col-sm-6 col-lg-3 align-self-center">
                                <div
                                    className="py-2 border rounded-4 bg-light d-flex w-100 flex-row justify-content-between align-items-center shadow p-3 bg-body rounded">
                                    <div className="d-flex w-0 flex-row justify-content.between">
                                        <i className="m-0 ps-4 fs-2 bi bi-cart-x text-danger"></i>
                                        <h6 className="m-0 pt-1 ps-3 text-start">Orçamentos <br /> Recusados</h6>
                                    </div>
                                    <p className="m-0 pe-3 fs-5 fw-bold">100</p>
                                </div>
                            </div>
                        </div>

                        {/* <!-- FIM DA BARRA TOP INFORMATIVA --> */}

                        {/* <!-- INICIO ORÇAMENTOS PENDENTES --> */}

                        <p className="fs-normal d-flex ps-3 mt-5"> Orçamentos Pendentes</p>
                        <div className="row text-center">

                            <div className="px-xxl-4 px-xl-3 px-sm-2 px-xs-1 col-12 col-sm-6 col-lg-3 align-self-center ">
                                <div className="border rounded-4 bg-white p-1 align-items-center shadow">
                                    <p className="fs-6 fw-lighter fst-italic m-0">Enviado por: </p>
                                    <p className="fs-4 fw-bolder"> Nome Cliente</p>
                                    <p className="fs-5 fw-semibold text-warning ">Título do projeto</p>
                                    <p className="fs-6 fw-light m-0"> Info1</p>
                                    <p className="fs-6 fw-light m-0"> Info2</p>
                                    <p className="fs-6 fw-light m-0"> Info3</p>
                                    <p className="fs-6 fw-light fst-italic text-success m-0">Ver mais: </p>
                                    <p className="fs-5 fw-semibold mt-4 mb-0">Valor Estimado: </p>
                                    <p className="fs-5 fw-bolder mt-0"> &VALOR& </p>
                                    <button type="button" className="btn btn-success mt-4 mb-2">Contactar Cliente</button>
                                </div>
                            </div>

                            <div className="px-xxl-4 px-xl-3 px-sm-2 px-xs-1 col-12 col-sm-6 col-lg-3 align-self-center ">
                                <div className="border rounded-4 bg-light p-1 align-items-center shadow">
                                    <p className="fs-6 fw-lighter fst-italic m-0">Enviado por: </p>
                                    <p className="fs-4 fw-bolder"> Nome Cliente</p>
                                    <p className="fs-5 fw-semibold text-warning ">Título do projeto</p>
                                    <p className="fs-6 fw-light m-0"> Info1</p>
                                    <p className="fs-6 fw-light m-0"> Info2</p>
                                    <p className="fs-6 fw-light m-0"> Info3</p>
                                    <p className="fs-6 fw-light fst-italic text-success m-0">Ver mais: </p>
                                    <p className="fs-5 fw-semibold mt-4 mb-0">Valor Estimado: </p>
                                    <p className="fs-5 fw-bolder mt-0"> &VALOR& </p>
                                    <button type="button" className="btn btn-success mt-4 mb-2">Contactar Cliente</button>
                                </div>
                            </div>

                            <div className="px-xxl-4 px-xl-3 px-sm-2 px-xs-1 col-12 col-sm-6 col-lg-3 align-self-center ">
                                <div className="border rounded-4 bg-light p-1 align-items-center shadow">
                                    <p className="fs-6 fw-lighter fst-italic m-0">Enviado por: </p>
                                    <p className="fs-4 fw-bolder"> Nome Cliente</p>
                                    <p className="fs-5 fw-semibold text-warning ">Título do projeto</p>
                                    <p className="fs-6 fw-light m-0"> Info1</p>
                                    <p className="fs-6 fw-light m-0"> Info2</p>
                                    <p className="fs-6 fw-light m-0"> Info3</p>
                                    <p className="fs-6 fw-light fst-italic text-success m-0">Ver mais: </p>
                                    <p className="fs-5 fw-semibold mt-4 mb-0">Valor Estimado: </p>
                                    <p className="fs-5 fw-bolder mt-0"> &VALOR& </p>
                                    <button type="button" className="btn btn-success mt-4 mb-2">Contactar Cliente</button>
                                </div>
                            </div>

                            <div className="px-xxl-4 px-xl-3 px-sm-2 px-xs-1 col-12 col-sm-6 col-lg-3 align-self-center ">
                                <div className="border rounded-4 bg-light p-1 align-items-center shadow">
                                    <p className="fs-6 fw-lighter fst-italic m-0">Enviado por: </p>
                                    <p className="fs-4 fw-bolder"> Nome Cliente</p>
                                    <p className="fs-5 fw-semibold text-warning ">Título do projeto</p>
                                    <p className="fs-6 fw-light m-0"> Info1</p>
                                    <p className="fs-6 fw-light m-0"> Info2</p>
                                    <p className="fs-6 fw-light m-0"> Info3</p>
                                    <p className="fs-6 fw-light fst-italic text-success m-0">Ver mais: </p>
                                    <p className="fs-5 fw-semibold mt-4 mb-0">Valor Estimado: </p>
                                    <p className="fs-5 fw-bolder mt-0"> &VALOR& </p>
                                    <button type="button" className="btn btn-success mt-4 mb-2">Contactar Cliente</button>
                                </div>
                            </div>
                        </div>

                        {/* <!-- FIM ORÇAMENTOS PENDENTES --> */}

                        {/* <!-- INICIO ONDE VAMOS A SEGUIR --> */}

                        <p className="fs-normal d-flex ps-3 mt-5"> Onde vamos a seguir?</p>
                        <div className="row mb-4">

                            <div className="px-xxl-4 px-xl-3 px-sm-2 px-xs-1 col-12 col-sm-6 col-lg-3 align-self-center">
                                <div
                                    className="py-2 border rounded-4 bg-light d-flex w-100 flex-row justify-content-between align-items-center shadow p-3 mb-5 bg-body rounded">
                                    <div className="d-flex w-0 flex-row justify-content.between">
                                        <i className="m-0 ps-4 fs-2 bi bi-inboxes text-primary"></i>
                                        <h6 className="m-0 pt-1 ps-3 text-start">Ver todos os <br /> Orçamentos</h6>
                                    </div>
                                </div>
                            </div>

                            <div className="px-xxl-4 px-xl-3 px-sm-2 px-xs-1 col-12 col-sm-6 col-lg-3 align-self-center">
                                <div
                                    className="py-2 border rounded-4 bg-light d-flex w-100 flex-row justify-content-between align-items-center shadow p-3 mb-5 bg-body rounded">
                                    <div className="d-flex w-0 flex-row justify-content.between">
                                        <i className="m-0 ps-4 fs-2 bi bi-cart text-warning"></i>
                                        <h6 className="m-0 pt-1 ps-3 text-start">Consultar a<br />tabela de Preços</h6>
                                    </div>
                                </div>
                            </div>

                            <div className="px-xxl-4 px-xl-3 px-sm-2 px-xs-1 col-12 col-sm-6 col-lg-3 align-self-center">
                                <div
                                    className="py-2 border rounded-4 bg-light d-flex w-100 flex-row justify-content-between align-items-center shadow p-3 mb-5 bg-body rounded">
                                    <div className="d-flex w-0 flex-row justify-content.between">
                                        <i className="m-0 ps-4 fs-2 bi bi-people text-success"></i>
                                        <h6 className="m-0 pt-1 ps-3 text-start">Ver todos <br />os clientes</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )

}        