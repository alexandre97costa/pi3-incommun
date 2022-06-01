import React, { useEffect, useState } from 'react';

export default function CardCopyComponent(props) {

    let [isChecked, setChecked] = useState(props.perguntasObject[props.id])


    useEffect(() => { console.log('isChecked: ' + isChecked) }, [isChecked])

    return (
        <div
            id={props.id}
            className={"pergunta-do-grupo-" + props.indexDoGrupo + " card mb-3 mb-lg-4 rounded-0 shadow border-0 btn btn-outline-warning text-start text-dark p-0"}
            onClick={(e) => {

                const input = props.perguntasObject;

                // 😴 Funcionalidade de radio buttons à mão 

                // 🎯 Seleciona todos os cards deste grupo de perguntas 
                const cardsDesteGrupo = document.querySelectorAll('.pergunta-do-grupo-' + props.indexDoGrupo)
                // 📑 Define o valor de todos os cards como falso 
                cardsDesteGrupo.forEach(card => { props.perguntasObject[card.id] = false })
                // ✅ Mete este especifico como true
                // input[props.id] = true
                props.perguntasObject[props.id] = true

                console.table(props.perguntasObject)
                setChecked(props.perguntasObject[props.id])
                props.setPerguntasObject(props.perguntasObject)
            }}
        >
            <div className="row g-0 rounded-5">
                <div className="col-md-5 col-lg-4 col-xl-3 bg-indigo d-flex justify-content-center align-items-center">
                    <img src="http://placehold.jp/6610f2/ffffff/600x400.png" className="img-fluid " alt="" />
                </div>
                <div className={(isChecked ? 'bg-warning' : '') + " col-md-7 col-lg-8 col-xl-9 "}>
                    <div className="card-body ms-3 mt-1">
                        <div className="h2 card-title ">
                            {props.texto ?? 'a carregar...'}
                            {isChecked && <i className='bi bi-check-lg text-white ms-2'></i>}
                        </div>
                        <p className="card-text my-3 ">{props.descricao ?? 'a carregar...'}</p>
                    </div>
                </div>
            </div>
        </div>
    )

}