/*
 * 用来根据老的state和指定的action生成并返回新的state的函数
 */

/*
 用来管理首页的函数
 */
import StoreUtil from '../utils/storageUtils'
import StoreageUtil from '../utils/storageUtils'
import {combineReducers} from 'redux'
import {SET_HEAD_TITLE,RECEIVE_USER,SHOW_ERROR_MSG,REST_USER} from './action-types'
const initHeader='首页'
function headTitle(state=initHeader,action) {
    switch (action.type){
        case SET_HEAD_TITLE:
            return action.data
        default :
            return state
    }
}


/*
 *用来管理用户
 */
const initUser=StoreUtil.getUser();
function user(state=initUser,action) {
    switch (action.type){
        case RECEIVE_USER:
            const user =action.user
            StoreageUtil.saveUser(user);
            return user
        case SHOW_ERROR_MSG:
            const errorMsg=action.errorMsg
            //state.errorMsg=errorMsg  这种方式不可取，因为获取不了新的数据状态
            //创建新对象
            return {...state,errorMsg}
        case REST_USER:
            return {}
        default:
            return state
    }
}


/*
 向外默认暴露的是合并产生的总reducer函数，管理的总的state结构：
 {
    header：‘首页’，
    user：{}
 }
 */
export default combineReducers({
    headTitle,
    user

})
