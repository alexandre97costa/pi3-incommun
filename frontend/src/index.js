import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UsersModalComponent from './view/backoffice/users_modal';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <>
    <App />
    <UsersModalComponent />
  </>
  // </React.StrictMode>
);
