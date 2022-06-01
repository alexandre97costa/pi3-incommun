import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function CreateComponent() {

    const navigate = useNavigate()

    // pede os géneros todos 🚹🚺
    const [generosTodos, setGenerosTodos] = useState([])
    useEffect(() => {
        const url = "http://localhost:3011/filme/get_all_generos"
        axios.get(url)
            .then(res => { setGenerosTodos(Array.from(res.data.data)) })
            .catch(error => { alert(error); return error })
    }, [])

    // trata do state das checkboxes (🤯) e atualiza a lista de géneros
    const [isChecked, setChecked] = useState([])
    useEffect(() => {
        // isChecked é uma array de true/false, que vai ser usada para
        // 1) definir o state das checkboxes ( checked={isChecked[index]} )
        // 2) filtrar a array generosTodos para gerar a array de generos selecionados
        // Esta array de strings (generosSelecionados) é passada para a const generos, que depois é enviada no POST body
        let generosSelecionados = Array
            .from(generosTodos, (genero, index) => {
                return (isChecked[index] ? genero.descricao : null)
            })
            .filter(genero => genero != null)

        setGeneros(generosSelecionados)
    }, [isChecked, generosTodos])

    // Gestão dos valores inseridos 📑
    const [titulo, setTitulo] = useState(false)
    const [descricao, setDescricao] = useState(false)
    const [avaliacao, setAvaliacao] = useState(false)
    const [lancamento, setLancamento] = useState(false)
    const [foto, setFoto] = useState(false)
    const [generos, setGeneros] = useState(false)

    // Controla a visibilade dos alertas
    const [showErrorAlert, setShowErrorAlert] = useState(false)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)

    async function createFilme() {
        let body = {
            titulo: titulo,
            descricao: descricao,
            avaliacao: avaliacao,
            lancamento: lancamento,
            foto: foto,
            generos: generos
        }

        // * Validação dos resultados
        // Se os valores não forem false, como estão no inicio devido ao useState
        const isFilled = !(Object.values(body).indexOf(false) > -1)

        if (isFilled) {
            await axios.post("http://localhost:3011/filme/create", body)
                .then(response => response.data.success ? console.log(response.data.data) : alert('Algo de errado não está certo'))
                .then(() => {
                    setShowSuccessAlert(true);
                    console.log('%cFilme criado!', 'color: limegreen')
                })
                .then(() => navigate('/'))
                .catch(error => { return error })
        } else {
            setShowErrorAlert(true)
            setTimeout(() => {
                setShowErrorAlert(false)
            }, 5000);
        }
    }

    return (
        <div className='row'>

            <div className='col-12 mb-4'>
                <div className='display-5 text-light'>Criar um novo filme</div>
            </div>
            <div className='col-12 col-md-4 col-lg-4 col-xl-3 position-relative'>

                <figure className="figure">
                    <img src={'http://placehold.jp/6c757d/212529/720x720.png?text=placeholder+(720x720)'} alt="Foto do filme" className='figure-img img-fluid rounded' />
                </figure>

                <div
                    className='position-absolute w-100 h-100 top-0 start-0 rounded-3 d-flex justify-content-center align-items-center'
                    style={{ backgroundColor: !foto ? '#6f40c2' : foto}}
                >
                    <div className='text-light text-center fs-2 fw-bold px-3'>{!titulo ? 'Insira um título...' : titulo}</div>
                </div>

                <button className='btn btn-outline-light position-absolute bottom-0 end-0 border-0'>
                    <span className='align-middle text- me-3 fs-3'><i className='bi bi-paint-bucket'></i></span>
                    <input
                        type='color'
                        value={!foto ? '#6f40c2' : foto}
                        className='form-control form-control-color p-0 m-0 d-inline-block align-middle'
                        onChange={(e) => setFoto(e.target.value)}
                    />
                </button>

            </div>
            <div className='col-12 col-md-8 col-lg-8 col-xl-9'>

                <form className=''>

                    <div className="form-floating mb-4">
                        <input
                            required
                            type="text"
                            className="form-control"
                            id="titulo-input"
                            placeholder='titulo'
                            onChange={(e) => { setTitulo(e.target.value) }}
                        />
                        <label htmlFor="titulo-input">Título</label>
                    </div>

                    <div className="form-floating mb-4">
                        <textarea
                            className="form-control"
                            id="descricao-input"
                            placeholder='descricao'
                            onChange={(e) => { setDescricao(e.target.value) }}
                        />
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
                                    placeholder='avaliacao'
                                    onChange={e => {
                                        setStars(e)
                                        setAvaliacao(e.target.value)
                                    }}

                                />
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
                                    placeholder='lancamento'
                                    onChange={(e) => { setLancamento(e.target.value) }}
                                />
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
                            onClick={() => { createFilme() }}
                            className="btn btn-warning fs-4">
                            Criar filme
                        </button>

                    </div>

                    {showErrorAlert &&
                        <div className="alert alert-danger alert-dismissible fade show mt-4" role="alert">
                            <h4 className="alert-heading">Oops!</h4>
                            &nbsp;Alguns atributos ainda estão por preencher.
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="alert"
                                aria-label="Close"
                                onClick={(e) => { setShowErrorAlert(false) }}
                            >
                            </button>
                        </div>
                    }

                    {showSuccessAlert &&
                        <div className="alert alert-success alert-dismissible fade show mt-4" role="alert">
                            <h4 className="alert-heading">Filme criado!</h4>
                            &nbsp;A redirecionar para a página inicial...
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="alert"
                                aria-label="Close"
                                onClick={(e) => { setShowSuccessAlert(false) }}
                            >
                            </button>
                        </div>
                    }
                </form>

            </div>


        </div>
    )

    function LoadGeneros() {

        return Array.from(generosTodos, (genero, index) => {



            return (
                <div className="form-check text-light" key={index}>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id={"generoCheck" + (index + 1)}
                        value={genero.descricao}
                        checked={isChecked[index]}
                        onChange={(e) => {
                            let checkboxes = document.querySelectorAll('.form-check-input')
                            setChecked(Array.from(checkboxes, checkbox => checkbox.checked))
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
