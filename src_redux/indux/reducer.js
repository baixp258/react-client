/*
 * reducer函数模块：根据当前state和制定的action返回一个新的state
 */
/*
 管理count 状态数据的reducer
 */

import {INCREMENT,DECREMENT} from './action-types'

export default function (state=1,action) {

    switch (action.type){
        case INCREMENT:
            return state+action.data
        case DECREMENT:
            return state-action.data
        default :
            return state
    }

}