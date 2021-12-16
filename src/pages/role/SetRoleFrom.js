/**
 * 设置角色权限
 * */
import  React,{Component} from 'react'
import {Form,Input,Tree} from 'antd'
import {reqLogin} from "../../api";
import PropTypes from 'prop-types'
import List from '../../config/list'
import StorageUtils from '../../utils/storageUtils'
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';
const Item=Form.Item
export default class SetRoleFrom extends  Component{


            static propTypes={
                role:PropTypes.object
            }

            constructor(props) {
                    super(props)
                    this.state = {
                        menus:[],
                        role_name:''
                    }
                }
            // noinspection JSAnnotator
            onSelect = (selectedKeys: React.Key[], info: any) => {
                console.log('selected', selectedKeys, info);
            }

            // noinspection JSAnnotator
            onCheck = (checkedKeys: React.Key[], info: any) => {
                this.setState({
                   menus:checkedKeys
                })
                console.log('onCheck', checkedKeys, info);
            }

            //将改变后的role数据传递给父组件
            getRoleUpdate=()=>{
                return StorageUtils.getRole("role_key");
            }
            removeRoleData=()=>{
                return StorageUtils.removeRole();
            }
            //获取input的属性
            getInputName=(e)=>{
                console.log(e.target.value)
            }

            //获取当前角色id
            getRoleid=()=>{
               const {roleid}=this.props.role
                console.log("role_id=============="+roleid);
                return roleid;
            }


            //接受到新的属性时调用
            componentWillReceiveProps(nextProps){
                const menu=  nextProps.role.menu
                console.log("componentWillReceiveProps++++++++++++++++++"+menu);
                this.setState({
                    menus:menu
                })
            }
            /**
             * 组件将要挂载时触发的函数：componentWillMount
             * 组件挂载完成时触发的函数：componentDidMount
             * 是否要更新数据时触发的函数：shouldComponentUpdate
             * 将要更新数据时触发的函数：componentWillUpdate
             * 数据更新完成时触发的函数：componentDidUpdate
             * 组件将要销毁时触发的函数：componentWillUnmount
             * @param props
             */
            //rander之后数据更新将之前赋值的数据全部清空
            componentDidUpdate(){
                StorageUtils.saveRole(this.state.menus)
                this.state.menus=[]
            }
            render(){
                const {role} = this.props
                const {role_name,menu} = role
                if(this.state.menus.length ==0){
                      this.state.menus=menu
                }
                this.state.role_name=role_name
                const formItemLayout = {
                    labelCol: {
                        xs: {span: 2},
                        sm: {span: 5},
                    },//左侧label的宽度
                    wrapperCol: {
                        xs: {span: 2},
                        sm: {span: 8},
                    },//制定右侧包裹的宽度
                };
                return (
                    <Form>
                        <Item
                              rules={[{required: true, message: '必须输入角色名称!'}]}
                              label="设置用户角色"
                              {...formItemLayout}>
                            <Input value={this.state.role_name} onChange={this.getInputName}/>
                        </Item>,
                        <Item>
                            <Tree
                                checkable
                                defaultExpandAll={true}
                              //  defaultExpandedKeys={this.state.menus}
                              //  defaultCheckedKeys={this.state.menus}
                                checkedKeys={this.state.menus}
                               // selectable={true}
                               // checkStrictly={true}
                                onCheck={this.onCheck}
                                treeData={List}
                            />
                        </Item>
                    </Form>
                )
            }

}

