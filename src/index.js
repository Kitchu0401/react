// 모듈 호출
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import App from './components/App';

const rootElement = document.getElementById('root');

// React가 Component를 그리도록 render() 호출
ReactDOM.render(<AppContainer><App/></AppContainer>, rootElement);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./components/App', () => {
        const NextApp = require('./components/App').default;
        ReactDOM.render(<AppContainer><NextApp/></AppContainer>, rootElement);
    });
}
