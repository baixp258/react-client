/**
 * 主页面
 * */
import  React,{Component} from 'react'
import memoryUtils from "../../utils/memoryUtils";
import {Redirect,Route,Switch} from 'react-router-dom'
import { Layout } from 'antd';
import Index  from '../../components/head-nav/index'
import LeftNav from '../../components/left-nav/index'
import Home from '../home/home'
import Product from '../product/product'
import User from '../user/user'
import Role from '../role/role'
import Category from '../category/category'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import SetState1 from '../../test/setstate1'
import SetState2 from '../../test/setstate2'
import ShouldComponentUpdate from '../../test/shouldcomponentupdate'
import ReduxTest from '../../test/reduxtest'
import {connect} from 'react-redux'
/*import Redux from '../../test/indux/redux'*/
const {  Footer, Sider, Content } = Layout;
class Admin extends  Component{

    render(){
        //获取内存中存放的user
     //  const user=memoryUtils.user;
        //redux代替
        const user=this.props.user
        console.log("user--------"+user)
        if(!user || !user.userid) {
            //自动跳转到登录（render()中）
            return <Redirect to='/login'/>
        }
        return(
            <Layout style={{minHeight:'100%'}}>

                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Index>Header</Index>
                    <Content style={{margin: 20,backgroundColor:'#fff'}}>
                        <Switch>
                            <Route path='/home' component={Home}></Route>
                            <Route path='/product' component={Product}></Route>
                            <Route path='/user' component={User}></Route>
                            <Route path='/role' component={Role}></Route>
                            <Route path='/category' component={Category}></Route>
                            <Route path='/bar' component={Bar}></Route>
                            <Route path='/line' component={Line}></Route>
                            <Route path='/pie' component={Pie}></Route>
                            <Route path='/setstate1' component={SetState1}></Route>
                            <Route path='/setstate2' component={SetState2}></Route>
                            <Route path='/shouldcomponentupdate' component={ShouldComponentUpdate}></Route>
                            <Route path='/reduxtest' component={ReduxTest}></Route>
                            {/*  <Route path='/redux' component={Redux}></Route>*/}
                            <Redirect to='/home'/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center',color:'#ccc'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        )

    }


}

export default connect(
    state=>({user:state.user}),
    {}
)(Admin)
