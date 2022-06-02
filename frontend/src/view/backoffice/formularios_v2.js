import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootstrap-icons/font/bootstrap-icons.css";
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
                <div class="col-12 d-flex flex-column h-sm-100">

   


                    <div class="accordion accordion-flush m-2" id={"accordion" + form.id}>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#a" + form.id} aria-expanded="false" aria-controls="flush-collapseOne">
                                <div className="fs-4 fw.bold text-warning">
                        {form.descricao}
                    </div>
                                </button>
                            </h2>
                            <div id={"a" + form.id} class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">


                                    <table class="table">
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
                                                    <input type="email" class="form-control" value=""></input>
                                                </th>

                                                <td>
                                                    <input type="email" class="form-control" value=""></input>
                                                </td>

                                                <td>
                                                    <div class="dropdown">
                                                        <button class="btn outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" value="checkbox">

                                                        </button>
                                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                            {/* Tenho que fazer aqui um get da inf da BD */}

                                                            <li><a class="dropdown-item" href="#">Acti6on</a></li>
                                                            <li><a class="dropdown-item" href="#">Another action</a></li>
                                                            <li><a class="dropdown-item" href="#">Something else here</a></li>

                                                        </ul>
                                                    </div>
                                                </td>
                                                <td>

                                                    <input type="number" class="form-control" value=""></input>

                                                </td>

                                                <td>

                                                    <button type="button" class="btn-sm btn btn-success me-1"> <i class="text-white bi bi-save m-1"></i>Guardar</button>
                                                    <button type="button" class="btn-sm btn btn-danger ms-1"> <i class="bi bi-folder-x"></i> Eliminar</button>

                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            )
        })
    }

    return (
        <div className="container-fluid ps-0">
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
                                {/*Aqui será onde ficará o conteúdo dos formulários!?*/}





                            </div>
                        </div>

                    </main>

                </div>

            </div>
        </div>
    )


}