/*
 *redux最核心的管理对象
 */
import {createStore,applyMiddleware} from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk' //用来实现redux异步的redux中间件插件
import {composeWithDevTools} from 'redux-devtools-extension'

export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk))) //创建store对象内部会第一次调用reducer得到初始状态值
