import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ip from '../../ip'
import authService from '../auth.service';
import authHeader from '../auth-header'



export default function UsersModalComponent(props) {

    const [users, setUsers] = useState([])
    const [loggedInEmail, setLoggedInEmail] = useState('')


    useEffect(() => { getUsersList() }, [])

    // useEffect(() => { console.log(users) }, [users])

    function LoadUsers() {
        if (users.length > 0) {
            return users.map((user, index) => {
                return (
                    <tr key={index}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td className='text-end' >
                            {loggedInEmail !== user.email ?
                                <button className='btn btn-sm btn-outline-secondary' disabled>
                                    <i className='bi bi-trash-fill'></i>
                                </button>
                                :
                                <button
                                    data-email={user.email}
                                    className='btn btn-sm btn-outline-danger'
                                    data-bs-toggle="modal"
                                    data-bs-target="#eliminar-user-modal"
                                >
                                    <i className='bi bi-trash-fill'></i>
                                </button>
                            }
                        </td>
                    </tr>
                )
            })
        }
    }

    function getUsersList() {
        setLoggedInEmail(authService?.getCurrentUser()?.email ?? '')
        axios
            .get(ip + '/user/list', authHeader())
            .then(res => {
                setUsers(Array.from(res.data.data))
            })

    }

    return (
        <div className='modal fade' id='users-modal' tabIndex='-1' aria-labelledby='users-modal-label' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered modal-dialog-scrollable'>
                <div className='modal-content rounded-4 border-0 bg-dark-secondary shadow'>
                    <div className='modal-header border-0 rounded-0 bg-dark-secondary text-white'>
                        <h5 className='modal-title' id='users-modal-label'>Utilizadores Incommun</h5>
                        <button type='button' className='btn-close btn-close-white' data-bs-dismiss='modal' aria-label='Close'></button>
                        {/* botão invisivel para conseguir  */}
                        <button type='button' id='refresh-users-list' className='d-none' onClick={e => getUsersList()}></button>
                    </div>
                    <div className='modal-body rounded-4 bg-light border-0 shadow'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                <LoadUsers />

                            </tbody>
                        </table>
                        <button
                            type='button'
                            className='btn btn-warning w-100 rounded-3'
                            data-bs-toggle='modal' data-bs-target='#criar-user-modal'
                        >Criar novo utilizador</button>
                    </div>
                </div>
            </div>
        </div>
    )
}