/**
 * 应用跟组件
 */
import  React,{Component} from 'react'
import { message, Button} from 'antd'
import PropTypes from "prop-types";
/*
 UI组件主要显示用于用户交互，代码中没有任何redux相关代码
 */
export default class Counter extends  Component{

    /**
     *引入store
     */
    static propTypes = {
        count:PropTypes.number.isRequired,
        increment:PropTypes.func.isRequired,
        decrement:PropTypes.func.isRequired,
        incrementAsync:PropTypes.func.isRequired
    }

    constructor(props){
        super(props)
        this.reduxTest= React.createRef()

    }

    incrment=()=>{
        const num=this.reduxTest.current.value * 1
        this.props.increment(num);
    }


    decrment=()=>{
        const num=this.reduxTest.current.value * 1;
        this.props.decrement(num);
    }

    incrmentOfAdd=()=>{
        const num=this.reduxTest.current.value * 1;
        if(this.props.count % 2===0){
            this.props.increment(num);
        }
    }

    //异步执行
    async=()=>{
        const num=this.reduxTest.current.value * 1;
        this.props.incrementAsync(num)
    }


    render(){
        //const count=this.state.count;
        const count=this.props.count
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