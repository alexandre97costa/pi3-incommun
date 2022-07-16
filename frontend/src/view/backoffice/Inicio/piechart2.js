import { Chart } from "react-google-charts";
import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import ip from '../../../ip'
import authHeader from '../../auth-header'

export default function PieChartComponent2() {

    const [contEstadoPendente, setEstadoPendente] = useState(0)
    const [contEstadoEnviado, setEstadoEnviado] = useState(0)
    const [contEstadoAceite, setEstadoAceite] = useState(0)
    const [contEstadoRecusado, setEstadoRecusado] = useState(0)

    const [isShown, setIsShown] = useState(true);

    useEffect(() => {
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
        ["Enviado", contEstadoEnviado],
        ["Recusado", contEstadoRecusado],
        ["Pendente", contEstadoPendente],
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