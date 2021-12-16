/*
 * 入口js
 */
import  React from 'react'
import App from './containers/App'
import ReactDOM from 'react-dom'
import store from './indux/stroe'
import {Provider} from 'react-redux'


//重新渲染App组件标签
ReactDOM.render(
        <Provider store={store}>
           <App/>
        </Provider>,
        document.getElementById('root'))

