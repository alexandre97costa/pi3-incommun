import { Chart } from 'react-google-charts';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ip from '../../../ip'
import authHeader from '../../auth-header'

export default function VisitasComponent(props) {

    const [vista, setVista] = useState('semana') // dia|semana
    const [unidade, setUnidade] = useState('Horas') // Horas/Dias

    const [formId, setFormId] = useState(0)
    const [stack, setStack] = useState(1)
    const [offsetDias, setOffsetDias] = useState(0)
    const [offsetSemanas, setOffsetSemanas] = useState(0)


    const [visitas, setVisitas] = useState([[]])
    const [pedidos, setPedidos] = useState([[]])
    const [graph, setGraph] = useState([])

    useEffect(() => {
        getVisitas()
        getPedidos()
    }, [])

    useEffect(() => {
        if (vista === 'dia') { setUnidade('Horas') }
        if (vista === 'semana') { setUnidade('Dias') }
    }, [vista])

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
            return [i, ...visitas.map(v => v[i]), ...pedidos.map(p => p[i])]
        })


        console.log([header, ...plot])
        setGraph([header, ...plot])

    }, [visitas, pedidos])

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

    function getPedidos() {
        axios.get(
            ip + '/graph/pedidos/' + vista +
            '?form_id=' + formId +
            '&stack=' + stack +
            '&offset_dias=' + offsetDias +
            '&offset_semanas=' + offsetSemanas
            , authHeader())
            .then(res => setPedidos(res.data.matrix))
            .catch(console.error)
    }

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

    return (
        <div className='col overflow-auto h-sm-100 px-5 pt-4'>

            {/* Titulo */}
            <div className='mb-3 row'>
                <div className='col-6'>
                    <span className='h2 text-dark fw-bold'>
                        Visitas
                    </span>
                </div>
            </div>

            <div className='row mb-3'>
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
    )

}