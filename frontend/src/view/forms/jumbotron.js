import { Link } from 'react-router-dom'
import '../../styles/jumbotron.css'

export default function JumboTronComponent() {
    return (
        <div className="jumbotron text-white jumbotron-image" style={{ height: '900px' }}>
            <div className="d-flex justify-content-center align-items-center h-100">
                <div className="text-white">
                    <div className="mb-3 fs-1" style={{padding: '5%'}}><b>INCOMMUN, a tornar o comum no fantástico!</b></div>
                    
                    <div className="mb-3 fs-4" style={{margin: '5%'}}>Aqui na incommun as suas ideias são a nossa prioridade.<br></br>Diga-nos as suas ideias e nos as tornaremos realidade</div>
                </div>
            </div>
        </div>
    )
}