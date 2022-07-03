import { Link } from 'react-router-dom'

export default function FooterComponent() {
    return (
        <footer className="bg-dark text-center text-lg-start">
            <div className="container p-4">
                <div className="row">
                    <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <h3 className="text-uppercase text-white">Estamos nas Redes!</h3>
                        <h6 className='text-white'>Visita-nos!</h6>

                        <div className='text-purple margin-bottom-10 text-white'>
                            <i className="bi bi-twitter margin-10 text-white"/>
                            <i className="bi bi-instagram margin-10 text-white" />
                            <i className="bi bi-facebook margin-10 text-white" />
                            <i className="bi bi-linkedin margin-10 text-white" />
                            <i className="bi bi-youtube margin-10 text-white" />
                            <i className="bi bi-tiktok margin-10 text-white" />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 mb-4 mb-md-0 text-a-right">
                        <h6 className='text-white'>+351 936565854</h6>
                        <h6 className='text-white'>geral@incommun.pt</h6>
                    </div>
                </div>
            </div>
            <div className="text-center p-3">
                © 2020 Copyright:
                <a className="text-dark" href="https://mdbootstrap.com/">MDBootstrap.com</a>
            </div>
        </footer>
    )
}