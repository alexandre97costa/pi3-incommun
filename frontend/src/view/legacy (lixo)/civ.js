import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';

import Grupo from '../forms/grupo'

export default function CivComponent() {

    const [form, setForm] = useState(false)
    const [perguntasObject, setPerguntasObject] = useState(false)



    useEffect(() => {
        console.log('useEffect axios request')
        axios.get('http://localhost:4011/forms/civ')
            .then(form => {
                setForm(form.data.formularios)

                const perguntasObject =
                    Object.fromEntries(
                        // Vamos iterar sobre os grupos...
                        form.data.formularios.grupo_perguntas
                            .map((grupo) => {
                                // ...e as respetivas perguntas...
                                return grupo.pergunta
                                    .map((pergunta) => {
                                        // ...e devolver uma array para cada id.
                                        // * Esta array equivale a um par key/value no objecto final
                                        return [pergunta.id, false]
                                    })
                            })
                            // As arrays provenientes de cada grupo são concatenadas numa só
                            .reduce((pre, current) => { return pre.concat(current) })

                        // Output até aqui: [ [1,false], [2,false], ... ]
                        // * O Object.fromEntries() gera um objecto a partir da array
                        // Output final: { 1:false, 2:false, ... }
                    )
                setPerguntasObject(perguntasObject)
            })
    }, [])



    return (
        <div className='container py-5'>

            <div id='debug' className='position-fixed bottom-0 start-0 bg-indigo ms-3 mb-3 rounded-4 d-flex justify-content-center align-items-center text-center text-light fs-3 btn btn-dark border-0'
                style={{ width: '50px', height: '50px' }}
                onClick={(e) => {
                    console.table(perguntasObject)
                }}
            >
                <i className='bi bi-lamp'></i>
            </div>

            <div className='row'>
                <div className='fs-3 lead text-muted lh-sm'>
                    {!form ? 'A carregar...' : 'Serviços personalizados'}
                </div>
                <div className='display-1 text-indigo fw-bold mb-5'>{!form ? ' ' : form.nome}</div>
            </div>
            <div className='row'>
                <LoadForm />
            </div>

            <div className='row mt-3 d-none'>
                <div className='d-grid'>
                    <button
                        type='button'
                        className='btn btn-primary bg-indigo fs-4 fw-bold py-3'
                        onClick={(e) => {
                            // TODO
                        }}
                    >
                        Testar criação do body
                    </button>
                </div>
            </div>
        </div>
    )

    function LoadForm() {
        if (!form) { return } // guard clause

        return (
            <div id="accordion" className="accordion accordion-flush border-start border-warning border-5 ps-1 ms-3">
                {form.grupo_perguntas.map((grupo, index) => {
                    return (
                        <Grupo
                            key={index}
                            index={index}
                            grupo={grupo}
                            perguntasObject={perguntasObject}
                            setPerguntasObject={setPerguntasObject}
                        />
                    )
                })}
            </div>
        )
    }
}

