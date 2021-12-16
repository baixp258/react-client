/**
 * 首页
 * */
import  React,{Component} from 'react'
import {Form,Select,Input} from 'antd'
import {reqCategoryAdd} from "../../api";
import PropTypes from 'prop-types';
const Item=Form.Item
const Option =Select.Option;
export default class UpdateFrom extends  Component{

   static propty ={
       categroyName:PropTypes.string.isRequired
   }

    // noinspection JSAnnotator
    onFinish  = async  (values: any) => {
        console.log('Received values of form: ', values);
        this.setState({
            user:values
        })
        // alert(this.state.user.username);
        //alert(this.state.user.password);
        //调用登录接口 //回退 alt <-
        const {id,parentId,name}=values;
        const response =await reqCategoryAdd(parentId,name);//{code：0000,data :user} // {code：2002,msg:'xxx'}
        console.log('接收成功'+response.code);
    }
    render(){
       const {categoryName}=this.props
        console.log(categoryName)
        return(

            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
            >
                <Form.Item>
                    name='categroyName'
                    <Input
                        placeholder="请输入参数"  defaultValue={categoryName}/>

                </Form.Item>
            </Form>
        )

    }


}

