import { Chart } from "react-google-charts";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ip from '../../../ip'
import authHeader from '../../auth-header'

export default function VisitasComponent(props) {

    const [lineData, setLineData] = useState([])

    useEffect(() => {
        const formulario_id = 0
        const vista = 'dia'
        const stack = 1
        const offset_dias = -1
        const offset_semanas = 0
        axios.get(
            ip + '/forms/count_visitas?formulario_id=' + formulario_id + 
            '&vista=' + vista + 
            '&stack=' + stack + 
            '&offset_dias=' + offset_dias + 
            '&offset_semanas=' + offset_semanas 
            , authHeader())
            .then(res => setLineData([[vista, 'Visitas'], ...res.data.contagem]))
    }, [])

    const options = {
        curveType: "function",
        legend: { position: "bottom" },
    }

    return (
        <div className="col overflow-auto h-sm-100 px-5 pt-4">

            {/* Titulo */}
            <div className="mb-3 row">
                <div className='col-6'>
                    <span className='h2 text-dark fw-bold'>
                        Visitas
                    </span>
                </div>
            </div>

            <div className="row mb-3">
                <Chart
                    chartType="LineChart"
                    width="100%"
                    height="500px"
                    data={lineData}
                    options={options}
                />
            </div>
        </div>
    )

}