import { Link } from 'react-router-dom'
import LogoIncommun from '../../assets/imgs/logotipoincommun.png'

export default function NavDeCimaComponent(props) {
    return (
        <nav style={{ height: '100px', zIndex: 10000 }} className='position-relative d-flex flex-row align-items-center justify-content-between bg-warning'>

            <Link to='/' className='navbar-brand h-75 top-0 ms-5 text-light d-flex align-items-center'>
                <img src={LogoIncommun} alt='incommun' className='h-50' />
            </Link>

            {
                process.env.REACT_APP_MODE === 'development' &&
                <span className='text-danger fw-bold text-center fs-5 font-monospace lh-sm'>
                    ⚠ Em modo de desenvolvimento ⚠
                    <br/>
                    back office = bar aberto
                </span>
            }

            {
                props.auth ?

                    <Link
                        to='/back-office/'
                        className='btn btn-outline-dark rounded-0 me-4'
                    >
                        Back Office
                    </Link> 
                    :
                    <Link
                        to='/back-office/login'
                        className='btn btn-outline-dark rounded-0 me-4'
                    >
                        Login
                    </Link>

            }
        </nav>
    )
}