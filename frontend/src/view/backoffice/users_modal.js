import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ip from '../../ip'
import authHeader from '../auth-header'



export default function UsersModalComponent(props) {

    return (
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Utilizadores Incommun</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-dark rounded-0" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-warning rounded-0">Understood</button>
                    </div>
                </div>
            </div>
        </div>
    )
}