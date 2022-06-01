import React, { useContext, useEffect, useState } from 'react';

export default function CardComponent(props) {


    // const perguntas = useContext(contextPerguntas)


    return (
        <label>
            <input
                type='radio'
                data-id={props.id}
                name={'grupo-' + props.indexDoGrupo}
                className={'d-none grupo-' + props.indexDoGrupo}
                checked={props.perguntasObject[props.id]}
                onClick={(e) => {
                    let o = props.perguntasObject
                    o[props.id] = e.target.checked
                    props.setPerguntasObject(o)
                    // console.log(o)
                    console.log(props.perguntasObject)
                    
                }}
            />

            <div
                id={props.id}
                className="card mb-3 mb-lg-4 rounded-0 shadow border-0 btn btn-outline-warning text-start text-dark p-0"
                onClick={(e) => { }}
            >
                <div className="row g-0 rounded-5">
                    <div className="col-md-5 col-lg-4 col-xl-3 bg-indigo d-flex justify-content-center align-items-center">
                        <img src="http://placehold.jp/6610f2/ffffff/600x400.png" className="img-fluid " alt="" />
                    </div>
                    <div className={(props.perguntasObject[props.id] ? 'bg-warning' : 'bg-white') + " col-md-7 col-lg-8 col-xl-9 "}>
                        <div className="card-body ms-3 mt-1">
                            <div className="h2 card-title ">
                                {props.texto ?? 'a carregar...'}
                                {props.perguntasObject[props.id] && <i className='bi bi-check-lg text-white ms-2'></i>}
                            </div>
                            <p className="card-text my-3 ">{props.descricao ?? 'a carregar...'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </label>
    )

}