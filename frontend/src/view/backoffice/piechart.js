import { Chart } from "react-google-charts";
import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Count from './count'
import ip from '../../ip'
import authHeader from '../auth-header'

export default function InicioComponent() {

    const [dicaDoDia, setDicaDoDia] = useState('')
    const [autorDica, setAutorDica] = useState('')
    const [totalPedidosRecusados, setTotalPedidosRecusados] = useState(0)
    const [contMotivoPreco, setMotivoPreco] = useState(0)
    const [contMotivoConcorrencia, setMotivoConcorrencia] = useState(0)
    const [contMotivoNaoEstavaEspera, setMotivoNaoEstavaEspera] = useState(0)
    const [contMotivoOutro, setMotivoOutro] = useState(0)

    const [contEstadoPendente, setEstadoPendente] = useState(0)
    const [contEstadoEnviado, setEstadoEnviado] = useState(0)
    const [contEstadoAceite, setEstadoAceite] = useState(0)
    const [contEstadoRecusado, setEstadoRecusado] = useState(0)

    const [totalPedidos, setTotalPedidos] = useState(0)
    const [pedidos, setPedidos] = useState([])
    const [filtroEstadoPedido, setFiltroEstadoPedido] = useState(0)
    const [estados, setEstados] = useState([])

    const [isShown, setIsShown] = useState(true);

    useEffect(() => {
        axios.get(ip + '/pedidos/count?estado_id=0', authHeader())
            .then(res => {
                setTotalPedidos(res.data.count)
            })

        // Get dica do dia
        axios.get('https://api.quotable.io/random?tags=success|inspirational|happiness')
            .then(res => {
                setAutorDica(res.data.author)
                setDicaDoDia(res.data.content)
            })

        axios.get(ip + '/pedidos/count?estado_id=4', authHeader())
            .then(res => {
                setTotalPedidosRecusados(res.data.count)
            })

        axios.get(ip + '/pedidos/count?motivo_id=1', authHeader())
            .then(res => {
                setMotivoPreco(res.data.count)
            })

        axios.get(ip + '/pedidos/count?motivo_id=2', authHeader())
            .then(res => {
                setMotivoConcorrencia(res.data.count)
            })

        axios.get(ip + '/pedidos/count?motivo_id=3', authHeader())
            .then(res => {
                setMotivoNaoEstavaEspera(res.data.count)
            })

        axios.get(ip + '/pedidos/count?motivo_id=4', authHeader())
            .then(res => {
                setMotivoOutro(res.data.count)
            })

        //get estado pedido
        axios.get(ip + '/pedidos/count?estado_id=1', authHeader())
            .then(res => {
                setEstadoPendente(res.data.count)
            })

        axios.get(ip + '/pedidos/count?estado_id=2', authHeader())
            .then(res => {
                setEstadoEnviado(res.data.count)
            })

        axios.get(ip + '/pedidos/count?estado_id=3', authHeader())
            .then(res => {
                setEstadoAceite(res.data.count)
            })

        axios.get(ip + '/pedidos/count?estado_id=4', authHeader())
            .then(res => {
                setEstadoRecusado(res.data.count)
            })
    }, [])

    useEffect(() => {
        // Get os pedidos todos (por vezes filtrados e ordenados)
        axios.get(ip + '/pedidos/all?estado_id=' + filtroEstadoPedido, authHeader())
            .then(res => {
                // console.log(res.data)
                setPedidos(res.data)
            })
    }, [filtroEstadoPedido])

    useEffect(() => {

        // Get total de pedidos
        // por defeito, sem mandar nenhuma query (nem estado nem dias),
        // conta todos os pedidos dos ultimos 30 dias
        axios.get(ip + '/pedidos/count?estado_id=0', authHeader())
            .then(res => {
                setTotalPedidos(res.data.count)
            })

        // Get os estados todos que houver na bd (para o filtro/dropdown)
        axios.get(ip + '/pedidos/all_estados', authHeader())
            .then(res => {
                setEstados(res.data)
            })

        // Get dica do dia
        axios.get('https://api.quotable.io/random?tags=success|inspirational|happiness')
            .then(res => {
                setAutorDica(res.data.author)
                setDicaDoDia(res.data.content)
            })
    }, [])

    const data1 = [
        ["Estado", "Quantidade"],
        ["Pendente", contEstadoPendente],
        ["Recusado", contEstadoRecusado],
        ["Enviado", contEstadoEnviado],
        ["Aceite", contEstadoAceite],
    ];

    const data = [
        ["Motivo", "Quantidade"],
        ["Preço Elevado", contMotivoPreco],
        ["Preferiu a concorrência", contMotivoConcorrencia],
        ["Não era o que estava à espera", contMotivoNaoEstavaEspera],
        ["Outro", contMotivoOutro],
    ];

    return (
        <div className="col overflow-auto h-sm-100 px-5 pt-4">

            {/* Titulo */}
            <div className="mb-3 row">
                <div className='col-6'>
                    <span className='h2 text-dark fw-bold'>
                        Resumo de Pedidos
                    </span>
                    <br />
                    <span className='fs-6 fw-normal text-muted'>
                        {'Foram recusados ' + totalPedidosRecusados + ' pedidos nos últimos 30 dias.'}
                    </span>
                </div>

                <div className='col-6 text-end'>
                    <span className='fs-5 lh-sm text-indigo fw-bold ' title={dicaDoDia + ' - ' + autorDica}>
                        Dica do dia :)
                    </span>
                    <br />
                    <span className=' p-2 badge fw-normal bg-light lh-sm text-secondary text-end text-wrap w-75'>
                        {dicaDoDia + ' ~' + autorDica}
                    </span>
                </div>
            </div>

            <div className='mb-4 g-3 row row-cols-1 row-cols-md-2 row-cols-lg-4 row-cols-xl-4'>
                <Count estadoId={0} />
                <Count estadoId={3} />
                <Count estadoId={4} />
            </div>

            <br></br>

            <div className='mb-5 w row'>

                <div className="dropdown bg-white me-2">
                        <button className=" btn btn-sm btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className='me-2'>{isShown ? 'Resumo Pedidos Recusados' : 'Resumo Estado de Pedidos'}</span>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li> 
                                <button
                                    className="dropdown-item"
                                    type='button'
                                    onClick={e => {
                                        setIsShown(true)
                                    }}>
                                    Resumo Pedidos Recusados
                                </button>
                                <button
                                    className="dropdown-item"
                                    type='button'
                                    onClick={e => {
                                        setIsShown(false)
                                    }}>
                                    Resumo Estado de Pedidos
                                </button>
                            </li>

                        </ul>
                </div>

                <div className="mb-5 w">
                    {isShown && <div className="mb-3 w">
                        <Chart
                            chartType="PieChart"
                            data={data}
                            width={"100%"}
                            height={"400px"}
                        />
                    </div>}

                    { !isShown && <div className="mb-3 w">
                        <Chart
                            chartType="PieChart"
                            data={data1}
                            width={"100%"}
                            height={"400px"}
                        />
                    </div>}
                </div>
            </div>
        </div>
    )
}