import { Chart } from "react-google-charts";
import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import ip from '../../../ip'
import authHeader from '../../auth-header'

export default function PieChartComponent1() {

    const [contMotivoPreco, setMotivoPreco] = useState(0)
    const [contMotivoConcorrencia, setMotivoConcorrencia] = useState(0)
    const [contMotivoNaoEstavaEspera, setMotivoNaoEstavaEspera] = useState(0)
    const [contMotivoOutro, setMotivoOutro] = useState(0)

    const [isShown, setIsShown] = useState(true);

    useEffect(() => {
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
    }, [])

    const data = [
        ["Motivo", "Quantidade"],
        ["Preço Elevado", contMotivoPreco],
        ["Preferiu a concorrência", contMotivoConcorrencia],
        ["Não era o que estava à espera", contMotivoNaoEstavaEspera],
        ["Outro", contMotivoOutro],
    ];

    return (
        <div className="row">
            <div className='col-6'>
                <span className='h2 text-dark fw-bold'>
                    Resumo Pedidos Recusados
                </span>
            </div>

            <div className='mb-5 w row'>
                {isShown && <div className="mb-3 w">
                    <Chart
                        chartType="PieChart"
                        data={data}
                        width={"100%"}
                        height={"400px"}
                    />
                </div>}
            </div>
        </div>
    )
}