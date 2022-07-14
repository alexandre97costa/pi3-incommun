// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import axios from 'axios';
import authService from '../auth.service';
import authHeader from '../auth-header'
import Count from './count'
import ip from '../../ip'

export default function InicioComponent() {

    const [pedidos, setPedidos] = useState([])
    const [totalPedidos, setTotalPedidos] = useState(0)
    const [totalPedidosRecusados, setTotalPedidosRecusados] = useState(0)
    const [estados, setEstados] = useState([])
    const [filtroPedido, setFiltroPedido] = useState('id')
    const [ordemPedido, setOrdemPedido] = useState('ASC')
    const [filtroEstadoPedido, setFiltroEstadoPedido] = useState(0)
    const [filtroEstadoPedidoDesc, setFiltroEstadoPedidoDesc] = useState('Todos os pedidos')

    const [isShown, setIsShown] = useState(true);
    const [username, setUsername] = useState('')
    const [dicaDoDia, setDicaDoDia] = useState('')
    const [autorDica, setAutorDica] = useState('')

    //motivo recusa pedido-----------------------------------------------------------
    const [contMotivoPreco, setMotivoPreco] = useState(0)
    const [contMotivoConcorrencia, setMotivoConcorrencia] = useState(0)
    const [contMotivoNaoEstavaEspera, setMotivoNaoEstavaEspera] = useState(0)
    const [contMotivoOutro, setMotivoOutro] = useState(0)
    //-------------------------------------------------------------------------------

    //estado pedido------------------------------------------------------------------
    const [contEstadoPendente, setEstadoPendente] = useState(0)
    const [contEstadoEnviado, setEstadoEnviado] = useState(0)
    const [contEstadoAceite, setEstadoAceite] = useState(0)
    const [contEstadoRecusado, setEstadoRecusado] = useState(0)
    //-------------------------------------------------------------------------------

    //visitas------------------------------------------------------------------------
    const [vista, setVista] = useState('semana') // dia|semana
    const [unidade, setUnidade] = useState('Horas') // Horas/Dias

    const [formId, setFormId] = useState(0)
    const [stack, setStack] = useState(1)
    const [offsetDias, setOffsetDias] = useState(0)
    const [offsetSemanas, setOffsetSemanas] = useState(0)

    const [visitas, setVisitas] = useState([[]])
    const [graph, setGraph] = useState([])
    const [pedidosGraph, setPedidosGraph] = useState([])
    //-------------------------------------------------------------------------------

    useEffect(() => {
        axios
            .get(
                ip + '/pedidos/all' +
                '?ordem=' + ordemPedido +
                '&filtro=' + filtroPedido +
                '&estado_id=' + filtroEstadoPedido +
                '&limite=4',
                authHeader()
            )
            .then(res => res.data.success ? setPedidos(res.data.data) : console.log(res))
            .catch(console.log);
    }, [filtroPedido, ordemPedido, filtroEstadoPedido])

    useEffect(() => {
        console.log('pedidos:', pedidos)
    }, [pedidos])

    useEffect(() => {
        //get total de pedidos
        axios.get(ip + '/pedidos/count?estado_id=0&oquecontar=todos', authHeader())
            .then(res => {
                setTotalPedidos(res.data.count)
            })

        //get total de pedidos recusados
        axios.get(ip + '/pedidos/count?estado_id=4&oquecontar=todos', authHeader())
            .then(res => {
                setTotalPedidosRecusados(res.data.count)
            })
        
        //get pedidos recusados por preço
        axios.get(ip + '/pedidos/count?motivo_id=1&oquecontar=motivo', authHeader())
            .then(res => {
                setMotivoPreco(res.data.count)
            })

        //get pedidos recusados por concorrencia
        axios.get(ip + '/pedidos/count?motivo_id=2&oquecontar=motivo', authHeader())
            .then(res => {
                setMotivoConcorrencia(res.data.count)
            })

        //get pedidos recusados nao estava espera
        axios.get(ip + '/pedidos/count?motivo_id=3&oquecontar=motivo', authHeader())
            .then(res => {
                setMotivoNaoEstavaEspera(res.data.count)
            })

        //get pedido recusado outro
        axios.get(ip + '/pedidos/count?motivo_id=4&oquecontar=motivo', authHeader())
            .then(res => {
                setMotivoOutro(res.data.count)
            })

        //get estado pedido
        axios.get(ip + '/pedidos/count?estado_id=1&oquecontar=todos', authHeader())
            .then(res => {
                setEstadoPendente(res.data.count)
            })

        //get pedidos enviados
        axios.get(ip + '/pedidos/count?estado_id=2&oquecontar=todos', authHeader())
            .then(res => {
                setEstadoEnviado(res.data.count)
            })

        //get pedidos aceites
        axios.get(ip + '/pedidos/count?estado_id=3&oquecontar=todos', authHeader())
            .then(res => {
                setEstadoAceite(res.data.count)
            })
        
        //get pedidos recusados
        axios.get(ip + '/pedidos/count?estado_id=4&oquecontar=todos', authHeader())
            .then(res => {
                setEstadoRecusado(res.data.count)
            })
    }, [])

    useEffect(() => {
        // Get total de pedidos
        // por defeito, sem mandar nenhuma query (nem estado nem dias),
        // conta todos os pedidos dos ultimos 30 dias
        axios.get(ip + '/pedidos/count?estado_id=0&oquecontar=todos', authHeader())
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

        setUsername(authService.getCurrentUser()?.username ?? '')
    }, [])

    //Pie Chart Resumo Estado Pedidos
    const data1 = [
        ["Estado", "Quantidade"],
        ["Pendente", contEstadoPendente],
        ["Recusado", contEstadoRecusado],
        ["Enviado", contEstadoEnviado],
        ["Aceite", contEstadoAceite],
    ];

    //Pie Chart Resumo Motivo Recusa Pedido
    const data = [
        ["Motivo", "Quantidade"],
        ["Preço Elevado", contMotivoPreco],
        ["Preferiu a concorrência", contMotivoConcorrencia],
        ["Não era o que estava à espera", contMotivoNaoEstavaEspera],
        ["Outro", contMotivoOutro],
    ];

    //Filtro Pie Chart
    function handleFiltro(filtro, ordem, texto) {
        setFiltroPedido(filtro);
        setOrdemPedido(ordem);
        document.getElementById('filtro_pedido').textContent = texto
    }


    function LoadInfoPedidosCliente() {
        if (!pedidos.length) { return }
        return (
            pedidos.map(pedido => {
                return (
                    <div className='col d-flex flex-column' key={pedido.id}>

                        <div className='container-fluid rounded-4 border ps-4 bg-white shadow'>
                            <div className="row justify-content-center my-4 g-3">

                                {/* Cliente */}
                                <div className='mt-2 text-center text-dark lh-sm'>
                                    <span className='fs-5 fw-semibold position-relative'>
                                        {pedido.cliente?.nome}
                                    </span>
                                    <span className='d-none fs-5 fw-semibold text-warning ms-2 '>
                                        {'#' + pedido.cliente_id}
                                    </span>
                                    <br />
                                    <span className='badge p-0 fw-semibold text-light-dark lh-sm'>
                                        {pedido.cliente?.empresa}
                                    </span>
                                </div>

                                {/* Valor */}
                                <div className='mt-2 text-center text-success fs-4'>
                                    {pedido.valor_total?.toFixed(2)}
                                </div>

                                {/* Data */}
                                <div className='mt-2 text-center '>
                                    <span className='text-muted badge fw-normal align-middle'>
                                        {new Date(pedido.created_at ?? null)?.toISOString().split('T')[0]}
                                    </span>
                                </div>

                                {/* Estado */}
                                <div className='mt-2'>
                                    <span
                                        className={'badge w-100 fw-semibold bg-' + pedido.estado_pedido?.cor + '-semi text-' + pedido.estado_pedido?.cor + ' fs-6'}
                                        title={pedido.estado_pedido?.obs}
                                    >
                                        <i className={'me-2 bi ' + pedido.estado_pedido?.icon}></i>
                                        {pedido.estado_pedido?.descricao}
                                    </span>
                                </div>

                                {/* Opções */}
                                <div className='mt-2'>
                                    {(pedido.estado_id === 1 || pedido.estado_id === 2) &&
                                        <button className='btn btn-warning w-100 fw-semibold' >
                                            <i className='me-2 bi bi-send-fill'></i>
                                            Contactar cliente
                                        </button>
                                    }
                                    {(pedido.estado_id === 3 || pedido.estado_id === 4) &&
                                        <button className='btn btn-warning w-100' disabled>
                                            <i className='me-2 bi bi-send-slash-fill'></i>
                                            Contactar cliente
                                        </button>
                                    }
                                </div>

                                <div className='mt-2'>
                                    <button className='btn btn-secondary w-100'>
                                        <i className='me-2 bi bi-card-checklist'></i>
                                        Ver pedido
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        )
    }

    function LoadEstados() {
        return (
            estados.map(estado => {
                return (
                    <li key={estado.id}>
                        <button
                            className="dropdown-item"
                            type='button'
                            onClick={e => {
                                setFiltroEstadoPedido(estado.id)
                                setFiltroEstadoPedidoDesc(estado.descricao + 's')
                            }}
                        >
                            {estado.descricao + 's'}
                        </button>
                    </li>
                )
            })
        )
    }

    // OPTIONS do gráfico de visitas
    const options = {
        hAxis: {
            title: unidade,
            type: 'number',
            format:'0',
            viewWindowMode: 'explicit',
            viewWindow: {
                max: unidade==='Horas' ? 23 : 6,
                min: 0,
                interval: 1,
            },
        },
        vAxis: {
            type: 'number',
            format:'0'
        },
        // series: [{ color: 'red', lineWidth: 3 }, { lineWidth: 0.5, color: 'red' }],
        series: [{color: 'skyblue'}, {color: 'teal'}],
        curveType: 'function',
        chartArea: { 'width': '90%', 'height': '70%' },
        legend: { position: 'top' },
    }

    //GRÁFICO DE VISITAS
    useEffect(() => {
        getVisitas()
        getPedidosGraph()
    }, [])

    //GRÁFICO DE VISITAS
    useEffect(() => {
        if (vista === 'dia') { setUnidade('Horas') }
        if (vista === 'semana') { setUnidade('Dias') }
    }, [vista])

    //GRÁFICO DE VISITAS
    useEffect(() => {
        // 1 - Usar o stack para saber quantas linhas há
        // 2 - O primeiro item tem que ser a unidade de medida
        let header = Array(1 + (stack * 2))
        header[0] = unidade

        for (let i = 1; i <= stack; i++) {
            if (vista === 'dia') {
                const date = new Date();
                const options = { weekday: 'short', day: 'numeric', month: 'long' };
                date.setDate(date.getDate() - i + 1)
                const localeDate = date.toLocaleDateString('pt-PT', options)

                header[i] = 'Visitas'
                header[i + stack] = 'Pedidos'
                // header[i] = 'Visitas de ' + localeDate
                // header[i + stack] = 'Pedidos de ' + localeDate
            }
            if (vista === 'semana') {
                header[i] = 'Visitas'
                header[i + stack] = 'Pedidos'
            }
        }

        let plot = Array.from(visitas[0], (item, i) => {
            return [i, ...visitas.map(v => v[i]), ...pedidosGraph.map(p => p[i])]
        })

        console.log([header, ...plot])
        setGraph([header, ...plot])

    }, [visitas, pedidos])

    //function get visitas para gráfico de visitas
    function getVisitas() {
        axios.get(
            ip + '/graph/visitas/' + vista +
            '?form_id=' + formId +
            '&stack=' + stack +
            '&offset_dias=' + offsetDias +
            '&offset_semanas=' + offsetSemanas
            , authHeader())
            .then(res => setVisitas(res.data.matrix))
            .catch(console.error)
    }

    //function get pedidos para gráfico de visitas
    function getPedidosGraph() {
        axios.get(
            ip + '/graph/pedidos/' + vista +
            '?form_id=' + formId +
            '&stack=' + stack +
            '&offset_dias=' + offsetDias +
            '&offset_semanas=' + offsetSemanas
            , authHeader())
            .then(res => setPedidosGraph(res.data.matrix))
            .catch(console.error)
    }

    return (
        <div className="col overflow-auto h-sm-100 px-5 pt-4 bg-light">
            {/* Titulo */}
            <div className="mb-4 row">
                <div className='col-6'>
                    <span className='h2 text-dark fw-bold'>
                        {!!username ? 'Bem-vindo(a), ' + username + '!' : 'Bem-vindo(a)!'}
                    </span>
                    <br />
                    <span className='fs-6 fw-normal text-muted'>
                        {'Foram criados ' + totalPedidos + ' pedidos nos últimos 30 dias.'}
                    </span>
                </div>
                <div className='col-6 text-end'>
                    <span className='fs-5 lh-sm text-indigo fw-bold ' title={dicaDoDia + ' - ' + autorDica}>
                        Dica do dia :)
                    </span><br />
                    <span className=' p-2 badge fw-normal bg-light lh-sm text-secondary text-end text-wrap w-75'>
                        {dicaDoDia + ' ~' + autorDica}
                    </span>
                </div>
            </div>

            <div className='mb-5 g-3 row row-cols-1 row-cols-md-2 row-cols-lg-4 row-cols-xl-4'>
                <Count estadoId={0} oquecontar={"todos"} />
                <Count estadoId={2} oquecontar={"todos"} />
                <Count estadoId={3} oquecontar={"todos"} />
                <Count estadoId={4} oquecontar={"todos"} />
            </div>

            <div className="mb-4 row">
                <div className='col d-flex justify-content-start align-items-center fs-6 fw-normal text-muted'>

                    <span className='me-2'>Ver</span>

                    <div className="dropdown bg-white me-2">
                        <button className=" btn btn-sm btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className='me-2'>{filtroEstadoPedidoDesc}</span>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li>
                                <button
                                    className="dropdown-item"
                                    type='button'
                                    onClick={e => {
                                        setFiltroEstadoPedido(0)
                                        setFiltroEstadoPedidoDesc('Todos os pedidos')
                                    }}>
                                    Todos os pedidos
                                </button>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            <LoadEstados />
                        </ul>
                    </div>

                    <span className='me-2'>na ordem de</span>

                    <div className="dropdown bg-white me-2">
                        <button className=" btn btn-sm btn-outline-dark dropdown-toggle" type="button" id="filtro_pedido" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className='me-2'>Pedidos Pendentes</span>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('created_at', 'ASC', e.target.textContent) }} type='button'>Mais antigos primeiro</button></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('created_at', 'DESC', e.target.textContent) }} type='button'>Mais recentes primeiro</button></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('nome', 'ASC', e.target.textContent) }} type='button'>Nome de cliente (A-Z)</button></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('nome', 'DESC', e.target.textContent) }} type='button'>Nome de cliente (Z-A)</button></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('valor_total', 'DESC', e.target.textContent) }} type='button'>Valor mais elevado primeiro</button></li>
                            <li><button className="dropdown-item" onClick={e => { handleFiltro('valor_total', 'ASC', e.target.textContent) }} type='button'>Valor mais baixo primeiro</button></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* <!-- INICIO ORÇAMENTOS PENDENTES --> */}
            <div className='mb-4 g-3 row row-cols-1 row-cols-md-2 row-cols-lg-4 row-cols-xl-4'>
                <LoadInfoPedidosCliente />
            </div>

            {/**********************Inicio Gráfico de Visitas**********************/}
            <div className='row mb-4 g-4'>
                <div className='col-12'>
                    <div className=' rounded-4 border ps-4 bg-white shadow '>


                        {/* Titulo */}
                        <div className='row'>
                            <div className='col-6'>
                                <br></br>
                                <span className='h2 text-dark fw-bold'>
                                    Visitas
                                </span>
                                <br></br>
                            </div>
                        </div>
                        <div className='row'>
                            <Chart
                                // chartType='LineChart'
                                chartType='AreaChart'
                                width='100%'
                                height='500px'
                                data={graph}
                                options={options}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/**********************Inicio Pie Charts**********************/}
            <div className='row mb-4 g-4 '>
                <div className='col-6'>
                    <div className='rounded-4 border bg-white shadow p-4'>
                        <span className='h3 text-dark'>Resumo Pedidos Recusados</span>
                        <div className="mb-3">
                            {isShown && <div className="mb-3">
                                <Chart
                                    chartType="PieChart"
                                    data={data}
                                    width={"100%"}
                                    height={"400px"}
                                />
                            </div>}
                        </div>
                    </div>
                </div>
                <div className='col-6'>
                    <div className='rounded-4 border bg-white shadow p-4'>

                        <span className='h3 text-dark'>Resumo Estado de Pedidos</span>
                        {isShown && <div className="mb-3">
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
        </div>
    )
}