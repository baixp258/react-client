/**
 * 首页
 * */
import  React,{Component} from 'react'
import {Form,Select,Input} from 'antd'
import {message} from "antd/lib/index";
import {reqLogin} from "../../api";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import {reqCategoryAdd} from '../../api/index'
const Item=Form.Item
const form= Form.useForm
const Option =Select.Option;
export default class AddFrom extends  Component{

    state= {
        category: [

        ]
    }

    // noinspection JSAnnotator
    onFinish  = async  (values: any) => {
        alert("弹框")
        console.log('Received values of form: ', values);
        this.setState({
            user:values
        })
        // alert(this.state.user.username);
        //alert(this.state.user.password);
        //调用登录接口 //回退 alt <-
        const {id,parentId,name}=values;

        this.setState({
            category:storageUtils.getCategory("CATEGORY_KEY")
        })
        console.log(this.state.category);
        //用const来接收promise对象
       /* const response =await reqCategoryAdd(parentId,name);//{code：0000,data :user} // {code：2002,msg:'xxx'}
        console.log('接收成功'+response.code);*/

    }
    render(){

        return(

            <Form
                name="normal_login"
                className="login-form"
                onFinish={this.onFinish}
            >
                <Form.Item
                    name="parentId"
                    rules={[
                        { required: true, message: '必须输入!' },
                        { max: 12, message: '必须小于12位!' }
                    ]}>

                    <Select>
                        <Option value="0">一级分类</Option>
                        <Option value="1">电器</Option>
                        <Option value="2">衣服</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="categoryName"
                    rules={[ { required: true, message: '必须输入!' },
                        { max: 12, message: '必须小于12位!' }  ]}>
                        <Input
                            placeholder="请输入参数" />
                </Form.Item>
            </Form>
        )

    }


}

