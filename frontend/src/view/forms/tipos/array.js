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
        console.log('arrayItems', arrayItems)
        if (Array.isArray(arrayItems) && !!arrayItems.length) {

            const updateObj = {}
            updateObj[id] = {
                texto: arrayItems,
                inteiro: 1
            }
            console.log(updateObj)

            if (JSON.stringify(arrayItems) !== JSON.stringify(props.perguntasObject[id]?.texto)) {
                props.setPerguntasObject({
                    ...props.perguntasObject,
                    ...updateObj
                })
            }
        }
    }, [arrayItems])

    useEffect(() => {

        if (props.perguntasObject.hasOwnProperty(id)
            && !!props.perguntasObject[id]?.texto
            && !!props.perguntasObject[id]?.inteiro) {

            console.log(props.perguntasObject[id].texto)
            props.setResposta(props.perguntasObject[id].texto.join(', '))
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
                                    setArrayItems({ ...arrayItems, ...{ texto: [...arrayItems.texto, text], inteiro: 1 } })
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
                            arrayItems.texto.map((item, index) => {
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