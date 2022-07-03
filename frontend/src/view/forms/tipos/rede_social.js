import React, { useEffect, useState } from 'react'
import placeholder from '../../../assets/imgs/placeholder600x400.png'


export default function RedeSocial(props) {

    const id = parseInt(props.pergunta.id)
    const [isChecked, setChecked] = useState(props.selectedCard === props.pergunta.id)

    useEffect(() => {
        if (props.perguntasObject.hasOwnProperty(id)
            && props.perguntasObject[id] !== undefined
            && props.perguntasObject[id]) {
            setChecked(props.perguntasObject[id])
            props.setResposta(props.pergunta.titulo)
        }
    }, [props.perguntaObject])

    return (
        <div>
            {props.pergunta.titulo}
        </div>
    )

}