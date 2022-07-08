import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import Grupo from './grupo'
import Contacto from './contacto'
import ip from '../../ip'

export default function FormComponent(props) {
    const navigate = useNavigate()

    // 🌭 form info
    const location = useLocation()
    const formId = location.state.id
    if (formId === undefined) { throw new Error('id is undefined!') }
    const [form, setForm] = useState([])

    const [selectedGroup, setSelectedGroup] = useState(-1)

    useEffect(() => {
        console.log('o form deu reset')
        axios
            .get(ip + '/forms/one?id=' + formId)
            .then(res => setForm(res.data))
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {

        let grupo = document.querySelector('#accordion-header-' + selectedGroup)
        if (!grupo) { return }

        let rect = grupo.getBoundingClientRect()
        let isNotInView = !( // <- atenção aqui ao !
            rect.top >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight)
        )

        if (isNotInView) {
            grupo.scrollIntoView({
                behaviour: 'smooth',
                block: 'center',
                inline: 'center'
            })
        }
    }, [selectedGroup])

    useEffect(() => {
        document.title = form.titulo ?? 'A carregar...'

        if (form.length !== 0) {
            const perguntasObject =
                Object.fromEntries(
                    // Vamos iterar sobre os grupos...
                    form.grupos
                        .map((grupo) => {
                            // ...e as respetivas perguntas...
                            return grupo.pergunta.map((pergunta) => {
                                // ...e devolver uma array para cada id.
                                // * Esta array equivale a um par key/value no objecto final

                                // return [pergunta.id, pergunta.tipo_pergunta.titulo === 'text' ? [] : false]
                                return [pergunta.id, {
                                    texto: pergunta.tipo_pergunta.titulo,
                                    inteiro: 0
                                }]
                            })
                        })
                        // As arrays provenientes de cada grupo são concatenadas numa só
                        .reduce((pre, current) => { return pre.concat(current) })

                    // Output até aqui: [ [1,false], [2,false], ... ]
                    // * O Object.fromEntries() gera um objecto a partir da array
                    // Output final: { 1:false, 2:false, ... }
                )
            props.setPerguntasObj(perguntasObject)

            // Definir o primeiro grupo como aberto
            setSelectedGroup(form.grupos[0].id)
        }
    }, [form])

    function postPedido(clienteObj) {
        const cliente = clienteObj
        const respostas = Object.keys(props.perguntasObject).map((key) => {
            let resposta = props.perguntasObject[key]

            return {
                pergunta_id: parseInt(key),
                texto: Array.isArray(resposta.texto) ? resposta.texto.join(', ') : resposta.texto,
                inteiro: resposta.inteiro,
                valor_unitario: 0,
            }
        })
        console.log(respostas)
        const pedido = {
            valor_total: 0,
            respostas: respostas
        }

        axios
            .post(ip + '/pedidos/new', {
                pedido: pedido,
                cliente: cliente
            })
            .then(res => res.status === 200 ? navigate('/') : console.log(res))
            .catch(error => console.log(error))
    }

    function LoadForm() {
        if (form.length === 0) { return } // guard clause

        return (
            <div className='row'>

                <div id='accordion' className='accordion accordion-flush border-start border-warning border-5 ps-1 ms-3'>

                    {form.length !== 0 && form.grupos.map((grupo, index) => {

                        return (
                            <Grupo
                                key={grupo.id}
                                id={grupo.id}
                                grupo={grupo}

                                // sync das respostas
                                perguntasObject={props.perguntasObject}
                                setPerguntasObject={props.setPerguntasObj}

                                // sync do grupo que estiver aberto
                                // responsavel por addicionar/remover a classe 'show'
                                // Faz com que o grupo fique aberto no re-render
                                selectedGroup={selectedGroup}
                                setSelectedGroup={setSelectedGroup}
                            />
                        )

                    })}
                </div>

            </div>
        )
    }

    return (
        <div className='container mt-4'>

            {/* Table para debug */}
            <div className='position-fixed small text-center bottom-0 end-0' style={{ zIndex: 9999 }}>
                <div className='collapse show' id='table-perguntasObject'>
                    <table className='table table-dark m-0'>
                        <tbody>
                            {
                                Object.keys(props.perguntasObject).map((key, index) => {
                                    const respostaObj = props.perguntasObject[key];
                                    return (
                                        <tr key={index}>
                                            <td className='text-secondary'>
                                                {key}
                                            </td>
                                            <td
                                                className={' small text-start'}
                                            >
                                                {respostaObj.texto}
                                            </td>
                                            <td
                                                className={' small text-start'}
                                            >
                                                {respostaObj.inteiro}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <button
                    type='button' data-bs-toggle='collapse' data-bs-target='#table-perguntasObject'
                    className='btn btn-dark rounded-0 px-4'
                    onFocus={e => e.target.blur()}
                >
                    🔑📜
                </button>
            </div>

            {/* 🍕 Inicio */}
            <div className='row'>
                <div className='fs-5 lh-sm mb-4'>
                    <Link className='text-secondary fw-light text-decoration-none' to='/'>
                        <i className='bi bi-arrow-left-short me-1'></i>
                        {form.length === 0 ? 'A carregar...' : 'Serviços personalizados / '}
                    </Link>
                    <span className='text-indigo fw-semibold'>
                        {form.length === 0 ? 'a carregar...' : form.titulo}
                    </span>

                </div>
            </div>

            <div className='row'>
                <div className='col-12 ps-1 pe-5 ms-3 pb-5 pt-3  position-relative'>
                    <div className='display-5 text-start'>
                        <i className='bi bi-sliders text-indigo fs-1 me-3' ></i>
                        Responda a algumas perguntas
                    </div>
                    <div className='fs-6 fw-normal mt-1 text-muted text-start'>
                        Personalize o serviço à sua medida em 5 minutos! Basta responder às seguintes perguntas.
                    </div>
                </div>
            </div>

            <LoadForm />
            <Contacto postPedido={postPedido} />
        </div>
    )
}

