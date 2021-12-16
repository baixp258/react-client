import  React,{Component} from 'react'
import {
    Card,
    Button,
    Form,
    Input,
    Select,
    message
} from 'antd'
import {selectRolesList,addUser} from '../../api'
const Item=Form.Item
const { Option } = Select
export default class AddUserAndRole extends Component {

    state={
        addUserRole:{},
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
        this.setState({
            addUserRole:values
        })
        const {addUserRole} =this.state
        const result=await addUser(addUserRole);
        if(result.code="0000"){
            message.success("添加用户成功");
        }else{
            message.error("添加用户失败");
        }
    }

    getAddUser=()=>{
        const {username,address,email,roleid,password}= this.state
        const addUserRole={username,address,email,roleid,password}
        return addUserRole;
    }


    handleChang=(value)=> {
        console.log(`selected ${value}`);
        this.setState({
            roleid:value
        })
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

    //render之后加载
  componentDidMount=async()=>{
       const result=await selectRolesList();
       if(result.code="0000"){
          const roles= result.data
           this.setState({
               roles:roles
           })
       }
   }


    render() {
        const {addUserRole,roles} =this.state;
        return( <Card >
            <Form
                name="adduser"
                className="login-form"
                onFinish={this.onFinish}
            >
                <Item label="姓名"
                      name="username"
                      rules={[
                          { required: true, message: '输入用户名!' }
                      ]}>
                    <Input placeholder='输入用户名' defaultValue={addUserRole.username}  onChange={(e)=>(this.setState({username:e.target.value}))} />
                </Item>
                <Item label="密码"
                      name="password"
                      rules={[
                          { required: true, message: '输入用户密码!' }
                      ]}>
                    <Input type='password'
                     placeholder='输入用户密码' defaultValue={addUserRole.password}  onChange={(e)=>(this.setState({password:e.target.value}))} />
                </Item>
                <Item label="地址"
                      name="address"
                      rules={[{ required: true, message: '请输入用户地址!' }]}>
                    <Input placeholder='请输入用户地址' defaultValue={addUserRole.address}  onChange={(e)=>(this.setState({address:e.target.value}))} />
                </Item>
                <Item label="邮箱"
                      name="email"
                      rules={[{ required: true, message: '请输入用户邮箱!' }]}>
                    <Input  placeholder='请输入用户邮箱' defaultValue={addUserRole.email}  onChange={(e)=>(this.setState({email:e.target.value}))} />
                </Item>
                <Item label="角色"
                      name="roleid"
                      rules={[{ required: true, message: '请选择角色名称!' }]}>
                    <Select  style={{ width: 200 }}  placeholder="请选择角色名称"   onChange={this.handleChang} >
                        {
                            roles.map((c,key)=>
                                <Option key={key} value={c.roleid}>{c.role_name}</Option>
                            )
                        }
                    </Select>
                </Item>
            </Form>
        </Card>)

    }
}