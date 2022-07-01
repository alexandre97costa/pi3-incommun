import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ip from '../../ip'
import authHeader from '../auth-header'



export default function UsersModalComponent(props) {

    const [users, setUsers] = useState([])

    useEffect(() => {
        axios
            .get(ip + '/user/list', authHeader())
            .then(res => {
                setUsers(Array.from(res.data.data))
            })
    }, [])

    useEffect(() => { console.log(users) }, [users])

    function LoadUsers() {
        return users.map((user, index) => {
            return (
                <tr key={index}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                </tr>
            )
        })
    }

    return (
        <div className="modal fade" id="users-modal" tabIndex="-1" aria-labelledby="users-modal-label" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content rounded-4 border-0 bg-dark-secondary shadow">
                    <div className="modal-header border-0 rounded-0 bg-dark-secondary text-white">
                        <h5 className="modal-title" id="users-modal-label">Utilizadores Incommun</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body rounded-4 bg-light border-0 shadow">
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <LoadUsers />

                            </tbody>
                        </table>
                        <button type="button" className="btn btn-warning w-100 rounded-3">Criar novo utilizador</button>
                    </div>
                </div>
            </div>
        </div>
    )
}