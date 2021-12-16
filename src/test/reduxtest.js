/**
 * redux
 * */
import  React,{Component} from 'react'
import {Button} from 'antd'

export default class ReduxTest extends  Component{

    /**
     *
     */
    state={
        count: 0
    }
    constructor(props){
        super(props)
        this.reduxTest= React.createRef()

    }

    incrment=()=>{
        const num=this.reduxTest.current.value * 1
        this.setState({
            count:this.state.count+num
        })
    }


    decrment=()=>{
        const num=this.reduxTest.current.value * 1;

        this.setState({
            count:this.state.count-num
        })
    }

    incrmentOfAdd=()=>{
        const num=this.reduxTest.current.value * 1;
        if(this.state.count % 2===0){
            this.setState({
                count:this.state.count+num
            })
        }
    }

    //异步执行
    async=()=>{
        const num=this.reduxTest.current.value * 1;
        setTimeout(()=>{
            this.setState({
                count:this.state.count+num
            })
        },1000)
    }


    render(){
        const count=this.state.count;
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