import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { ErrorProvider } from './context/Error.jsx';
import { UserProvider } from './context/User.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <ErrorProvider>
            <UserProvider>
                <App />
            </UserProvider>
        </ErrorProvider>
    </BrowserRouter>
)
