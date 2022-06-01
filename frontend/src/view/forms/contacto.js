import React, { useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom"

export default function ContactoComponent(props) {

    const [nome, setNome] = useState()
    const [empresa, setEmpresa] = useState()
    const [email, setEmail] = useState()
    const [tlm, setTlm] = useState()

    return (
        <div className='row mb-5'>
            <div className='col-12 my-5 '>
                <div className='display-5'>
                    <i className='bi bi-person-plus text-indigo fs-1 me-3'></i>
                    Fale-nos sobre si!
                </div>
                <div className='fs-6 fw-normal mt-1 text-muted'>
                    Toda a informação que partilhar é usada <strong>apenas</strong> para o contactar,
                    e não é partilhada com outros.
                </div>
            </div>

            <div className='col-8 mx-auto'>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control rounded-0 focus-warning" id="input-nome" placeholder="Nome" required />
                    <label htmlFor="input-nome">Nome completo</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control rounded-0 focus-warning" id="input-email" placeholder="email" required />
                    <label htmlFor="input-email">Email</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control rounded-0 focus-warning" id="input-empresa" placeholder="empresa" />
                    <label htmlFor="input-empresa">Nome da sua empresa (opcional)</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="number" className="form-control rounded-0 focus-warning" id="input-tlm" placeholder="tlm" />
                    <label htmlFor="input-tlm">Número de telemóvel (opcional)</label>
                </div>
                <div className='d-grid'>
                    <button
                        type='button'
                        className='btn btn-warning py-2 rounded-0 fs-4 fw-semibold '
                        disabled
                    >
                        Finalizar<br />
                        <small className='fs-6 fw-normal lh-small'>
                            Ainda não estamos prontos!
                        </small>
                    </button>
                </div>
            </div>

        </div>
    )

}

