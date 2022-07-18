import React, { useEffect, useState } from 'react'
import axios from 'axios'


export default function ContactoComponent(props) {

    const [clienteNome, setClienteNome] = useState('')
    const [clienteEmail, setClienteEmail] = useState('')
    const [clienteEmpresa, setClienteEmpresa] = useState('')
    const [clienteTlm, setClienteTlm] = useState('')
    const [clientePermiteLocal, setClientePermiteLocal] = useState(true)
    const [clienteDistrito, setClienteDistrito] = useState('')

    useEffect(() => {
        axios
            .get('http://ip-api.com/json/')
            .then(res => setClienteDistrito(res.data.regionName))
            .catch(error => console.log(error))
    }, [])
    
    
    function handleSubmitPedido(e) {
        e.preventDefault()
        console.log("SUBMETEU!")
        const cliente = {
            nome: clienteNome,
            email: clienteEmail,
            empresa: clienteEmpresa,
            tlm: clienteTlm,
            distrito: clientePermiteLocal ? clienteDistrito : null
        }

        console.log(cliente)
        props.postPedido(cliente)
        
        
    }
        
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
                {/* 
                    Usar o onSubmit no form em vez de onClick no botão permite que a 
                    função postPedido só seja efectuada se os inputs forem todos validos.
                 */}
                <form onSubmit={e => handleSubmitPedido(e)}>
                    {/* Nome */}
                    <div className="form-floating mb-3">
                        <input
                            id="input-nome"
                            className="form-control rounded-0 focus-warning"
                            type="text"
                            pattern='[a-zA-ZçãáàõóàÇÃÁÀÕÓÒ\s]*$'
                            maxLength={50}
                            placeholder="Nome"
                            autoComplete='name'
                            autoCapitalize='words'
                            required
                            value={clienteNome}
                            onChange={e => { setClienteNome(e.target.value) }}
                            onInput={e => {
                                if (!e.target.validity.valid) {
                                    e.target.classList.add('focus-danger')

                                    if (e.target.validity.patternMismatch) {
                                        e.target.setCustomValidity('O seu nome só pode conter letras e espaços.')
                                        e.target.reportValidity()
                                    } else if (e.target.validity.valueMissing) {
                                        e.target.setCustomValidity('O seu nome é de preenchimento obrigatório.')
                                        e.target.reportValidity()
                                    } else if (e.target.validity.tooLong) {
                                        e.target.setCustomValidity('O seu nome é demasiado grande. Bastam o primeiro e último nome.')
                                        e.target.reportValidity()
                                    } else {
                                        e.target.setCustomValidity('')
                                        e.target.classList.remove('focus-danger')
                                    }
                                }
                            }}
                        />
                        <label htmlFor="input-nome">
                            Nome completo
                            <span className='text-danger fw-bold ms-1'>*</span>
                        </label>
                    </div>
                    {/* Email */}
                    <div className="form-floating mb-3">
                        <input
                            id="input-email"
                            className="form-control rounded-0 focus-warning"
                            type="email"
                            pattern='[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$'
                            maxLength={63}
                            placeholder="email"
                            autoComplete='email'
                            autoCapitalize='none'
                            required
                            value={clienteEmail}
                            onChange={e => { setClienteEmail(e.target.value) }}
                            onInput={e => {
                                if (!e.target.validity.valid) {
                                    e.target.classList.add('focus-danger')

                                    if (e.target.validity.patternMismatch) {
                                        e.target.setCustomValidity('Por favor introduza um email válido')
                                        e.target.reportValidity()
                                    } else if (e.target.validity.valueMissing) {
                                        e.target.setCustomValidity('O seu email é de preenchimento obrigatório.')
                                        e.target.reportValidity()
                                    } else {
                                        e.target.setCustomValidity('')
                                        e.target.classList.remove('focus-danger')
                                    }
                                }
                            }}
                        />
                        <label htmlFor="input-email">
                            Email
                            <span className='text-danger fw-bold ms-1'>*</span>
                        </label>
                    </div>
                    {/* Empresa */}
                    <div className="form-floating mb-3">
                        <input
                            id="input-empresa"
                            className="form-control rounded-0 focus-warning"
                            type="text"
                            maxLength={50}
                            placeholder="empresa"
                            autoComplete='organization'
                            autoCapitalize='words'
                            value={clienteEmpresa}
                            onChange={e => { setClienteEmpresa(e.target.value) }}
                        />
                        <label htmlFor="input-empresa">Nome da sua empresa</label>
                    </div>
                    {/* Tlm */}
                    <div className="form-floating mb-3">
                        <input
                            id="input-tlm"
                            className="form-control rounded-0 focus-warning"
                            type="tel"
                            pattern='^[0-9]*$'
                            minLength={9}
                            maxLength={9}
                            placeholder="tlm"
                            autoComplete='tel-national'
                            value={clienteTlm}
                            onChange={e => { setClienteTlm(e.target.value) }}
                            onInput={e => {
                                if (!e.target.validity.valid) {
                                    e.target.classList.add('focus-danger')

                                    if (e.target.validity.patternMismatch) {
                                        e.target.setCustomValidity('Por favor introduza um número de telemóvel válido')
                                        e.target.reportValidity()
                                    } else {
                                        e.target.setCustomValidity('')
                                        e.target.classList.remove('focus-danger')
                                    }
                                }
                            }}
                        />
                        <label htmlFor="input-tlm">Número de telemóvel</label>
                    </div>



                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Menssagem da Incommun!</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    Parabéns! Concluio o seu pedido! 
                                    Por favor, clique no "Avançar" para guardar o seu pedido, ou clique no "X" se ainda quiser mudar algo! c:
                                </div>
                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Avançar!</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3 form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckChecked"
                            style={{ width: '2.5rem', margin: 0 }}
                            checked={clientePermiteLocal}
                            onChange={e => setClientePermiteLocal(e.target.checked)}

                        />
                        <label className="form-check-label text-dark-secondary ms-2" htmlFor="flexSwitchCheckChecked">
                            {'Enviar a minha localização (apenas "' + clienteDistrito + '"), para efeitos estatísticos.'}
                        </label>
                    </div>

                    <div className='mb-3'>
                        <span className='text-danger fw-bold me-1'>*</span>
                        <span className='text-secondary fw-normal'>Requisito obrigatório</span>
                    </div>

                    <div className='d-grid'>
                        <button
                            type='button'
                            className='btn btn-warning focus-warning py-2 rounded-0 fs-4 fw-semibold'
                            data-bs-toggle="modal" data-bs-target="#exampleModal">

                        FINALIZAR </button>
                    </div>
                </form>
            </div>
        </div>
    )

}

