/*
 *包含n个用来创建action的工厂函数(action，creator)
 */
//第一种写法
/*export function increment(number) {

    return {type:'INCREMENT',data: number}

}*/
//常用写法
/*
  增加action
 */
import {INCREMENT,DECREMENT} from './action-types'

export const increment = num => ({type:INCREMENT,data: num})

/*
 *减少的action
 */
export const decrement = num =>({type:DECREMENT,data: num})

/*
 增加异步action：返回是函数
 */
export const incrementAsync = num =>{
    return dispatch => {
        //执行异步（定时器，ajax请求，promise）
        setTimeout(()=>{
            //当前异步任务执行完成时，分发一个同步action
            dispatch(increment(num))
        },1000)
    }
}
