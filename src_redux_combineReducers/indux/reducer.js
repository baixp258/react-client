/*
 * reducer函数模块：根据当前state和制定的action返回一个新的state
 */
/*
 管理count 状态数据的reducer
 */

import {INCREMENT,DECREMENT} from './action-types'
import {combineReducers} from 'redux'
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

/**
 * 管理user状态数据的reducer
 * @type {{}}
 */
const initUser={}
function user(state=initUser,action){

    switch(action.type){
        default:
            return state
    }
}

/*
 combineReducers函数：接受包含所有的reduc函数的对象，返回一个新的reducer函数（总reducer）
 总的reducer函数管理的state的结构
 {
    count:2，
    user:{}
 }
 */
export default combineReducers({
    count,
    user
})