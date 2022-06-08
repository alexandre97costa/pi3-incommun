import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
// import { Link } from 'react-router-dom';
import axios from 'axios'
import Grupo from './grupo'
import Contacto from './contacto'

import ip from '../../ip'

export default function FormComponent(props) {

    // 🌭 form id
    const location = useLocation()
    const formId = location.state.id
    if (formId === undefined) { throw new Error('id is undefined!') }

    const [form, setForm] = useState([])

    let arrayDeIdsDeGrupos = []
    const [selectedGroup, setSelectedGroup] = useState(-1)

    // axios get forms/civ
    useEffect(() => {
        console.log('%caxios get forms/civ', 'color: skyblue')
        axios
            .get('http://' + ip + ':4011/forms/one?id=' + formId)
            .then(res => { setForm(res.data) })
            .catch(error => console.log(error))
    }, [])



    useEffect(() => {
        document.title = form.titulo ?? '...'

        if (form.length !== 0) {
            const perguntasObject =
                Object.fromEntries(
                    // Vamos iterar sobre os grupos...
                    form.grupos
                        .map((grupo) => {
                            // ...e as respetivas perguntas...
                            return grupo.pergunta.map((pergunta) => {
                                // ...e devolver uma array para cada id.
                                // * Esta array equivale a um par key/value no objecto final
                                return [pergunta.id, pergunta.tipo_pergunta.titulo === 'text' ? [] : false]
                            })
                        })
                        // As arrays provenientes de cada grupo são concatenadas numa só
                        .reduce((pre, current) => { return pre.concat(current) })

                    // Output até aqui: [ [1,false], [2,false], ... ]
                    // * O Object.fromEntries() gera um objecto a partir da array
                    // Output final: { 1:false, 2:false, ... }
                )
            props.setPerguntasObj(perguntasObject)
        }
    }, [form])

    return (
        <div className='container mt-4'>

            {/* Table para debug */}
            <div className='position-fixed small text-center bottom-0 end-0' style={{ zIndex: 9999 }}>
                <div className='collapse show' id='table-perguntasObject'>
                    <table className='table table-dark m-0'>
                        <tbody>
                            {

                                Object.keys(props.perguntasObject).map((key, index) => {
                                    const value = props.perguntasObject[key].toString();
                                    return (
                                        <tr key={index}>
                                            <td className='text-secondary'>
                                                {key}
                                            </td>
                                            <td
                                                className={
                                                    (value === 'true' ? 'text-success' : '') +
                                                    (value === 'false' ? 'text-danger' : '')
                                                }
                                            >
                                                {props.perguntasObject[key].toString()}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <button
                    type='button' data-bs-toggle='collapse' data-bs-target='#table-perguntasObject'
                    className='btn btn-dark rounded-0 px-4'
                    onFocus={e => e.target.blur()}
                >
                    🔑📜
                </button>
            </div>

            {/* 🍕 Inicio */}
            <div className='row'>
                <div className='fs-5 lh-sm mb-4'>
                    <Link className='text-secondary fw-light text-decoration-none' to='/'>
                        <i className='bi bi-arrow-left-short me-1'></i>
                        {form.length === 0 ? 'A carregar...' : 'Serviços personalizados / '}
                    </Link>
                    <span className='text-indigo fw-semibold'>
                        {form.length === 0 ? 'a carregar...' : form.titulo}
                    </span>

                </div>
            </div>

            <div className='row'>
                <div className='col-12 ps-1 pe-5 ms-3 pb-5 pt-3  position-relative'>

                    <div className='display-5 text-start'>
                        <i className='bi bi-sliders text-indigo fs-1 me-3' ></i>
                        Responda a algumas perguntas
                    </div>
                    <div className='fs-6 fw-normal mt-1 text-muted text-start'>
                        Personalize o serviço à sua medida em 5 minutos! Basta responder às seguintes perguntas.
                    </div>
                </div>

            </div>

            {/* Testes */}
            <div className='row d-none'>
                <div className='col-12 border-top border-start border-warning border-5 ps-1 ms-3 py-2'>

                </div>
            </div>

            {/* 🤹‍♂️ Formulário */}
            <LoadForm />

            {/* 🏄‍♂️ Contacto do cliente */}
            <Contacto />
        </div>
    )

    function LoadForm() {
        // if (form) { return } // guard clause

        return (
            <div className='row'>

                <div id='accordion' className='accordion accordion-flush border-start border-warning border-5 ps-1 ms-3'>

                    {form.length !== 0 && form.grupos.map((grupo, index) => {

                        arrayDeIdsDeGrupos.push(index)

                        return (
                            <Grupo
                                key={grupo.id}
                                id={grupo.id}
                                grupo={grupo}

                                // sync das respostas
                                perguntasObject={props.perguntasObject}
                                setPerguntasObject={props.setPerguntasObj}

                                // sync do grupo que estiver aberto
                                // responsavel por addicionar/remover a classe 'show'
                                // Faz com que o grupo fique aberto no re-render
                                selectedGroup={selectedGroup}
                                setSelectedGroup={setSelectedGroup}
                            />
                        )

                    })}
                </div>

            </div>
        )
    }
}

