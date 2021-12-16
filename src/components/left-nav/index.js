/*
左侧导航组件
 */
import  React,{Component} from 'react'
import './index.less'
import logo from '../../assets/images/logo.png'
import {Link,withRouter} from 'react-router-dom'
import { Menu } from 'antd';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';
import menuList  from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
//redux的实现
import {connect} from 'react-redux'
import {setHeadTitle} from '../../redux/actions'
const { SubMenu } = Menu;
class leftNav extends  Component {


    /**
     * 判断当前登录用户对item是否有权限
     */
    hasAuth=(item)=>{
        const {key,isPublic}=item
      //  const menus=memoryUtils.user.menu
        //redux获取menu菜单
        const menus= this.props.user.menu
       // const username=memoryUtils.user.username
        //redux获取user中username
        const username=this.props.user.username
        /**
         * 1.如果是当前登录用户admin
         * 2.如果当前item是公开的
         * 3.判断当前用户此item权限：key有没有在menus中  (menus菜单显示是根据menusList中key显示)
          */
        if(username=='admin' || isPublic ||menus.indexOf(key)!==-1){
            return true
        }else if(item.children){
           //4.如果当前用户有此item的某个子item的权限 (!!表示强制转换成true)
          return  !!item.children.find(child=>menus.indexOf(child.key)!==-1)

        }else{
            return false
        }

    }


    /**
     * 根据menu的数据组生成对应的标签数组
     * 使用map+递归调用
     * @param menuList
     */
    getMenuNodes=(menuList)=>{
        const path=this.props.location.pathname;
        return menuList.map(item=>{


            //如果当前用户有item对应的权限，才需要显示对应的菜单项
            if(this.hasAuth(item)){

                //判断item是否是当前的item
                if(item.key===path || path.indexOf(item.key)===0){
                    //更新redux中的headerTitle
                    this.props.setHeadTitle(item.title);
                }
                /**
                 *  {
                 title:'首页',//菜单名称
                 key:'/home',//对应path
                icon:'/home',//图标名称
             },
                 */
                if(!item.children){
                    return (
                        <Menu.Item key={item.key} icon={<PieChartOutlined />}>
                            <Link to={item.key} onClick={()=>this.props.setHeadTitle(item.title)}>{item.title}</Link>
                        </Menu.Item>
                    )
                }else{

                    //查找一个与当前请求路径匹配的子Item
                    const cItem =item.children.find(cItem=>path.indexOf(cItem.key)===0)
                    //如果存在，说明当前的item的子列表需要打开
                    if(cItem){
                        this.openKey=item.key;
                    }
                    return(
                        <SubMenu key={item.key} icon={<MailOutlined />} title={item.title}>
                            {
                                this.getMenuNodes(item.children)
                            }
                        </SubMenu>
                    )
                }
            }


        })
    }
    /*
     *根据menu的数据组生成对应的标签数组
     * 使用reduce+递归调用
     */
    getReduceNodes=()=>{
        return menuList.reduce((pre,item)=>{
            //向pre添加<Menu.Item>
            if(!item.children){
                return (
                    <Menu.Item key={item.key} icon={<PieChartOutlined />}>
                        <Link to={item.key}>{item.title}</Link>
                    </Menu.Item>
                )
            }else{
                pre.push(
                    <SubMenu key={item.key} icon={<MailOutlined />} title={item.title}>
                        {
                            this.getMenuNodes(item.children)
                        }
                    </SubMenu>
                )
            }
            return pre
        },[])
    }

   /*
     react的生命周期函数
     在第一次render()之前执行一次
     为第一个render()准备数据(必须同步)
   */
   componentWillMount(){
      this.menuNodes= this.getMenuNodes(menuList);
   }
    render() {

        //得到当前请求的路由路径
        let path=this.props.location.pathname;
        console.log('render()',path)
        if(path.indexOf('/product')===0){
            path='/product';
        }
        //得到需要的打开菜单的key
        const  openKey=this.openKey;
       // alert(openKey)
        return <div className='left-nav'>
            <Link to='/' className='left-nav-header'>
                <img src={logo} alt="logo"/>
                 <h1>硅谷后台</h1>
            </Link>
            <Menu
                mode="inline"
                theme="dark"
                defaultOpenKeys={[openKey]} //默认选中子选项
              // defaultSelectedKeys={[path]}
                selectedKeys={[path]} //选中选项
            >
                {
                    this.menuNodes
                }
                {/* <Menu.Item key="/home" icon={<PieChartOutlined />}>
                    <Link to='/home'>首页</Link>
                </Menu.Item>
                <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
                    <Menu.Item key="/category">
                        <Link to='/category'>
                            {<MailOutlined />}
                            <span>商品类别</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/product">
                        <Link to='/product'>
                            {<MailOutlined />}
                            <span>商品管理</span>
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key="/user" icon={<PieChartOutlined />}>
                    <Link to='/user'>用户管理</Link>
                </Menu.Item>
                <Menu.Item key="/role" icon={<PieChartOutlined />}>
                    <Link to='/role'>角色管理</Link>
                </Menu.Item> */
                }
            </Menu>
        </div>

    }
}

/**
 * withRouter高阶组件
 *  包装费路由组件，返回一个新的组件
 *  新的组件向非路由组件传递3个属性：history/location/match
 */

//export default withRouter(leftNav)
//redux实现方法
export default connect(
    state=>({user:state.user}),
    {setHeadTitle}
)(withRouter(leftNav))
