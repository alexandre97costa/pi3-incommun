import { Link } from 'react-router-dom'
import LogoIncommun from '../../assets/imgs/logotipoincommun.png'
import authService from '../auth.service';

export default function NavDeCimaComponent(props) {
    return (
        <nav style={{ height: '80px', zIndex: 10000 }} className='position-relative d-flex flex-row align-items-center justify-content-between bg-warning'>

            <Link to='/' className='navbar-brand h-100 top-0 ms-5 text-light d-flex align-items-center'>
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
                        to='/back-office/inicio_v2'
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