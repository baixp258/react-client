/**
 * 角色管理
 * */
import  React,{Component} from 'react'
import {
    Card,
    Button,
    Table,
    Modal,
    message
} from 'antd'
import {addRole, reqRoleList, updateRole} from '../../api'
import AddFrom from "./AddFrom";
import SetRoleFrom from './SetRoleFrom'
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import {connect} from 'react-redux'
import {loginOut} from '../../redux/actions'
 class Role extends  Component{


    constructor(props){
        super(props);
        this.addRole=React.createRef();
        this.roleDate=React.createRef();
    }
    state={
        roles:[],//所有角色的列表
        role:{},//选中role
        isShowAnd: false, //是否显示添加界面
        isSetRole: false  //显示角色权限
    }

     initColumn=()=>{
         this.columns=[{
             title: '角色名称',
             dataIndex:'role_name'
         },{
             title: '创建时间',
             dataIndex:'create_time'
         },{
             title: '授权时间',
             dataIndex:'auth_time'
         },{
             title: '授权人',
             dataIndex:'anth_name'
         },
         ]
     }


     //设置鼠标点击属性
    onRow=(role)=>{
        return {
            onClick: event => {
               console.log(role)
                this.setState({
                    role
                })
            }, // 点击行
        }
    }
    //获取role列表
    getRoleList= async ()=>{
       const result= await reqRoleList();
       if(result.code==='0000'){
           message.success("更新列表成功")
           const roles=result.data
           this.setState({
               roles
           })
       }
    }

    //添加角色
    addNewRole=async ()=>{
        this.setState({
            isShowAnd:false
        })
        const role_name=this.addRole.current.getNewRole();
      //  const auth_name= memoryUtils.user.username
        //redux方式获取username
        const auth_name=this.props.user.auth_name
        const role={role_name,auth_name}
        console.log(role_name+"===================="+auth_name);
        const result=await addRole(role);
        if(result.code="0000"){
            message.success("添加成功");
        }else{
            message.error("添加失败");
        }

    }

    //设置角色权限
    setRole=async ()=>{
        //隐藏确认框
        this.setState({
            isSetRole: false
        })
        let menu
       const roles= this.roleDate.current.getRoleUpdate();
       const roleid= this.roleDate.current.getRoleid();
       menu=roles
       const newRole=await updateRole(roleid,menu);
        if(newRole.code==="0000"){
        //    const  localRoleid=    memoryUtils.user.roleid
          const  localRoleid= this.props.user.roleid
            if(roleid===localRoleid){
                message.success("当前用户权限更新成功");
             //   memoryUtils.user={}
              //  storageUtils.removeUser()
                //redux方式实现
                this.props.loginOut();
                this.roleDate.current.removeRoleData();
                this.props.history.replace('/login')
            }else{
                message.success("设置权限成功");
                console.log("rules============================="+newRole.data.menu);
                // this.getRoleList();
                const role=newRole.data
              //  role.roleid=memoryUtils.user.username
                role.roleid=this.props.user.roleid
                console.log("role-----------------------------------------------------------"+ role.roleid)
                this.setState({
                    role:role
                })
                this.roleDate.current.removeRoleData();
            }
        }else{
            message.error("权限更新失败");
            //console.log("role_id============================="+role_id);
           // this.roleDate.current.removeRoleData();
        }


    }

     componentWillMount(){
         this.initColumn()
     }
    //获取角色信息
     componentDidMount(){
         this.getRoleList();
     }

    render(){
        const {roles,role,isShowAnd,isSetRole}=this.state
        const {roleid}=role
        const title=(
            <span>
                <Button type='primary' onClick={()=>{this.setState({isShowAnd:true})}}>创建用户角色</Button>&nbsp;&nbsp;
                <Button type='primary' disabled={!roleid}  onClick={()=>{this.setState({isSetRole:true})}}>设置角色权限</Button>
            </span>
        )
        return(
            <Card title={title}>
                <Table
                    rowKey="roleid"
                    dataSource={roles}
                    bordered={true}
                    columns={this.columns}
                    pagination={{defaultPageSize:3,showQuickJumper:true}}
                    rowSelection={{type:'radio' ,selectedRowKeys:[roleid]}}
                    onRow={this.onRow}
                />

                <Modal title="创建角色" visible={isShowAnd} onOk={this.addNewRole} onCancel={()=>{this.setState({
                    isShowAnd: false
                })}}>
                    <AddFrom ref={this.addRole}/>
                </Modal>
                <Modal title="设置角色权限" visible={isSetRole} onOk={this.setRole} onCancel={()=>{this.setState({
                    isSetRole: false
                })}}>
                    <SetRoleFrom ref={this.roleDate} role={role}/>
                </Modal>
            </Card>
        )

    }


}

export default connect(
    state=>({user:state.user}),
    {}
)(Role)