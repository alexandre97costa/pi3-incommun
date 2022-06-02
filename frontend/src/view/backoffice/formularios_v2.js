import axios from 'axios';
import React, { useEffect, useState } from "react";
import NavDeLado from './navdelado'
import ip from '../../ip'

export default function FormulariosComponente() {

    const [forms, setForms] = useState([])

    useEffect(() => {
        axios.get('http://' + ip + ':4011/forms/all')
            .then(res => {
                console.table(res.data.formularios, ['id', 'nome'])
                setForms(res.data.formularios)
            })
    }, [])

    function LoadForms() {
        return forms.map(form => {
            return (
                <div className="col-12" key={form.id}>

                    <div className="fs-4 fw.bold text-warning">
                        {form.descricao}
                    </div>


                    <div className="accordion accordion-flush m-2" id={"accordion-" + form.id} >
                        <div className="accordion-item">
                            <h2 className="accordion-header" id={"accordion-header-" + form.id}>
                                {
                                    form.grupos.map(grupo => {
                                        return (
                                            <div key={grupo.id}>
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#a" + form.id} >
                                                    {grupo.titulo}
                                                </button>
                                            </div>
                                        )
                                    })
                                }
                            </h2>
                            <div id={"a" + form.id} className="accordion-collapse collapse" data-bs-parent={"#accordion-" + form.id}>
                                <div className="accordion-body">


                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <td style={{ width: "20%" }}>Titulo da Pergunta</td>
                                                <td style={{ width: "40%" }}>Descrição</td>
                                                <td style={{ width: "10%" }}>Tipo de Pergunta</td>
                                                <td style={{ width: "10%" }}>Valor</td>
                                                <td style={{ width: "20%" }}>Ações</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>

                                                <th scope="row">
                                                    <input type="email" className="form-control" value=""></input>
                                                </th>

                                                <td>
                                                    <input type="email" className="form-control" value=""></input>
                                                </td>

                                                <td>
                                                    <div className="dropdown">
                                                        <button className="btn outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" value="checkbox">

                                                        </button>
                                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                            {/* Tenho que fazer aqui um get da inf da BD */}

                                                            <li><a className="dropdown-item" href="#">Acti6on</a></li>
                                                            <li><a className="dropdown-item" href="#">Another action</a></li>
                                                            <li><a className="dropdown-item" href="#">Something else here</a></li>

                                                        </ul>
                                                    </div>
                                                </td>
                                                <td>

                                                    <input type="number" className="form-control" value=""></input>

                                                </td>

                                                <td>

                                                    <button type="button" className="btn-sm btn btn-success me-1"> <i className="text-white bi bi-save m-1"></i>Guardar</button>
                                                    <button type="button" className="btn-sm btn btn-danger ms-1"> <i className="bi bi-folder-x"></i> Eliminar</button>

                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="container-fluid ps-0">
            <div className="row vh-100">

                <NavDeLado />


                <div className="col overflow-auto h-sm-100">

                    <div className="row px-4">
                        {/* Titulo */}
                        <div className='col-12 my-4'>
                            <div className='display-3 text-indigo'>
                                Formulários
                            </div>
                        </div>
                    </div>

                    <div className='row px-4'>


                        <LoadForms />
                        {/*Aqui será onde ficará o conteúdo dos formulários!?*/}





                    </div>

                </div>

            </div>
        </div>
    )


}