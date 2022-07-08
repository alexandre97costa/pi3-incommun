import React, { useEffect, useState } from 'react'


export default function TextComponent(props) {

    const id = parseInt(props.pergunta.id)
    const [text, setText] = useState('')

    useEffect(() => {
        if (props.perguntasObject.hasOwnProperty(id)
            && !!props.perguntasObject[id]?.texto
            && !!props.perguntasObject[id]?.inteiro) {

            console.log(props.perguntasObject[id].texto)
            props.setResposta(props.perguntasObject[id].texto.join(', '))
        }
    }, [props.perguntaObject])



    useEffect(() => {
    }, [])


    return (
        <>
            <div className='col-6'>

                <div className='form-floating mb-3 border border-1 shadow rounded-3'>
                    <input
                        type="text"
                        className="form-control form-control-l focus-warning bg-white border-warning"
                        id={'p-' + props.pergunta.id}
                        placeholder={props.pergunta.titulo}
                        value={text}
                        onChange={e => { setText(e.target.value) }}

                    />
                    <label htmlFor={'p-' + props.pergunta.id}>
                        {props.pergunta.titulo}
                    </label>
                </div>

            </div>
            <div className='col-6'>
                <label htmlFor={props.pergunta.id} className="form-label w-100">
                    {props.pergunta.descricao}
                </label>
            </div>

        </>
    )

}