/**
 * 角色管理
 * */
import  React,{Component} from 'react'
import {Form,Select,Input} from 'antd'
import {reqLogin} from "../../api";
export default class AddFrom extends  Component{

    state={
        role_name:""
    }

    getAddRole=(e)=>{
        this.setState({
            role_name:e.target.value
        })
    }
   getNewRole=()=>{
        return this.state.role_name;
   }

    render(){
        const formItemLayout = {
            labelCol: {
                xs: { span: 2 },
                sm: { span: 4 },
            },//左侧label的宽度
            wrapperCol: {
                xs: { span: 2 },
                sm: { span: 15 },
            },//制定右侧包裹的宽度
        };
        return(
                <Form.Item
                    name="roleName"
                    rules={[ { required: true, message: '必须输入角色名称!' }]}
                    label="角色名称"
                    {...formItemLayout} >
                    <Input
                        placeholder="请输入角色名称" onChange={this.getAddRole} />
                </Form.Item>
        )

    }


}

