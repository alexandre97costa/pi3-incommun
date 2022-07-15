import { Chart } from "react-google-charts";
import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import ip from '../../../ip'
import authHeader from '../../auth-header'

export default function PieChartComponent2() {

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

    const [isShown, setIsShown] = useState(true);

    useEffect(() => {
        // Get total de pedidos
        // por defeito, sem mandar nenhuma query (nem estado nem dias),
        // conta todos os pedidos dos ultimos 30 dias
        axios.get(ip + '/pedidos/count?estado_id=0&oquecontar=todos', authHeader())
            .then(res => {
                setTotalPedidos(res.data.count)
            })

        axios.get(ip + '/pedidos/count?estado_id=0&oquecontar=todos', authHeader())
            .then(res => {
                setTotalPedidos(res.data.count)
            })

        axios.get(ip + '/pedidos/count?estado_id=4&oquecontar=todos', authHeader())
            .then(res => {
                setTotalPedidosRecusados(res.data.count)
            })

        axios.get(ip + '/pedidos/count?motivo_id=1&oquecontar=motivo', authHeader())
            .then(res => {
                setMotivoPreco(res.data.count)
            })

        axios.get(ip + '/pedidos/count?motivo_id=2&oquecontar=motivo', authHeader())
            .then(res => {
                setMotivoConcorrencia(res.data.count)
            })

        axios.get(ip + '/pedidos/count?motivo_id=3&oquecontar=motivo', authHeader())
            .then(res => {
                setMotivoNaoEstavaEspera(res.data.count)
            })

        axios.get(ip + '/pedidos/count?motivo_id=4&oquecontar=motivo', authHeader())
            .then(res => {
                setMotivoOutro(res.data.count)
            })

        //get estado pedido
        axios.get(ip + '/pedidos/count?estado_id=1&oquecontar=todos', authHeader())
            .then(res => {
                setEstadoPendente(res.data.count)
            })

        axios.get(ip + '/pedidos/count?estado_id=2&oquecontar=todos', authHeader())
            .then(res => {
                setEstadoEnviado(res.data.count)
            })

        axios.get(ip + '/pedidos/count?estado_id=3&oquecontar=todos', authHeader())
            .then(res => {
                setEstadoAceite(res.data.count)
            })

        axios.get(ip + '/pedidos/count?estado_id=4&oquecontar=todos', authHeader())
            .then(res => {
                setEstadoRecusado(res.data.count)
            })
    }, [])

    const data1 = [
        ["Estado", "Quantidade"],
        ["Pendente", contEstadoPendente],
        ["Recusado", contEstadoRecusado],
        ["Enviado", contEstadoEnviado],
        ["Aceite", contEstadoAceite],
    ];

    return (
        <div className="row">
            <div className='col-6'>
                <span className='h2 text-dark fw-bold'>
                    Resumo Estado de Pedidos
                </span>
            </div>

            <div className='mb-5 w row'>
                {isShown && <div className="mb-3 w">
                    <Chart
                        chartType="PieChart"
                        data={data1}
                        width={"100%"}
                        height={"400px"}
                    />
                </div>}
            </div>
        </div>
    )
}