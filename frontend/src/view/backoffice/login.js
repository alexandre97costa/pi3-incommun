import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Count from './count'
import ip from '../../ip'

import LogoIncommun from '../../assets/imgs/logotipoincommun.png'



export default function PedidosComponent() {

    useEffect(() => {

    }, [])

    return (
        <div className='container-fluid vh-100 bg-dark-secondary text-light'>
            <div className='row h-100 d-flex flex-column justify-content-center align-items-center'>
                <div className='col-3 mb-4'>
                    <img className='w-100' src={LogoIncommun} alt="" />
                </div>
                <div className='col-3 mb-3 justify-content-center border p-4 rounded-3'>
                    <div className='h3 mb-3'>Login</div>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control focus-warning text-dark" id="floatingInput" placeholder="name@example.com" />
                        <label className='text-dark' for="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control focus-warning text-dark" id="floatingPassword" placeholder="Password" />
                        <label className='text-dark' for="floatingPassword">Password</label>
                    </div>
                    <button className='btn btn-warning w-100 fs-5 py-2'>
                        Entrar
                    </button>
                </div>
                <div className='col-3 mb-4'>
                    <div className='small text-secondary lh-sm'>
                        Esta área é reservada a administradores da Incommun Creative Lab.
                        Como cliente, não precisa de se registar para usar os nossos serviços.
                        <Link to={'/'} className="link-secondary ms-2">Voltar à página inicial.</Link>
                    </div>
                </div>
            </div>
        </div>

    )
}