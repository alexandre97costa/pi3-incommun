import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from '../components/card'

export default function CivComponent() {

    const [form, setForm] = useState(false)
    const [perguntasObject, setPerguntasObject] = useState(false)



    useEffect(() => {
        axios.get('http://localhost:4011/forms/civ')
            .then(form => {
                setForm(form.data.formularios)

                const defaultPerguntasObject =
                    Object.fromEntries(
                        // Vamos iterar sobre os grupos...
                        form.data.formularios.grupo_perguntas
                            .map((grupo) => {
                                // ...e as respetivas perguntas...
                                return grupo.pergunta
                                    .map((pergunta) => {
                                        // ...e devolver uma array para cada id.
                                        // * Esta array equivale a um par key/value no objecto final
                                        return [pergunta.id, null]
                                    })
                            })
                            // As arrays provenientes de cada grupo são concatenadas numa só
                            .reduce((pre, current) => { return pre.concat(current) })

                        // Output até aqui: [ [1,null], [2,null], ... ]
                        //* O Object.fromEntries() gera um objecto a partir da array
                        // Output final: { 1:null, 2:null, ... }
                    )
                setPerguntasObject(defaultPerguntasObject)
            })
    }, [])

    useEffect(() => { console.table(perguntasObject) }, [perguntasObject])


    return (
        <div className='container py-5'>
            <div className='row'>
                <div className='fs-3 fw-bold text-muted'>
                    {!form ? 'A carregar...' : 'Serviços personalizados'}
                </div>
                <div className='display-2 text-warning mb-3'>{!form ? ' ' : form.nome}</div>
            </div>
            <div className='row'>
                <LoadForm />
            </div>

            <div className='row mt-3'>
                <div className='d-grid'>
                    <button
                        type='button'
                        className='btn btn-success fs-4 fw-bold py-3'
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
            <div id="accordion" className="accordion accordion-flush border-start border-warning border-5 ps-2 ms-3">

                {form.grupo_perguntas.map((grupo, index) => {
                    return (
                        <div key={index}>
                            <div id={'accordion-header-' + index} className='accordion-header position-relative'>
                                <button
                                    type="button"
                                    className="accordion-button collapsed ms-1 border border-light"
                                    data-bs-toggle="collapse" data-bs-target={"#accordion-collapse-" + index}
                                    aria-expanded="false" aria-controls={"accordion-collapse-" + index}
                                >
                                    <h4>{grupo.titulo}</h4>
                                    <span className="position-absolute top-50 end-100 translate-middle p-2 bg-warning rounded-circle"></span>
                                </button>
                            </div>
                            <div
                                id={"accordion-collapse-" + index}
                                className="accordion-collapse collapse"
                                aria-labelledby={'#accordion-header-' + index} data-bs-parent="#accordion">
                                <div className="accordion-body">
                                    {grupo.pergunta.map((pergunta, indexPergunta) => {
                                        const isCard = (pergunta.tipo === 'card');
                                        return (
                                            <div className="form-check mb-3" key={indexPergunta}>
                                                <Card teste='yooo' />
                                                <input className="form-check-input"
                                                    type={
                                                        ['checkbox', 'radio', 'slider']
                                                            .indexOf(pergunta.tipo) > -1 ?
                                                            pergunta.tipo : 'checkbox'
                                                    }
                                                    // type="checkbox"
                                                    id={"p-" + pergunta.id}
                                                    onChange={(e) => {
                                                        const input = {}
                                                        input[e.target.id.slice(2)] = e.target.checked ? true : null
                                                        const newObject = Object.assign(perguntasObject, input)

                                                        setPerguntasObject(newObject)
                                                        console.table(perguntasObject)
                                                    }}

                                                />
                                                <label className="form-check-label fs-5" htmlFor={"input-" + index + '-' + indexPergunta}>
                                                    {pergunta.texto}
                                                </label>
                                                <br />
                                                <small className="text-muted">
                                                    {pergunta.descricao}
                                                </small>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                        </div>
                    )
                })}
            </div>
        )
    }
}