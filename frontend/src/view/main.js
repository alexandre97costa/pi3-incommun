import axios from 'axios';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import ip from '../ip'

export default function MainComponent() {

    const [forms, setForms] = useState([])

    useEffect(() => {
        document.title = 'Incommun'

        axios.get(ip + '/forms/all_form_names')
            .then(res => { setForms(res.data) })

    }, [])

    useEffect(() => { console.log(forms) }, [forms])

    function nomeTransform(nome = '') {
        // TODO: transformar o nome com regex
        // maneira rápida de conseguir alterar o nome
        const newNome = nome
            .replaceAll(' ', '-')
            .replaceAll('---', '-')
            .replaceAll('ç', 'c')
            .replaceAll('ã', 'a')
            .replaceAll('í', 'i')
            .toLocaleLowerCase()
        return newNome
    }

    function LoadLinks() {
        return forms.map(form => {
            return (
                <div className='col' key={form.id}>
                    <Link
                        className='btn btn-outline-dark h-100 fs-3 fw-bold rounded-0 py-3 lh-1'
                        to={'/servicos-personalizados/' + nomeTransform(form.titulo)}
                        state={{ id: form.id }}
                    >
                        {form.titulo}
                        <small className='fs-6 lh-1 fw-normal d-none'>
                            {form.descricao}
                        </small>
                    </Link>
                </div>
            )
        })
    }

    return (
        <div className='container p-5'>

            <div className='display-3 text-indigo fw-bold mb-5'>
                Página Inicial
                {forms.length === 0 &&
                    <div className="spinner-grow text-secondary ms-3 align-baseline" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                }
            </div>
            <div className='row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 gy-3'>

                <div className='col'>
                    <Link
                        type='button'
                        className='btn btn-success h-100 w-100 fs-2 fw-bold rounded-0 py-4 '
                        to='/back-office'
                    >
                        <i className='bi bi-graph-up-arrow me-3'></i>
                        Back Office
                    </Link>
                </div>

                <LoadLinks />
            </div>
        </div>
    )

}        