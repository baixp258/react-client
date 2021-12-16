import  React,{Component} from 'react'
import {
    Card,
    Button,
    Form,
    Input,
    Select,
    message
} from 'antd'
import {selectRolesList, updateUser} from '../../api'
import PropTypes from "prop-types";
const Item=Form.Item
const { Option } = Select
export default class UpdateUser extends Component {


    static propTypes={
        user:PropTypes.object
    }

    state={
        updateuser:{},
        roles:[],
        username:"",
        password:"",
        email:"",
        address:'',
        roleid:''
    }


    // 添加用户
    // noinspection JSAnnotator
    onFinish = async (values: any) => {
        const {username,address,email,roleid,password}=values
        const {userid} =this.props.user;
        //重新封装updateuser
        const updateuser={userid,username,address,email,roleid,password}
       console.log(updateuser)
        const result=await updateUser(updateuser);
        if(result.code="0000") {
            message.success("用户信息修改成功")
        }else{
            message.error("用信息更改失败");
        }

    }

    handleChang=(value)=> {
        this.setState({
            roleid:value
        })
    }

    getNewUser=()=>{
        const {username,address,email,roleid,password}=this.state
        const {userid} =this.props.user;
        const updateuser={userid,username,address,email,roleid,password}
        return updateuser;
    }


    //render之前加载
    componentWillMount=async ()=>{
        const result= await selectRolesList();
        if(result.code==="0000"){
            const roles =result.data
            this.setState({
                roles
            })
        }
    }


    render() {
        const {userid,username,address,email,password,role_name,roleid} =this.props.user;
        const {roles}=this.state
        return( <Card >

            <Form
               name="updateuser"
               onFinish={this.onFinish}
            >

                <Item label="姓名"
                      name="username"
                      rules={[
                          { required: true, message: '输入用户名!' }
                      ]}>
                    <Input   placeholder='输入用户名'  onChange={(e)=>(this.setState({username:e.target.value}))} defaultValue={username}/>
                </Item>
                <Item label="密码"
                      name="password"
                      rules={[
                          { required: true, message: '输入用户密码!' }
                      ]}>
                    <Input type='password' placeholder='输入用户密码' defaultValue={password} onChange={(e)=>(this.setState({password:e.target.value}))}/>
                </Item>
                <Item label="地址"
                      name="address"
                      rules={[{ required: true, message: '请输入用户地址!' }]}>
                    <Input placeholder='请输入用户地址' defaultValue={address} onChange={(e)=>(this.setState({address:e.target.value}))} />
                </Item>
                <Item label="邮箱"
                      name="email"
                      rules={[{ required: true, message: '请输入用户邮箱!' }]}>
                    <Input  placeholder='请输入用户邮箱' defaultValue={email} onChange={(e)=>(this.setState({email:e.target.value}))}/>
                </Item>
                <Item label="角色"
                      name="roleid"
                      rules={[{ required: true, message: '请选择角色名称!' }]}>
                    <Select  style={{ width: 200 }} defaultValue={role_name} placeholder="请选择角色名称" onChange={this.handleChang}>
                        {
                            roles.map(role=> ( <Option key={role.roleid} value={role.roleid}>{role.role_name}</Option>))

                        }
                    </Select>
                </Item>
            {/*  <Item>
                    <Button  type="primary" htmlType="submit">提交</Button>
                </Item>*/}
            </Form>
        </Card>)

    }
}