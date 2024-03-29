import axios from 'axios';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import ip from '../../ip'
import PuzzlePieces from '../../assets/svgs/puzzle_pieces.svg'

export default function FrontPage() {

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

    function RestantesFormulários() {

        return (
            forms.map(form => {
                if (form.id < 4) { return (<div key={form.id} className='d-none'></div>) }
                return (
                    <div className='col' key={form.id}>
                        <div className='bg-transparent border border-warning border-3 p-4 pb-2 rounded-4'>
                            <div className='fs-2 fw-bold mb-3 text-dark'>
                                {form.titulo}
                            </div>
                            <div className='fs-5 fw-normal text-dark lh-sm mb-4'>
                                {form.descricao}
                            </div>

                            <Link
                                to={'/servicos-personalizados/' + nomeTransform(form.titulo)}
                                state={{id: form.id}}
                                className='btn btn-warning fw-semibold rounded-3 mb-3 w-100'
                            >
                                Vamos lá!
                            </Link>

                        </div>
                    </div>
                )
            })
        )
    }

    return (
        <div className='container-fluid'>
            {/* header */}
            <div className='row justify-content-center bg-warning bg-opacity-10 py-5' style={{ minHeight: '80vh' }}>
                <div className='col-5 d-flex flex-column justify-content-center align-items-start'>
                    <div className='fw-bold lh-sm' style={{ fontSize: '8rem', textShadow: '-10px 10px 0px var(--bs-warning)' }}>
                        Olá!
                    </div>
                    <div className='display-5'>
                        Vamos criar algo diferente?
                    </div>

                </div>
                <div className='col-4 d-flex align-items-center'>
                    <img className='img-fluid' src={PuzzlePieces} alt='' />
                </div>
            </div>

            <div className='row  bg-dark py-5 text-light'>
                <div className='col-12 text-center mb-5'>
                    <div className='display-3 fw-bold' >
                        Serviços personalizados&nbsp;
                        <span className='border-bottom border-warning border-5 '>à sua medida</span>
                    </div>
                </div>
                <div className='col-12 '>
                    <div className='container mt-5 mb-4'>
                        <div className='row row-cols-3 gx-5'>
                            <div className='col'>
                                <div className='position-relative border border-secondary border-4 bg-dark p-4  rounded-5'>
                                    {/* Icon */}
                                    <span className='fs-1 px-3 py-1 rounded-pill border border-secondary border-4 bg-dark text-warning position-absolute top-0 start-50 translate-middle'>
                                        <i className='bi bi-ui-checks'></i>
                                    </span>

                                    {/* Titulo */}
                                    <div className='fs-4 fw-bold mt-4 pt-2 mb-3'>
                                        1. Preencha um formulário
                                    </div>
                                    {/* Texto */}
                                    <div className='fs-5 fw-normal text-secondary lh-sm mb-3'>
                                        Basta responder a algumas perguntas rápidas! Estimamos que demore menos de 5 minutos a completá-lo.

                                    </div>

                                </div>
                            </div>
                            <div className='col '>
                                <div className='position-relative  border border-secondary border-4 bg-dark p-4  rounded-5'>
                                    {/* Icon */}
                                    <span className='fs-1 px-3 py-1 rounded-pill border border-secondary border-4 bg-dark text-warning position-absolute top-0 start-50 translate-middle'>
                                        <i className='bi bi-envelope-paper-heart'></i>
                                    </span>

                                    {/* Titulo */}
                                    <div className='fs-4 fw-bold mt-4 pt-2 mb-3'>
                                        2. Receba o seu orçamento
                                    </div>
                                    {/* Texto */}
                                    <div className='fs-5 fw-normal text-secondary lh-sm mb-3'>
                                        Entramos em contacto consigo para que tudo esteja do seu agrado! Todos os preços são negociáveis.
                                    </div>

                                </div>
                            </div>
                            <div className='col h-100'>
                                <div className='position-relative border border-secondary border-4 bg-dark p-4  rounded-5'>
                                    {/* Icon */}
                                    <span className='fs-1 px-3 py-1 rounded-pill border border-secondary border-4 bg-dark text-warning position-absolute top-0 start-50 translate-middle'>
                                        <i className='bi bi-gift'></i>
                                    </span>

                                    {/* Titulo */}
                                    <div className='fs-4 fw-bold mt-4 pt-2 mb-3'>
                                        3. Desfrute dos serviços!
                                    </div>
                                    {/* Texto */}
                                    <div className='fs-5 fw-normal text-secondary lh-sm mb-3'>
                                        Usufrua dos nossos serviços como quiser! O sucesso do seu negócio é a nossa maior motivação!
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row justify-content-center bg-warning bg-opacity-10 py-5'>
                <div className='col-12 text-center mb-5 mt-4'>
                    <div className='display-3 fw-bold' >
                        Vamos a isto?
                    </div>
                </div>
                <div className='col-12 mt-4 mb-5'>
                    <div className='container'>
                        <div className='row row-cols-3 gx-4'>
                            <div className='col'>
                                <div className='bg-transparent border border-warning border-3 p-4 pb-2 rounded-4'>

                                    {/* Titulo */}
                                    <div className='fs-2 fw-bold mb-3'>
                                        Criação de Website
                                    </div>
                                    <div className='fs-5 fw-normal text-dark lh-sm mb-4'>
                                        Criamos a sua porta de entrada ao mundo digital, personalizado às suas necessidades.

                                    </div>
                                    <div className='d-flex flex-column'>
                                        <Link to={'/servicos-personalizados/' + nomeTransform(forms[0]?.titulo)} state={{ id: forms[0]?.id }} className='btn btn-warning fw-semibold rounded-3 mb-3 w-100'>{forms[0]?.titulo}</Link>
                                        <Link to={'/servicos-personalizados/' + nomeTransform(forms[1]?.titulo)} state={{ id: forms[1]?.id }} className='btn btn-warning fw-semibold rounded-3 mb-3 w-100'>{forms[1]?.titulo}</Link>
                                        <Link to={'/servicos-personalizados/' + nomeTransform(forms[2]?.titulo)} state={{ id: forms[2]?.id }} className='btn btn-warning fw-semibold rounded-3 mb-3 w-100'>{forms[2]?.titulo}</Link>
                                    </div>
                                    <div className='accordion-group'>

                                    </div>
                                </div>
                            </div>
                            <RestantesFormulários />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}        