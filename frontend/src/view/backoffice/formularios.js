import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import NavDeLado from './navdelado'
import ip from '../../ip'

export default function FormulariosComponent() {

    const [forms, setForms] = useState([])

    useEffect(() => {
        axios.get('http://'+ip+':4011/forms/all')
            .then(res => {
                console.table(res.data.formularios, ['id', 'nome'])
                setForms(res.data.formularios)
            })
    }, [])

    function LoadForms() {
        return forms.map(form => {
            return (
                <div className='col-12 mb-4'>
                    <div className='h2 text-white bg-dark p-2 m-0'>
                        {form.nome}
                        <div className='fs-6 fw-normal'>
                            {form.descricao}
                        </div>
                    </div>


                    <table className='table border'>
                        <tbody>
                            {
                                form.grupos.map(grupo => {
                                    return (
                                        <>
                                            <tr>
                                                <td colSpan={4} className='fs-4 fw-semibold p-2 m-0 bg-secondary text-white'>
                                                    {grupo.titulo}
                                                </td>
                                            </tr>
                                            <tr className=''>
                                                <table className='table table-sm mb-0 border '>
                                                    <thead className='text-secondary bg-light'>
                                                        <tr>
                                                            <th>Texto</th>
                                                            <th>Descrição</th>
                                                            <th>Tipo</th>
                                                            <th>Preço</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            grupo.pergunta.map(pergunta => {
                                                                return (
                                                                    <tr>
                                                                        <td style={{width: '20%'}}>{pergunta.texto}</td>
                                                                        <td style={{width: '60%'}}>{pergunta.descricao}</td>
                                                                        <td style={{width: '10%'}}>{pergunta.tipo}</td>
                                                                        <td style={{width: '10%'}}>{pergunta.preco}</td>
                                                                    </tr>

                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            )
        })
    }

    return (
        <div className="container-fluid">
            <div className="row vh-100">

                <NavDeLado />


                <div className="col overflow-auto h-sm-100">

                    <main className="row px-5">
                        {/* Titulo */}
                        <div className='col-12 my-4'>
                            <div className='display-3 text-indigo'>
                                Formulários
                            </div>
                        </div>

                        <div className='col-12'>
                            <div className='row'>

                                <LoadForms />

                            </div>
                        </div>

                    </main>

                </div>

            </div>
        </div>
    )


}