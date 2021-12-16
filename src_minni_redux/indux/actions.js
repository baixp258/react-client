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
