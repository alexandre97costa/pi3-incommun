import React, { useEffect, useState } from 'react';
import Card from '../components/card'

export default function GrupoComponent(props) {

    return (
        <div >
            <div id={'accordion-header-' + props.index} className='accordion-header position-relative border-bottom border-3 border-white'>
                <button
                    id={'g-' + props.index}
                    type="button"
                    className="accordion-button collapsed ms-2 border border-white border-1 text-decoration-none"
                    data-bs-toggle="collapse" data-bs-target={"#accordion-collapse-" + props.index}
                    aria-expanded="false" aria-controls={"accordion-collapse-" + props.index}
                    onClick={(e) => {
                        // document.querySelector("#accordion-collapse-" + props.index).scrollIntoView(false)
                    }}
                >
                    <div className='h3 text-dark'>{props.grupo.titulo}</div>
                    <span className="position-absolute top-50 end-100 translate-middle p-2 bg-warning rounded-circle"></span>
                </button>
            </div>
            <div
                id={"accordion-collapse-" + props.index}
                className="accordion-collapse collapse "
                aria-labelledby={'#accordion-header-' + props.index} data-bs-parent="#accordion">
                <div className="accordion-body bg-light rounded-0 pt-4"
                    onClick={(e) => {
                        let radios = document.querySelectorAll('input.grupo-' + props.index)
                        radios.forEach((radio, index) => {
                            const radioId = radio.getAttribute('data-id')
                            console.log('radio' + radioId + radio.checked)


                            let o = props.perguntasObject
                            // o[props.id] = e.target.checked
                            props.setPerguntasObject(o)
                            // console.log(props.perguntasObject)
                        })
                        console.log('\n')

                        // console.log(e.target)
                    }}
                >

                    {props.grupo.pergunta.map((pergunta, indexPergunta) => {
                        switch (pergunta.tipo) {
                            case 'card':
                                return (
                                    <Card
                                        key={indexPergunta}
                                        id={pergunta.id}
                                        texto={pergunta.texto}
                                        descricao={pergunta.descricao}
                                        indexDoGrupo={props.index}

                                        perguntasObject={props.perguntasObject}
                                        setPerguntasObject={props.setPerguntasObject}
                                    />
                                )

                            default: return (console.log('Tipo de pergunta não aceite'));
                        }

                    })}
                </div>
            </div>
        </div>
    )

}