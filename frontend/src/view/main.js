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
        return forms.map((form, index) => {
            return (
                <div key={form.id} className={((index % 2 === 0) ? 'text-end' : 'text-start') + ' mb-3'}>

                    <div className='fs-1 text-indigo lh-1'>
                        {form.titulo}
                    </div>

                    <div className='fs-5 my-3'>{form.descricao}</div>

                    <Link
                        className='btn btn-warning fs-4 fw-normal rounded-0 p-3'
                        to={'/servicos-personalizados/' + nomeTransform(form.titulo)}
                        state={{ id: form.id }}
                    >
                        Preencher formulário
                    </Link>
                </div>
            )
        })
    }

    return (
        <div className='container py-5 '>
            <div className='row flex-column flex-md-row justify-content-center mb-5 text-center'>

                <div className='col-3 border border-warning border-3 rounded-4 py-2'>
                    <i className="bi bi-journal-text text-warning fs-1"></i>
                    <div className='h3'>Complete um formulário</div>
                </div>

                <div className='col-1 d-flex justify-content-center align-items-center'>
                    <i className="bi bi-chevron-right text-warning fs-1"></i>
                </div>

                <div className='col-3 border border-warning border-3 rounded-4 py-2'>
                    <i className="bi bi-wallet2 text-warning fs-1"></i>
                    <div className='h3'>Receba o orçamento</div>
                </div>

                <div className='col-1 d-flex justify-content-center align-items-center'>
                    <i className="bi bi-chevron-right text-warning fs-1"></i>
                </div>

                <div className='col-3 border border-warning border-3 rounded-4 py-2'>
                    <i className="bi bi-geo-alt-fill text-warning fs-1"></i>
                    <div className='h3'>Pedido entregue!</div>
                </div>
            </div>


            {forms.length === 0 &&
                <div className='row justify-content-center mt-5 mb-3'>
                    <div className="spinner-grow text-secondary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
            <LoadLinks />

            
            <div>
                <h1 className='text-center my-4'>Acompanhe o nosso trabalho:</h1>
            </div>

            <div className='text-indigo row row-cols-8 text-center justify-content-center'>
                <i className="col-1 fs-2 bi bi-twitter" />
                <i className="col-1 fs-2 bi bi-instagram" />
                <i className="col-1 fs-2 bi bi-facebook" />
                <i className="col-1 fs-2 bi bi-linkedin" />
                <i className="col-1 fs-2 bi bi-youtube" />
                <i className="col-1 fs-2 bi bi-tiktok" />
            </div>

        </div>
    )

}        