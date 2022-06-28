import { Chart } from "react-google-charts";
import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Count from './count'
import ip from '../../ip'

export default function InicioComponent() {

    const [dicaDoDia, setDicaDoDia] = useState('')
    const [autorDica, setAutorDica] = useState('')
    const [totalPedidosRecusados, setTotalPedidosRecusados] = useState(0)
    const [contMotivoPreco, setMotivoPreco] = useState(0)
    const [contMotivoConcorrencia, setMotivoConcorrencia] = useState(0)
    const [contMotivoNaoEstavaEspera, setMotivoNaoEstavaEspera] = useState(0)
    const [contMotivoOutro, setMotivoOutro] = useState(0)


    useEffect(() => {
        // Get dica do dia
        axios.get('https://api.quotable.io/random?tags=success|inspirational|happiness')
            .then(res => {
                setAutorDica(res.data.author)
                setDicaDoDia(res.data.content)
            })

        axios.get(ip + '/pedidos/count?estado_id=4')
            .then(res => {
                setTotalPedidosRecusados(res.data.count)
            })

            axios.get(ip + '/pedidos/count?motivo_id=1')
            .then(res => {
                setMotivoPreco(res.data.count)
            })

            axios.get(ip + '/pedidos/count?motivo_id=2')
            .then(res => {
                setMotivoConcorrencia(res.data.count)
            })

            axios.get(ip + '/pedidos/count?motivo_id=3')
            .then(res => {
                setMotivoNaoEstavaEspera(res.data.count)
            })

            axios.get(ip + '/pedidos/count?motivo_id=4')
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
        <div className="col overflow-auto h-sm-100 px-5 pt-4">

            {/* Titulo */}
            <div className="mb-3 row">
                <div className='col-6'>
                    <span className='h2 text-dark fw-bold'>
                        Resumo de Pedidos Recusados
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


            <div className="mb-3 w">
                <Chart
                    chartType="PieChart"
                    data={data}
                    width={"100%"}
                    height={"400px"}
                />
            </div>
        </div>



    )
}