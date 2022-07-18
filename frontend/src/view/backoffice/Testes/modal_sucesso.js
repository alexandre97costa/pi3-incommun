import React, { useEffect, useState } from 'react';
import ip from '../../ip'
import authService from '../auth.service';
import authHeader from '../auth-header'


function modalSuccess() {
  
    return (
        <div className='modal fade' id='users-modal' tabIndex='-1' aria-labelledby='users-modal-label' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered modal-dialog-scrollable'>
                <div className='modal-content rounded-4 border-0 bg-dark-secondary shadow'>
                    <div className='modal-header border-0 rounded-0 bg-dark-secondary text-white'>
                        <h5 className='modal-title' id='users-modal-label'>Incommun</h5>
                        <button type='button' className='btn-close btn-close-white' data-bs-dismiss='modal' aria-label='Close'></button>
                        {/* botão invisivel para conseguir  */}
                    </div>
                    <div className='modal-body rounded-4 bg-light border-0 shadow'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Parabéns! O pedido foi adicionado!</th>
                                    
                                </tr>
                            </thead>
                        </table>
                        <button
                            type='button'
                            className='btn btn-warning w-100 rounded-3'
                            data-bs-toggle='modal'
                        >Exit</button>
                    </div>
                </div>
            </div>
        </div>
    )
    
}
  