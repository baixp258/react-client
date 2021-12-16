/**
 * 应用跟组件
 */
import  React,{Component} from 'react'
import { message, Button} from 'antd'
import PropTypes from "prop-types";
import {increment,decrement} from './indux/actions'

export default class App extends  Component{

    /**
     *引入store
     */
    static propTypes = {
        store:PropTypes.object.isRequired
    }
    /*state={
        count: 0
    }*/
    constructor(props){
        super(props)
        this.reduxTest= React.createRef()

    }

    incrment=()=>{
        const num=this.reduxTest.current.value * 1
        this.props.store.dispatch(increment(num))
    }


    decrment=()=>{
        const num=this.reduxTest.current.value * 1;
        this.props.store.dispatch(decrement(num))
    }

    incrmentOfAdd=()=>{
        const num=this.reduxTest.current.value * 1;
        if(this.props.store.getState() % 2===0){
            this.props.store.dispatch(increment(num))
        }
    }

    //异步执行
    async=()=>{
        const num=this.reduxTest.current.value * 1;
        setTimeout(()=>{
            this.props.store.dispatch(increment(num))
        },1000)
    }


    render(){
        //const count=this.state.count;
        const count=this.props.store.getState()
        return(
            <div>
                <p>clicks {count} time</p>
                <div>
                    <select ref={this.reduxTest}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>&nbsp;&nbsp;&nbsp;
                    <Button onClick={this.incrment}>+</Button>&nbsp;&nbsp;&nbsp;
                    <Button onClick={this.decrment}>-</Button>&nbsp;&nbsp;&nbsp;
                    <Button onClick={this.incrmentOfAdd}>incrment of add</Button>&nbsp;&nbsp;&nbsp;
                    <Button onClick={this.async}>async</Button>&nbsp;&nbsp;&nbsp;
                </div>

            </div>
        )

    }


}