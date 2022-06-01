import axios from 'axios'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

export default function ListComponent() {

    const [dataFilmes, setdataFilmes] = useState([])
    const [order, setOrder] = useState('id')



    useEffect(() => {
        const url = "http://localhost:3011/filme/list?order=" + order
        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    setdataFilmes(res.data.data)
                }
            })
            .catch(error => { alert(error) })
    }, [order]);

    function deleteFilme(id) {
        const url = "http://localhost:3011/filme/delete?id=" + id
        axios.get(url)
            .then(res => {

            })
    }

    // conditional rendering com hooks - para a tabela/grid
    const [isChecked, setChecked] = useState(true)

    // info da modal de eliminar filme
    const [tituloFilmeDelete, setTituloFilmeDelete] = useState()

    return (
        <div className='row row-cols-1'>

            {/* Intro */}
            <div className='col d-flex justify-content-between align-items-center mb-3'>

                <p className='display-1 text-light'>
                    Filmes
                    <Link
                        className='btn btn-outline-secondary bg-dark fs-4 ms-4'
                        to={'/create'}>
                        Criar novo
                        <i className='bi bi-plus-lg ms-2'></i>
                    </Link>
                </p>

                <div className='btn-group'>
                    <button
                        className={'btn btn-outline-warning ' + (isChecked ? 'btn-warning text-dark' : '')}
                        onClick={e => { setChecked(!isChecked) }}
                        onFocus={e => { e.target.blur() }}
                    >
                        <i className='bi bi-list'></i>
                    </button>
                    <button
                        className={'btn btn-outline-warning ' + (!isChecked ? 'btn-warning text-dark' : '')}
                        onClick={e => { setChecked(!isChecked) }}
                        onFocus={e => { e.target.blur() }}
                    >
                        <i className='bi bi-grid-fill'></i>
                    </button>

                    {/*
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#deleteModal">
                        Launch demo modal
                    </button>
                    */}
                </div>
            </div>

            {/* Tabs */}
            <div className='col  mb-4 text-light d-grid'>
                <div className='btn-group fs-5'>
                    <button
                        className={'btn btn-outline-secondary text-light lh-sm ' + (order === 'id' ? 'btn-light text-dark fw-bold fs-5' : null)}
                        onClick={(e) => {
                            setOrder('id')
                        }}
                        onFocus={e => { e.target.blur() }}
                    >
                        Standard
                        <br /><span className={'text-warning small fw-normal fs-6 ' + (order === 'id' ? 'text-dark' : null)}>Ordem crescente de id</span>
                    </button>
                    <button
                        className={'btn btn-outline-secondary text-light lh-sm ' + (order === 'avaliacao' ? 'btn-light text-dark fw-bold fs-5' : null)}
                        onClick={(e) => {
                            setOrder('avaliacao')
                        }}
                        onFocus={e => { e.target.blur() }}
                    >
                        Melhores
                        <br /><span className={'text-warning small fw-normal fs-6 ' + (order === 'avaliacao' ? 'text-dark' : null)}>Melhor avaliação primeiro</span>
                    </button>
                    <button
                        className={'btn btn-outline-secondary text-light lh-sm ' + (order === 'data_lancamento' ? 'btn-light text-dark fw-bold fs-5' : null)}
                        onClick={(e) => {
                            setOrder('data_lancamento')
                        }}
                        onFocus={e => { e.target.blur() }}
                    >
                        Fresquinhos
                        <br /><span className={'text-warning small fw-normal fs-6 ' + (order === 'data_lancamento' ? 'text-dark' : null)}>Mais recentes primeiro</span>
                    </button>
                    <button
                        className={'btn btn-outline-secondary text-light lh-sm ' + (order === 'titulo' ? 'btn-light text-dark fw-bold fs-5' : null)}
                        onClick={(e) => {
                            setOrder('titulo')
                        }}
                        onFocus={e => { e.target.blur() }}
                    >
                        A - Z
                        <br /><span className={'text-warning small fw-normal fs-6 ' + (order === 'titulo' ? 'text-dark' : null)}>Ordem alfabética</span>
                    </button>
                </div>

            </div>

            {/* Tabela */}
            {isChecked && <div className='col'>
                <div className='row'>
                    <table className='table table-dark table-striped table-hover '>
                        <thead className='table-dark text-warning'>
                            <tr>
                                <th className='text-center'><i className='bi bi-hash'></i></th>
                                <th>Título</th>
                                <th>Descrição</th>
                                <th>Avaliação</th>
                                <th>Lançamento</th>
                                <th>Géneros</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>

                        <tbody>
                            <LoadTableBody />
                        </tbody>
                    </table>
                </div>
            </div>}

            {/* Grid */}
            {!isChecked && <div className='col'>
                <div className='row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4'>
                    <LoadCards />
                </div>
            </div>}

            {/* Modal */}
            {true &&
                <div className="modal " id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-danger" id="deleteModalLabel">Está prestes a eliminar <span className='text-dark'>{tituloFilmeDelete}</span>.</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                ...
                            </div>
                            <div className="modal-footer">
                                <p className='fs-5 me-3'>Pretende continuar?  </p>
                                <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" className="btn btn-danger">Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>

            }
        </div>
    );

    function LoadTableBody() {
        return dataFilmes.map((data, index) => {
            return (
                <tr key={index}>
                    <td>
                        <span className='text-secondary small'>{'#' + leadingZeros(data.id)}</span>
                    </td>
                    <td className='fs-5'>{data.titulo}</td>
                    <td className='text-muted small'>{data.descricao}</td>
                    <td className='text-center'>{data.avaliacao}</td>
                    <td className='text-center'>{new Date(data.data_lancamento).toDateString().slice(4)}</td>
                    <td>{data.generos.map(genero => genero.descricao).join(', ')}</td>

                    <td className='align-middle'>
                        <div className='btn-group'>
                            <Link
                                to={'/edit/' + data.id}
                                className='btn btn-outline-success'
                            >
                                <i className='bi bi-pencil-fill'></i>
                            </Link>
                            <button
                                className='btn btn-outline-danger'
                                type='button'
                                data-bs-toggle="modal"
                                data-bs-target="#deleteModal"
                                onClick={(e) => {

                                }}
                            >
                                <i className='bi bi-trash3-fill'></i>
                            </button>
                        </div>
                    </td>
                </tr>
            )
        })
    }

    function leadingZeros(n, leading = '000') { // 'leading' é opcional
        return (leading + n).slice(-leading.length)
    }

    function LoadCards() {
        return dataFilmes.map((data, index) => {
            return (
                <div className='col pb-4 h-100' key={index}>
                    <div className='rounded-0 p-2 ratio ratio-1x1 position-relative'
                        style={{
                                backgroundColor: (data.foto != null) ? data.foto : '#6f40c2',
                            }}>
                        <div>
                            <h3 className='text-light w-100 pt-3 px-3 position-absolute top-0'>
                                {data.titulo}
                            </h3>
                            <div className='w-100 text-center position-absolute bottom-0 pb-3'>
                                <div className='w-100 text-center py-2'>
                                    <div className='stars badge rounded-pill bg-warning text-dark fs-6' title={data.avaliacao}>
                                        <LoadStars aval={data.avaliacao} />
                                    </div>
                                </div>
                                <LoadGeneros generos={data.generos} />
                            </div>
                        </div>
                    </div>
                    <div className='d-grid'>
                        <div className='btn-group rounded-0'>
                            <Link
                                className='btn btn-outline-success text-light border-secondary rounded-0 border-top-0'
                                to={"/edit/" + data.id}>
                                Editar
                                <i className='ms-2 bi bi-pencil-fill text-light'></i>
                            </Link>
                            <Link
                                className='btn btn-outline-danger text-light border-secondary rounded-0 border-top-0'
                                to={"/edit/" + data.id}>
                                {/* // TODO: Mudar o to={} para 'eliminar' quando estiver pronto */}
                                Eliminar
                                <i className='ms-2 bi bi-trash3-fill text-light'></i>
                            </Link>
                        </div>
                    </div>
                </div >
            )
        })
    }

    function LoadStars(props) {
        const avaliacao = props.aval
        const stars = Math.floor(avaliacao)
        const decimal = (avaliacao % 1).toFixed(1)
        let cinco = [1, 2, 3, 4, 5]

        let classes = Array.from(cinco, (star, index) => {
            return (
                (index < stars) ?
                    'bi bi-star-fill' :
                    (index === stars && decimal > 0.4) ?
                        'bi bi-star-half' :
                        'bi bi-star'
            )
        })

        return cinco.map((star, index) => {
            return (
                <i key={index} className={classes[index]}></i>
            )
        })
    }

    function LoadGeneros(props) {
        const generos = props.generos

        return generos.map((genero, index) => {
            return (
                <div key={index} className='badge rounded-pill bg-dark text-warning mx-1 px-3'>
                    {genero.descricao}
                </div>
            )
        })
    }
}