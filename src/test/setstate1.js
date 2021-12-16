/**
 * 用户管理
 * */
import  React,{Component} from 'react'
import {Button} from 'antd'
export default class SetState1 extends  Component{

    /**
     * setState()更新状态的俩种写法
     * 1）.setState(update,[callback])
     *  update为返回stateChange对象函数：(state,props) => stateChange
     *  接受state和props被保证为最新的
     *  2).setState(stateChange,[callback])
     *  stateChange为对象
     *  callback是可选的回调函数，在状态更新且界面更新后才执行
     *  总结：
     *    对象方式是函数方式的简写方式
     *         如果新状态不依赖原状态====>使用对象方式
     *         如果新状态依赖于原状态====>使用函数方式
     *     如果新状态需要在setState()后获取最新的状态数据，在第二个callback函数中读取
     * @type {{count: number}}
     */
    state={
        count:1
    }

    test1=()=>{
        this.setState(state=>({count: state.count+1}))
        console.log('test1 setState()之后',this.state.count)
    }

    test2=()=>{
        const count=this.state.count+1
        this.setState({
            count
        })
        console.log('test2 setState()之后',this.state.count)
    }
    test3=()=>{
        this.setState(state=>({count : this.state.count+1}),()=>{
            console.log('test3 setState()之后',this.state.count)
        })
    }

    render(){
        console.log('A render()')
        return(
            <div>
                <h1>A组件：{this.state.count}</h1>
                <Button onClick={this.test1}>A测试1</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                <Button onClick={this.test2}>A测试2</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                <Button onClick={this.test3}>A测试3</Button>&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
        )

    }


}