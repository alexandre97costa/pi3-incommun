import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

export default function EditComponent() {

    const navigate = useNavigate()

    // pede a informação do filme
    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [avaliacao, setAvaliacao] = useState(false)
    const [lancamento, setLancamento] = useState('')
    const [foto, setFoto] = useState(false)
    const [generosFilme, setGenerosFilme] = useState(false)
    const { filmeId } = useParams()
    useEffect(() => {
        const url = "http://localhost:3011/filme/get/" + filmeId
        axios.get(url)
            .then(res => {
                const filme = res.data.data
                if (res.data.success) {
                    setTitulo(filme.titulo)
                    setDescricao(filme.descricao)
                    setAvaliacao(filme.avaliacao)
                    setLancamento(filme.data_lancamento ?? '1970-01-01') // Para evitar erros na consola
                    setFoto(filme.foto)
                    setGenerosFilme(filme.generos)
                } else { alert('Web Service Error') }
            })
            .catch(error => { return error })
    }, [filmeId])

    // pede os géneros todos
    const [generosTodos, setGenerosTodos] = useState('')
    useEffect(() => {
        const url = "http://localhost:3011/filme/get_all_generos"
        axios.get(url)
            .then(res => { setGenerosTodos(Array.from(res.data.data)) })
            .catch(error => { alert(error); return error })
    }, [])


    // Cria o pedido UPDATE
    const [send, setSend] = useState(false)
    useEffect(() => {
        if (send) {
            update()
            setSend(false)
        }
    }, [send])



    async function update() {
        console.log('%cUpdate iniciado...', 'color: gold')
        const url = "http://localhost:3011/filme/update/" + filmeId
        let body = {
            titulo: titulo,
            descricao: descricao,
            avaliacao: avaliacao,
            lancamento: lancamento,
            foto: foto,
            generos: generosFilme
        }
        await axios.put(url, body)
            .then(res => {
                console.log('%c' + res.data.data, 'color: limegreen')
                navigate('/')
                console.log('De volta a "/"')
            })
            .catch(error => { alert(error); return error })
    }
    return (
        <div className='row'>

            <div className='col-12 mb-4'>
                <div className='display-5 text-light'>{'A editar o filme #' + filmeId}</div>
            </div>
            <div className='col-12 col-md-4 col-lg-4 col-xl-3 position-relative'>

                <figure className="figure">
                    <img src={'http://placehold.jp/6c757d/212529/720x720.png?text=placeholder+(720x720)'} alt="Foto do filme" className='figure-img img-fluid rounded' />
                </figure>

                <div 
                    className='position-absolute w-100 h-100 top-0 start-0 rounded-3 d-flex justify-content-center align-items-center'
                    style={{backgroundColor: !foto ?  '#6f40c2' : foto}}
                    >
                    <div className='text-light text-center fs-2 fw-bold px-3'>{titulo ?? 'nome do filme'}</div>
                </div>

                <button className='btn btn-outline-light position-absolute bottom-0 end-0 border-0'>
                    <span className='align-middle text- me-3 fs-3'><i className='bi bi-paint-bucket'></i></span>
                    <input
                        type='color'
                        value={!foto ?  '#6f40c2' : foto}
                        className='form-control form-control-color p-0 m-0 d-inline-block align-middle'
                        onChange={(e) => setFoto(e.target.value)}
                    />
                </button>

            </div>
            <div className='col-12 col-md-8 col-lg-8 col-xl-9'>

                <form className=''>

                    <div className="form-floating mb-4">
                        <input
                            type="text"
                            className="form-control"
                            id="titulo-input"
                            value={titulo}
                            onChange={e => { setTitulo(e.target.value) }} />
                        <label htmlFor="titulo-input">Título</label>
                    </div>

                    <div className="form-floating mb-4">
                        <textarea
                            className="form-control"
                            id="descricao-input"
                            value={descricao}
                            onChange={e => { setDescricao(e.target.value) }} />
                        <label htmlFor="descricao-input">Descrição</label>
                    </div>

                    <div className='row row-cols-2 mb-4'>
                        <div className='col'>
                            <div className="form-floating">
                                <input
                                    type="number"
                                    step={0.1}
                                    min={0}
                                    max={5}
                                    className="form-control"
                                    id="avaliacao-input"
                                    value={avaliacao}
                                    // onLoad={setStars({target: {value: avaliacao}})}
                                    onChange={e => {
                                        setStars(e)
                                        setAvaliacao(e.target.value)
                                    }} />
                                <label id='avaliacao-label' htmlFor="avaliacao-input" >
                                    Avaliação
                                </label>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="form-floating">
                                <input
                                    type="date"
                                    className="form-control"
                                    id="lancamento-input"
                                    value={lancamento}
                                    onChange={e => {
                                        setLancamento(e.target.value)
                                    }} />
                                <label htmlFor="lancamento-input">Data de Lançamento</label>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4 d-grid">
                        <button
                            className="btn btn-light fs-5" type="button"
                            data-bs-toggle="collapse" data-bs-target="#collapseGeneros"
                            aria-expanded="false" aria-controls="collapseGeneros">
                            Ver géneros
                        </button>
                        <div className="collapse mx-3 py-3 ps-4 border border-secondary border-top-0 rounded-bottom" id="collapseGeneros">
                            <LoadGeneros />
                        </div>

                    </div>

                    <div className='d-grid'>

                        <button
                            type='button'
                            onClick={() => { setSend(true) }}
                            className="btn btn-warning fs-4">
                            Guardar
                        </button>

                    </div>
                </form>

            </div>
        </div>
    )

    function LoadGeneros() {

        return Array.from(generosTodos, (genero, index) => {
            let generoEncontradoNoFilme = (generosFilme) ? generosFilme.some(gf => { return gf.descricao === genero.descricao }) : false

            return (
                <div className="form-check text-light" key={index}>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id={"generoCheck" + (index + 1)}
                        checked={generoEncontradoNoFilme}
                        value={genero.descricao}
                        onChange={e => {
                            const collapseGeneros = document.getElementById('collapseGeneros')
                            const selecionados = collapseGeneros.querySelectorAll('.form-check-input:checked')
                            setGenerosFilme(
                                Array.from(selecionados, selecionado => {
                                    return ({ "descricao": selecionado.value })
                                }))
                        }}
                    />
                    <label className="form-check-label" htmlFor={"generoCheck" + (index + 1)}>
                        {genero.descricao}
                    </label>
                </div>
            )
        })
    }

    function setStars(e) {

        const label = document.querySelector('#avaliacao-label')
        const stars = Math.floor(e.target.value)
        const decimal = (e.target.value % 1).toFixed(1)

        label.innerHTML = ''
        label.append('Avaliação (')
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('i')
            i < stars ? star.classList.add('bi', 'bi-star-fill') : star.classList.add('bi', 'bi-star')
            if (decimal > 0.4 && i === stars) {
                star.setAttribute('class', 'bi bi-star-half')
            }
            label.appendChild(star)
        }
        label.append(')')
    }


}
