import axios from 'axios'
import ip from '../ip'

class AuthService {
    login(email, password) {
        return axios
            .post(ip + '/user/login', { email, password })
            .then(res => {
                if (res.data.token) {
                    localStorage.setItem('user', JSON.stringify(res.data))
                }
                return res.data
            }, rejected => { throw new Error('Utilizador inválido') })
    }
    logout() { localStorage.removeItem('user') }
    getCurrentUser() { return JSON.parse(localStorage.getItem('user')) }
}
export default new AuthService();