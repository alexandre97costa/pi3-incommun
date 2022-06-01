// import React, { useContext, useEffect, useState } from 'react';
import React from 'react';


export default function CheckboxComponent(props) {

    const id = parseInt(props.pergunta.id)

    // useEffect(() => {
    //     if (props.perguntasObject.hasOwnProperty(id)
    //         && props.perguntasObject[id] !== undefined
    //         && props.perguntasObject[id] !== false) {
    //         props.setResposta(props.pergunta.texto)
    //     }
    // }, [props.perguntasObject])

    return (

        <div className="form-check mb-3 ms-3">
            <input className="form-check-input my-0 mt-2 me-3 "
                type="checkbox"
                id={'p-' + props.pergunta.id}
                checked={props.perguntasObject[id]}
                value={props.pergunta.texto}
                onChange={e => {
                    const updateObj = {}
                    updateObj[id] = e.target.checked
                    props.setPerguntasObject({
                        ...props.perguntasObject,
                        ...updateObj
                    })
                    props.setRespostaCheckbox()
                }}
            />
            <label className="form-check-label fs-4 d-flex flex-column lh-small" htmlFor={'p-' + props.pergunta.id}>
                {props.pergunta.texto}

                <small className="text-muted small fs-6 lh-small">
                    {props.pergunta.descricao}
                </small>
            </label>
        </div>
    )

}