import React, { useEffect, useState } from 'react'


export default function RedeSocial(props) {

    const id = parseInt(props.pergunta.id)

    useEffect(() => {
        if (props.perguntasObject.hasOwnProperty(id)
            && props.perguntasObject[id] !== undefined
            && props.perguntasObject[id]) {
            props.setResposta(props.pergunta.titulo)
        }
    }, [props.perguntaObject])

    return (
        <div className='col-6 col-sm-4 col-md-3 col-lg-2 p-2 pb-4'>
            <div className='border border-1 rounded-4 bg-white shadow p-3 d-flex flex-column justify-content-center align-items-center'>
                <div className='display-3 mb-3 text-light-dark'>
                    <i className={'bi ' + props.pergunta.descricao}></i>
                </div>
                <div className='fs-5 text-secondary'>
                    {props.pergunta.titulo}
                </div>
                <div className="collapse mt-3 pt-3 show border-top border-1 text-start w-100" id={'r-social-' + props.pergunta.id}>

                    Posts:
                    <div class="btn-group w-100" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-sm btn-outline-primary">1</button>
                        <button type="button" class="btn btn-sm btn-outline-primary">3</button>
                        <button type="button" class="btn btn-sm btn-outline-primary">5</button>
                        <button type="button" class="btn btn-sm btn-outline-primary">5+</button>
                    </div>

                </div>
            </div>
        </div>
    )

}