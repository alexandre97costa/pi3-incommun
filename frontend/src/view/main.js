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
            <div className='row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-5 gy-3'>
                <div className='col border border-warning border-5 rounded  icon-center' >
                    <i class="bi bi-journal-text text-warning resize-icon"><h1 className='text-dark'>Mini Questinário</h1></i>
                </div>

                <div className='icon-center margin-top-5'>
                    <i class="bi bi-chevron-right text-warning resize-icon"></i>
                </div>

                <div className='col border border-warning border-5 rounded icon-center'>
                    <i class="bi bi-wallet2 text-warning resize-icon"><h1 className='text-dark'>Receba o orçamento</h1></i>
                </div>

                <div className='icon-center margin-top-5'>
                    <i class="bi bi-chevron-right text-warning resize-icon"></i>
                </div>

                <div className='col border border-warning border-5 rounded icon-center'>
                    <i class="bi bi-geo-alt-fill text-warning resize-icon"><h1 className='text-dark'>Pedido entregue!</h1></i>
                </div>
            </div>

            <div className='text-center margin-top-bottom-10'>
                <button
                    className='rounded-pill bg-purple text-white'
                    style={{ width: '300px' }}
                >
                    <h3>Pedir Orçamento</h3>
                </button>
            </div>

            <div class='text-a-right margin-top-bottom-10'>
                <span><h1><i class="bi bi-twitter text-warning" style={{padding: '2%'}}></i>Gestão de Redes Sociais</h1></span>
                <h3>Na incommun, impulsionamos as redes sociais da sua marca.
                    Se ainda não implementou a gestão de redes sociais na sua empresa, está no sítio certo.
                    A estratégia é definida aqui. Na incommmun contamos com pacotes mensais ou
                    anuais que são adaptados às necessidades de cada cliente.
                </h3>
                <button
                    className='bg-warning text-white'
                    style={{ width: '300px' }}>
                    <h3>Orçamento</h3>
                </button>
            </div>

            <div class='text-a-left margin-top-bottom-10'>
                <span><h1>Criação de Website<i class="bi bi-window-desktop text-warning"  style={{padding: '2%'}}></i></h1></span>
                <h3>Aqui na incommun podemos criar um site para a sua empresa
                    Temos algumas opções para si desde landing pages, útil como cartão de visita
                    Ou então talvez queria um loja online ou um site para promover a sua empresa
                    sendo até possível uma combinação entre ambos
                </h3>
                <button
                    className='bg-warning text-white'
                    style={{ width: '300px' }}>
                    <h3>Orçamento</h3>
                </button>
            </div>

            <div class='text-a-right margin-top-bottom-10'>
                <span><h1><i class="bi bi-pencil-fill text-warning"  style={{padding: '2%'}}></i>Identidade Visual</h1></span>
                <h3>A incommunn oferecemos também um serviço de criação de identidades visuais
                    Quaçlquer empresa necessita dum logotipo
                </h3>
                <button
                    className='bg-warning text-white'
                    style={{ width: '300px' }}>
                    <h3>Orçamento</h3>
                </button>
            </div>

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