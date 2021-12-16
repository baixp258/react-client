/*
 * reducer函数模块：根据当前state和制定的action返回一个新的state
 */
/*
 管理count 状态数据的reducer
 */

import {INCREMENT,DECREMENT} from './action-types'
import {combineReducers} from '../lib/redux/index'


 function count(state=1,action) {

    switch (action.type){
        case INCREMENT:
            return state+action.data
        case DECREMENT:
            return state-action.data
        default :
            return state
    }

}

function user(state={},action) {
    switch (action.type){
        default:
            return state
    }
}
/*
 返回一个整合后的总的reducer总的状态：{count:1,user:{}}
 */
export default combineReducers({
    count,
    user
})