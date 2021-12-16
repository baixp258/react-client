/**
 * 用户管理
 * */
import  React,{Component} from 'react'
import {Button,
         Card,
         Table,
        Modal,
        Space,
        message,

} from 'antd'
import {selectUserRoleList, deleteUserByuserId, addUser, updateUser} from '../../api'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import AddUser from './addUser'
import  UpdateUser from './updateUser'
const { confirm } = Modal;
export default class User extends  Component{

   state={
       users:[],
       user:{},
       isShow:false,//显示模态框
       isUpdateShow:false //更新显示界面
   }

   constructor(props){
       super(props)
      this.newUser= React.createRef()
       this.addUser=React.createRef();
   }

    initCloum=()=>{
        this.columns=[{
            title: '用户名',
            dataIndex:'username'
        },{
            title: '邮箱',
            dataIndex:'email'
        },{
            title: '创建时间',
            dataIndex:'createtime',

        },{
            title: '角色名称',
            dataIndex:'role_name'
        }, {
            title: '操作',
            width: 200,
            render: (user) => (//render中的cotegory相当于对象，通过点击事件将对象传入，获取父parentId值
                <Space  size="middle">
                    {/*将product对象使用state传递改目标路由组件*/}
                    <a onClick={()=>this.updateUser(user)}>修改</a>
                    <a  onClick={()=>this.deleteUser(user)}>删除</a>
                </Space>
            )}
        ]
    }
    //加载列信息
    componentWillMount(){
        this.initCloum();
    }

    //加载用户角色列表信息
     componentDidMount=async ()=>{
       const result=await selectUserRoleList();
       console.log(result)
       if(result.code){
           this.setState({
               users:result.data
           })
       }
     }
    //修改用户
    updateUser=(user)=>{
        this.setState({
            isUpdateShow:true,
            user
        })
    }
    //添加用户
    addUserRole=async ()=>{
        this.setState({
            isShow:false
        })
        const addUserRole=this.addUser.current.getAddUser();
        const {username,address,email,roleid,password} =addUserRole
         const result=await addUser(addUserRole);
          if(result.code="0000"){
              message.success("添加用户成功");
          }else{
              message.error("添加用户失败");
          }
    }

     //删除用户
    deleteUser= (user)=>{
       this.setState({
           user
       })
        confirm({
            title: `确认删除当前${user.username}用户吗`,
            icon: <ExclamationCircleOutlined />,
            onOk:async()=> {
                const resule=await deleteUserByuserId(user.userid);
               if(resule.code==="0000"){
                    message.success("删除成功");
               }
            }
        });

    }
   //修改用户信息
    updateUpdate=async ()=>{
       this.setState({
           isUpdateShow:false
       })
       const updateuser= this.newUser.current.getNewUser();
        //重新封装updateuser
      //  const updateuser={userid,username,address,email,roleid,password}
        console.log(updateuser)
        const result=await updateUser(updateuser);
        if(result.code="0000") {
            message.success("用户信息修改成功")
        }else{
            message.error("用信息更改失败");
        }
    /*   const {userid,username,address,email,roleid,password} =result
       console.log("result==================="+username+"=========="+address+"========"+email+"========="+roleid+"======="+password+"===="+userid);*/
    }

    render(){
      const {users,isShow,user,isUpdateShow} =this.state
      const {userid}=user
      const title=(
          <span>
               <Button type='primary' onClick={()=>{this.setState({isShow:true})}}>添加用户</Button>
          </span>
      )

        return(
            <Card title={title}>
                <Table
                    rowKey="userid"
                    dataSource={users}
                    bordered={true}
                    columns={this.columns}
                    pagination={{defaultPageSize:3,showQuickJumper:true}}
                    rowSelection={{type:'radio' ,selectedRowKeys:[userid]}}
                    //onRow={this.onRow}
                />
                <Modal title="添加用户" visible={isShow} onOk={this.addUserRole} onCancel={()=>{this.setState({
                    isShow: false
                })}}>
                   <AddUser ref={this.addUser}/>
                </Modal>
                <Modal title="修改用户" visible={isUpdateShow} onOk={this.updateUpdate} onCancel={()=>{this.setState({
                    isUpdateShow: false
                })}}>
                    <UpdateUser ref={this.newUser} user={user}/>
                </Modal>
            </Card>
        )

    }


}