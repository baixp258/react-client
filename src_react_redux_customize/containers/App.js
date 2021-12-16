import React,{Component} from 'react'
import {connect} from '../lib/redux_react'

import Counter from '../components/Counter'
import {increment,decrement,incrementAsync} from '../indux/actions'
/*
  容器组件：通过connet包装UI组件产生组件
  connect():高阶函数
   connect():返回的函数是一个高阶组件：接受一个UI组件，生成一个容器组件
  容器组件的责任：向UI组件传入特定的属性
 */

/**
 * 用来将redux管理的state数据映射成UI组件的一般属性的函数
 * @param state
 * @returns {{count: *}}
 */
function mapStateToProps(state) {
    return {
        count:state.count
    }
}

/*
 *指定Countter传入哪些函数属性
  用来将包含diapath代码的函数映射成UI组件的函数属性的函数
  如果是函数，会自动调用得到对象，将对象中的方法作为函数属性传入UI组件
 */
/*function mapDispatchToProps(dispatch) {
    return{
        increment:(num)=> dispatch(increment(num)),
        decrement:(num)=> dispatch(decrement(num)),
        incrementAsync:(num)=> dispatch(incrementAsync(num))
    }
}*/


const mapDispatchToProps={increment,decrement,incrementAsync}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter)

/*export default connect(
    state=>({count:state.count}),
    {increment,decrement,incrementAsync}
)(Counter)*/
