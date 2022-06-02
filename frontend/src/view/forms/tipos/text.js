import React, {  useEffect, useState } from 'react'


export default function TextComponent(props) {

    const id = parseInt(props.pergunta.id)
    const [text, setText] = useState('')
    const [arrayItems, setArrayItems] = useState(
        Array.isArray(props.perguntasObject[id])
            ? props.perguntasObject[id]
            : []
    )

    useEffect(() => {
        if (Array.isArray(arrayItems) && arrayItems.length) {

            const updateObj = {}
            updateObj[id] = arrayItems
            const newObj = {
                ...props.perguntasObject,
                ...updateObj
            }

            if (arrayItems !== props.perguntasObject[id]) {
                props.setPerguntasObject(newObj)
            }

        }
    }, [arrayItems])

    useEffect(() => {

        if (props.perguntasObject.hasOwnProperty(id)
            && props.perguntasObject[id] !== undefined
            && props.perguntasObject[id] !== false) {
            props.setResposta(props.perguntasObject[id].join(', '))
        }
    }, [props.perguntaObject])



    useEffect(() => {
        document
            .querySelector('#p-' + props.pergunta.id)
            .addEventListener('keypress', e => {
                if (e.key === 'Enter') {
                    e.preventDefault()
                    document
                        .querySelector('#btn-' + props.pergunta.id)
                        .click()
                }
            })
    }, [])


    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-6'>

                    <div className='input-group mb-3 shadow rounded-3'>
                        <input
                            type="text"
                            className="form-control form-control-lg focus-warning bg-white border-warning"
                            id={'p-' + props.pergunta.id} placeholder={props.pergunta.titulo}
                            value={text}
                            onChange={e => { setText(e.target.value) }}

                        />
                        <button
                            type='button' id={'btn-' + props.pergunta.id}
                            className='btn btn-warning focus-warning fw-semibold'
                            onClick={e => {
                                if (text !== '') {
                                    setArrayItems(arrayItems => [text, ...arrayItems])
                                    setText('')
                                }
                            }}
                        >
                            Adicionar
                        </button>
                    </div>

                    <ul className='list-group mb-3 shadow'>
                        {/* <li className='list-group-item text-muted small py-2'>{text === '' ? props.pergunta.titulo : text}</li> */}
                        {
                            arrayItems.map((item, index) => {
                                return (<li className='list-group-item fw-semibold' key={index}><i className='bi bi-arrow-right-short me-2'></i>{item}</li>)
                            })
                        }
                    </ul>
                </div>
                <div className='col-6'>
                    <label htmlFor={props.pergunta.id} className="form-label w-100">
                        {props.pergunta.descricao}
                    </label>
                </div>


            </div>
        </div>
    )

}