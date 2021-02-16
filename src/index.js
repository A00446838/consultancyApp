import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from "./app";
import history from "./store/history";
import { Router} from 'react-router-dom';

ReactDOM.render(
    <Router history={history}>
        <App/>
    </Router>,
    document.getElementById('root'));