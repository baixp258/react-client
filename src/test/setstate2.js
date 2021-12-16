/**
 * 柱状图
 * */
import  React,{Component} from 'react'
import {Button} from 'antd'

export default class SetState2 extends  Component{

    /*
    setState()更新状态是异步还是同步
       1).执行seState()的位置？
       在react控制的回调函数中：声明周期钩子 react事件监听回调
       非react控制的异步回调函数中：定时器、原生的事件监听回调、promise回调
       2）异步OR同步？
         react相关回调中：异步
         非react异步回调中：同步
     关于异步的setState（）
       1）多次调用，如何处理
       setState（{}）：合并更新一次状态，只调用一次render（）更新界面----状态更新和界面更新都合并了
       setState（fn）：更新多次状态，但只调用一次render（）更新界面---状态更新没有合并，但界面更新合并了
       2). 如何得到异步更新状态后的状态数据？
          在setState()的callback回调函数中
     */

    state={
        count:0
    }

    update1=()=>{
        console.log('update1 setState()之前',this.state.count)
        this.setState(state=> ({count:this.state.count+1}))
        console.log('update1 setState()之后',this.state.count)
    }
    //render渲染之后加载, react声明钩子函数，setSate()是异步更新状态
    componentDidMount(){
        console.log('componentDidMount之前',this.state.count)
        this.setState(state=> ({count:this.state.count+1}))
        console.log('componentDidMount之后',this.state.count)
    }
    //定时器回调---同步
    update2=()=>{
        setTimeout(()=>{
            console.log('setTimeout之前',this.state.count)
            this.setState(state=> ({count:this.state.count+1}))
            console.log('setTimeout之后',this.state.count)
        })
    }
   //原生事件监听回调----同步
    update3=()=>{
        const h2=this.refs.count
        console.log(h2)
        h2.onclick=()=>{
            console.log('onClick之前',this.state.count)
            this.setState(state=> ({count:this.state.count+1}))
            console.log('onClick之后',this.state.count)
        }
    }
    //promis回调
     update4=()=>{
        Promise.resolve().then(value=>{
            console.log('promise之前',this.state.count)
            this.setState(state=> ({count:this.state.count+1}))
            console.log('promise之后',this.state.count)
        })
     }

     //函数连续调用
    update5=()=>{
        console.log('onclick之前',this.state.count)
        this.setState(state=> ({count:this.state.count+1}))
        console.log('onclick之后',this.state.count)
        console.log('onclick之前2',this.state.count)
        this.setState(state=> ({count:this.state.count+1}))
        console.log('onclick之后2',this.state.count)
    }

    //兑现连续调用
    update6=()=>{
        console.log('onclick之前',this.state.count)
        this.setState({count:this.state.count+1})
        console.log('onclick之后',this.state.count)
        console.log('onclick之前2',this.state.count)
        this.setState({count:this.state.count+1})
        console.log('onclick之后2',this.state.count)
    }

   //函数和对象
    update7=()=>{
        console.log('onclick之前',this.state.count)
        this.setState(state=> ({count:this.state.count+1}))
        console.log('onclick之后',this.state.count)
        console.log('onclick之前2',this.state.count)
        this.setState({count:this.state.count+1})
        console.log('onclick之后2',this.state.count)
    }

    componentDidMount(){
        this.setState(state=> ({count:this.state.count+1}))
        this.setState(state=> ({count:this.state.count+1}))
        console.log('count函数之后',this.state.count) // 2=0
        this.setState({count:this.state.count+1})
        this.setState({count:this.state.count+1})
        console.log('count对象之后',this.state.count) //3=0
        setTimeout(()=>{
            this.setState(state=> ({count:this.state.count+1}))
            console.log('setTimeout之后',this.state.count)//9=4
            this.setState(state=> ({count:this.state.count+1}))
            console.log('setTimeout之后',this.state.count)//11=5
        },0)
        Promise.resolve().then(value=>{
            this.setState(state=> ({count:this.state.count+1}))
            console.log('promise之后',this.state.count)// 6=2
            this.setState(state=> ({count:this.state.count+1}))
            console.log('promise之后',this.state.count)//7=3
        })

    }

    render(){
        console.log('render()'+this.state.count)// 1=0  //4=1  //5=2  //7=3 //8=4  //10=5 //12=5
        return(
            <div>
                <h2 ref='count'>组件：{this.state.count}</h2>
                <Button onClick={this.update1}>A测试1</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                <Button onClick={this.update2}>A测试2</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                <Button onClick={this.update3}>A测试3</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                <Button onClick={this.update4}>A测试4</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                <Button onClick={this.update5}>A测试5</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                <Button onClick={this.update6}>A测试6</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                <Button onClick={this.update7}>A测试7</Button>&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
        )

    }


}