import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export default function ListComponent() {
    const [dataFilmes, setdataFilmes] = useState([]);
    useEffect(() => {
        const url = "http://localhost:3011/filme/list";
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data;
                    setdataFilmes(data);
                } else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => { alert(error) });
    }, []);
    return (
        <div className='row'>

            <table className="table table-hover table-dark">
                <thead className="thead-dark text-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Título</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Avaliação</th>
                        <th scope="col">Lançamento</th>
                        <th scope="col">Foto</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody className='text-light'>
                    <LoadFillData />
                </tbody>
            </table>

        </div>
    );
    function LoadFillData() {
        return dataFilmes.map((data, index) => {
            return (
                <tr key={index}>
                    <th>{data.id}</th>
                    <td>{data.titulo}</td>
                    <td>{data.descricao}</td>
                    <td>{data.avaliacao}</td>
                    <td>{data.data_lancamento}</td>
                    <td>{data.foto}</td>
                    <td>

                        <div className='btn-group'>
                            <Link
                                className="btn btn-success "
                                title='Editar'
                                to={"/edit/" + data.id} >
                                <span><i className="bi bi-pencil-fill"></i></span>
                            </Link>
                            <Link
                                className="btn btn-danger "
                                title='Eliminar'
                                to={"/delete/" + data.id} >
                                <span><i className="bi bi-trash3-fill"></i></span>
                            </Link>
                        </div>

                    </td>
                </tr>
            )
        });
    }
}        