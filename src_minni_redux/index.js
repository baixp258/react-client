/*
 * 入口js
 */
import  React from 'react'
import App from './App.js'
import ReactDOM from 'react-dom'
import store from './indux/stroe'

ReactDOM.render(<App store={store}/>,document.getElementById('root'))
//store绑定状态更新的监听
store.subscribe(()=>{//store内部的状态数据发生改变时回调

    //重新渲染App组件标签
    ReactDOM.render(<App store={store}/>,document.getElementById('root'))

})