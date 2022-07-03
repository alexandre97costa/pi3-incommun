import { Link } from 'react-router-dom'

export default function FooterComponent() {
    return (
        <footer class="bg-dark text-center text-lg-start">
            <div class="container p-4">
                <div class="row">
                    <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <h3 class="text-uppercase text-white">Estamos nas Redes!</h3>
                        <h6 className='text-white'>Visita-nos!</h6>

                        <div className='text-purple text-white'>
                            <i class="bi bi-twitter m-4 text-white"/>
                            <i class="bi bi-instagram m-4 text-white" />
                            <i class="bi bi-facebook m-4 text-white" />
                            <i class="bi bi-linkedin m-4 text-white" />
                            <i class="bi bi-youtube m-4 text-white" />
                            <i class="bi bi-tiktok m-4 text-white" />
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-12 mb-4 mb-md-0 text-a-right">
                        <h6 className='text-white'>+351 936565854</h6>
                        <h6 className='text-white'>geral@incommun.pt</h6>
                    </div>
                </div>
            </div>
            <div class="text-center p-3">
                © 2020 Copyright:
                <a class="text-dark" href="https://mdbootstrap.com/">MDBootstrap.com</a>
            </div>
        </footer>
    )
}