import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './app/App.jsx';
import './sass/app.scss';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
<BrowserRouter><App /></BrowserRouter>,document.getElementById('root'));
registerServiceWorker();
