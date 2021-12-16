/**
 * 用户管理
 * */
import  React,{Component} from 'react'
import {Button} from 'antd'
import PropTypes from "prop-types";
export default class ShouldComponentUpdate extends  Component{

    /**
     * 1.Component存在问题
     *  1).子组件重新render(),当前组件也会重新执行render()，即使没有任务变化
     *  2).当前组件setState(),重新执行render()，即使state没有任何变化
     * 2.解决Component存在问题
     *  1).原因组件的componentShouldUpdate()默认返回true，即使数据没有任何变化render()都回重新执行
     *  2).办法1:重写shouldcomponentUpdate()，判断吐过数据有变化返回true，否则返回false
     *  3).办法2：使用PureComponent代替component
     *  4).说明：一般使用PureComponent来优化组件性能
     * 3.PureComponent的基本原理
     *  1.）重写实现shouldComponentUpdate（）
     *  2.)对组件的新/旧state和props的数进行浅比较，如果没有变化返回true，否则返回false
     *  3.）一但componentShouldUpdate（）false不再执行用于更新的render()
     */
    state={
       // m1:1
        m1:{
            count:1
        }
    }

    test1=()=>{
      //  this.setState(state=>({m1: this.state.m1+1}))
        const m1=this.state.m1
        m1.count=2;
        this.setState({m1})
      //  this.setState({m1:{...m1}})
        console.log('test1 setState()之后',this.state.m1)
    }


    render(){
        console.log('A render()')
        return(
            <div>
                <h1>A组件：{this.state.m1.count}</h1>
                <Button onClick={this.test1}>A测试1</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                <B m1={this.state.m1}/>
            </div>
        )

    }


}

class B extends React.PureComponent{

  /*  static propTypes={
        m1:PropTypes.string
    }*/
    state={
        m2:1
    }

    /*test1=()=>{
          this.setState(state=>({m2: this.state.m2+1}))
          console.log('test1 setState()之后',this.state.count)
      }*/
    test1=()=>{
        this.setState({})

    }
    /**
     * 用来决定当前组件是否应该重新render()
     */
   /* shouldComponentUpdate(nextProps,nextState){
        //比较就的props中的和state数据，如果没有一个变化返回false，否则返回true
        if(this.props.m1==nextProps.m1 && this.state.m2==nextState.m2){
            return false
        }else{
            return true
        }

        return true//Component中默认为true
    }*/
    render(){
        console.log('B render()')
        return(
            <div>
                <h1>B组件：{this.state.m2},m1={this.props.m1.count}</h1>
                <Button onClick={this.test1}>A测试1</Button>&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
        )

    }


}