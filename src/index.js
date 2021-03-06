/*
 * 入口js
 */
import  React from 'react'
import App from './App.js'
import ReactDOM from 'react-dom'
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'
import {Provider} from 'react-redux'
import store from './redux/store'

//import 'antd/dist/antd.css'

//读取local中保存user，保存到内存中
//const user=storageUtils.getUser();
//memoryUtils.user=user;
//将APP组件标签渲染到index页面的div上
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'))