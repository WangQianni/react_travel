import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd/dist/antd.css';
import './i18n/config';
import { Provider } from 'react-redux';
import rootStore from './redux/store';
import axios from "axios";
import { PersistGate } from 'redux-persist/integration/react'; // 针对react的

axios.defaults.headers["x-icode"] = "FB80558A73FA658E" // 设置好多次需要用到的共用体

ReactDOM.render(
    <React.StrictMode>
        <Provider store={rootStore.store}>
            {/* PersistGate 有两个字段，loading / persistor 因为可能会对ui造成堵塞，所有有loading支持数据还没读取的时候等待*/}
            <PersistGate persistor={rootStore.persistor}>
                <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);