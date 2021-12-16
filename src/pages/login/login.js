/**
 * 登录路由组件
 *
 *    rules={[{ validator: this.validPwd}]}>
 *    const 常量是块级作用域，很像使用let语句定义的变量
 *    使用 1.sync
 *         2.await
 *
 *        原来 reqLogin(username,password).then(response=>{
              console.log('成功',response.data.code)
           }).catch(error=>{
            console.log('失败',error)
         })
      1、history使用
      1）.跳转之后不用回退到登录页面
      this.props.history.replace()
      2）.跳转之后需要回退
      this.props.history.push()
 * */



import  React,{Component} from 'react'
import { Form, Input, Button,message } from 'antd';
import  './css/login.less'
import logo from '../../assets/images/logo.png'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/actions'
import {connect} from 'react-redux'

class Login extends  Component{
    constructor(props){
        super(props);
        this.state= {
            user: {
                username: '',
                password: ''
            }
        }
    }
       // noinspection JSAnnotator
    onFinish  = async  (values: any) => {
        console.log('Received values of form: ', values);
        this.setState({
            user:values
        })

       // alert(this.state.user.username);
       // alert(this.state.user.password);
        //调用登录接口 //回退 alt <-
        const {username,password}=values;
       /* //用const来接收promise对象
        const response =await reqLogin(username,password);//{code：0000,data :user} // {code：2002,msg:'xxx'}
        console.log('接收成功'+response.code);
        if(response.code=='0000'){
            //提示的登录成功
            message.success('登录成功');
            const user=response.data;
            memoryUtils.user=user;
            storageUtils.saveUser(user);
            //跳转到主页面不需要回退到登录页面
            this.props.history.replace('/home');

        }else{
            message.error("登录失败");
        }*/
       //用redux方式实现,获取方式更新状态
       this.props.login(username,password)
        //跳转到主页面不需要回退到登录页面
        this.props.history.replace('/home');

    }


    render(){
        //debugger
        //验证内存中是否有user对象，如果存在说明登录成功，直接跳转到admin页面
       // const userLogin=memoryUtils.user;
     //用redux方式实现
       const userLogin= this.props.user
        if(!userLogin){
            return <Redirect to='/login'/>
        }
        const errorMsg= this.props.user.errorMsg
        return(
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt="logo"></img>
                    <h1>React项目：后台管理系统</h1>
                </header>
                <section className='login-content'>
                    <div>{errorMsg}</div>
                    <h2>用户登录</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                { required: true, message: '必须输入!' },
                                { min: 4, message: '必须大于4位!' },
                                { max: 12, message: '必须小于12位!' },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: '必须是英文、数字或者下划线组成!' }
                                ]}>
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[ { required: true, message: '必须输入!' },
                                { min: 4, message: '必须大于6位!' },
                                { max: 12, message: '必须小于12位!' },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: '必须是英文、数字或者下划线组成!' }]}>
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
/*
  async 和 await
  1.作用？
   简化promise对象的使用：不用在使用then()来指定成功或者失败的回调函数。
   以同步编码（没有回调函数）方式实现异步流程。
  2.哪里写await
    在返回promise的表达式左侧写await：不想哟promise，想要proise异步执行成功的value数据
  3.哪里写async
    await所在函数（最近的）定义的左侧
 */
export default connect(
    state=>({user:state.user}),
    {login}
)(Login)