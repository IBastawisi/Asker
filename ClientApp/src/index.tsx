import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import store from './store'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Auth0Provider
                domain="asker.eu.auth0.com"
                clientId="3pUknPm8xF0Rty738tc5Jnh518PBLbLH"
                redirectUri={window.location.origin}
                audience="https://asker.eu.auth0.com/api/v2/"
                scope="read:current_user update:current_user_metadata"
            >
                <App />
            </Auth0Provider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
