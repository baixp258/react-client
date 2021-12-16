/*
  包含n个action creator函数的模块
  同步action：对象{type:'',data:数据值}
  异步action：函数dispatch=>{}
 */
import {SET_HEAD_TITLE,RECEIVE_USER,SHOW_ERROR_MSG,REST_USER} from './action-types'
import {reqLogin} from '../api'
import StorageUtils from '../utils/storageUtils'

/*
 *设置用户标题
 */
export const setHeadTitle = (headTitle) =>({type:SET_HEAD_TITLE,data:headTitle})


/*
 *接受用户action
 */
export const receiveUser=(user)=>({type:RECEIVE_USER,user})

/*
 *接受同步信息
 */
export const showErrorMsg=(errorMsg)=>({type:SHOW_ERROR_MSG,errorMsg})


/*
 * 退出登录重置action
 */
export const loginOut=()=>{
    //删除user对象从内存中
    StorageUtils.removeUser();
    return {type:REST_USER}
}


/*
 *登录用户用redux实现
 */
export const login=(username,password)=>{
    return async dispatch=>{
      //  debugger
        //1.执行ajax请求
        const result=await reqLogin(username,password)
        //2.如果成功，分发成功的同步action
        if(result.code==="0000"){
            const user=result.data
            dispatch(receiveUser(user))
        }else{ //如果失败，分发失败的action
            const msg = result.msg
            //message.error(msg)
            dispatch(showErrorMsg(msg))
        }

    }
}
