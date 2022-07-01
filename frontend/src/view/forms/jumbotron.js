import { Link } from 'react-router-dom'
import '../../styles/jumbotron.css'

export default function JumboTronComponent() {
    return (
        <div class="jumbotron text-white jumbotron-image" style={{ height: '900px' }}>
            <div class="d-flex justify-content-center align-items-center h-100">
                <div class="text-white">
                    <h1 class="mb-3" style={{padding: '5%'}}><b>INCOMMUN, a tornar o commun no fantastico!</b></h1>
                   
                    <button 
                    className='rounded-pill bg-purple text-white'
                    style={{width: '200px'}}
                    >
                        <h3>Atreve-te ;)</h3>
                    </button>
                    
                    <h4 class="mb-3" style={{margin: '5%'}}>Somos uma empresa no limear da enovação que nunca vai deixar de surprender  quem confia em nós. <br></br> Somos o provedor de serviço mais confiável de Portugal. </h4>
                </div>
            </div>
        </div>
    )
}