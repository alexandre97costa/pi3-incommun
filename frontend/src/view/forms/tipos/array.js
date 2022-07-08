import React, { useEffect, useState } from 'react'


export default function ArrayComponent(props) {

    const id = parseInt(props.pergunta.id)
    const [text, setText] = useState('')
    const [arrayItems, setArrayItems] = useState(
        Array.isArray(props.perguntasObject[id]?.texto)
            ? { texto: props.perguntasObject[id].texto, inteiro: 0 }
            : { texto: [], inteiro: 0 }
    )

    useEffect(() => {
        const newObj = {}
        newObj[id] = arrayItems
        if (arrayItems.inteiro === 1) {
            props.setPerguntasObject({ ...props.perguntasObject, ...newObj })
        }
        document.getElementById('p-' + props.pergunta.id).focus()

    }, [arrayItems])

    useEffect(() => {
        if (Array.isArray(props.perguntasObject[id]?.texto)) {
            props.setResposta(props.perguntasObject[id].texto.join(', '))
        }
    }, [props.perguntasObject])



    return (
        <>
            <div className='col-12'>
                <div className='form-floating border border-1 shadow rounded-3'>
                    <input
                        type="text"
                        className="form-control form-control-lg focus-warning bg-white border-warning"
                        id={'p-' + props.pergunta.id}
                        placeholder={props.pergunta.titulo}
                        value={text}
                        onChange={e => { setText(e.target.value) }}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                if (text !== '') {
                                    setArrayItems({ texto: [...arrayItems.texto, text], inteiro: 1 })
                                    setText('')
                                }
                            }
                        }}
                    />
                    <label htmlFor={'p-' + props.pergunta.id}>
                        {props.pergunta.titulo + ' (Prima Enter para adicionar vários)'}
                    </label>
                </div>

                <ul className='list-group my-3 shadow'>
                    {
                        arrayItems.texto.map((item, index) => {
                            return (<li className='list-group-item fw-semibold' key={index}><i className='bi bi-arrow-right-short me-2'></i>{item}</li>)
                        })
                    }
                </ul>
            </div>
            <div className='col-12'>
                <label htmlFor={props.pergunta.id} className="form-label w-100 text-secondary border border-1 shadow rounded-3 p-3">
                    {props.pergunta.descricao}
                </label>
            </div>


        </>
    )

}