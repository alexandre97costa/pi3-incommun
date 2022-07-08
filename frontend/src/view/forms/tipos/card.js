import React, { useEffect, useState } from 'react'
import placeholder from '../../../assets/imgs/placeholder600x400.png'


export default function CardComponent(props) {

    const id = parseInt(props.pergunta.id)
    const [isChecked, setChecked] = useState(!!props.perguntasObject[id]?.inteiro ?? false)

    useEffect(() => {
        if (props.perguntasObject.hasOwnProperty(id)
            && !!(props.perguntasObject[id]?.inteiro ?? 0)) {
            props.setResposta(props.pergunta.titulo)
        }
    }, [props.perguntaObject])

    return (
        <label>
            <input
                type='radio'
                id={props.pergunta.id}
                name={'grupo-' + props.idGrupo}
                className={'d-none grupo-' + props.idGrupo}
                checked={isChecked}
                onChange={e => { }}
                onClick={(e) => {
                    props.resetCards(props.pergunta.id)
                }}
            />

            <div
                id={props.pergunta.id}
                className='w-100 mb-3 mb-lg-4 rounded-0 shadow border-0 btn btn-outline-warning text-start text-dark p-0'
                onClick={(e) => { }}
            >
                <div className='row g-0'>
                    <div className='col-md-5 col-lg-4 col-xl-3 bg-indigo d-flex justify-content-center align-items-center'>
                        <img src={placeholder} className='img-fluid ' alt='' />
                    </div>
                    <div className={(isChecked ? 'bg-warning' : '') + ' col-md-7 col-lg-8 col-xl-9'}>
                        <div className='w-100 ms-3 mt-1'>
                            <div className={(isChecked ? 'text-dark' : '') + ' h2 card-title'}>
                                {props.pergunta.titulo ?? 'a carregar...'}
                                {isChecked && <i className='bi bi-check-lg text-dark ms-2'></i>}
                            </div>
                            <p className='card-text my-3 '>{props.pergunta.descricao ?? 'a carregar...'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </label>
    )

}