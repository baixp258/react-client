/*
左侧导航组件
 */
import  React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import menuList  from '../../config/menuConfig'
import './index.less'
import tq from './img/tq.jpg'
import {formateDate} from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import {reqTQ} from '../../api/index'
import {Modal} from 'antd'
import storageUtils from "../../utils/storageUtils";
import LinkButton from '../linkbutton/index'
//用redux实现title的动态显示
import {connect} from 'react-redux'
import {loginOut} from '../../redux/actions'
class Header extends  Component {

    state={
        currentTime: formateDate(Date.now()),//当前时间
        wea: '',//天气的文本
    }

    getTitle=()=>{
        //得到当前的请求路径
        const path=this.props.location.pathname;
        let title;
        menuList.forEach(item=>{
            //判断当前key是否等于当前路径
            if(item.key===path){
                title=item.title;
                //判断当前的item是否包含children
            }else if(item.children){
                //如果包含获取children中key跟当前路径判断是否相等
                const cItem=item.children.find(cItem=> path.indexOf(cItem.key)===0)
                if(cItem){
                    title=cItem.title;
                }
            }
        })
        return title
    }



    //获取当前时间
    getTime=()=>{
        //每隔1s获取当前时间，并更新状态数据currentTime
       this.intervalId= setInterval(()=>{
           const currentTime= formateDate(Date.now())
            this.setState({currentTime})
        },1000)
    }
    //获取当前天气显示
    getWeather= async ()=>{
        //调用接口实现
      //  const wea =await reqTQ("北京");
        const wea ="晴"
       // alert(wea);
        this.setState({wea})
    }


    /*
    第一次render之后执行一次
    一般在此执行异步操作：发ajax请求/启动定时器
     */
    componentDidMount(){
        // 启动定时器
        this.getTime()
        //定时更新天气
        this.getWeather()
    }

    //退出登录
    logout=()=>{
        Modal.confirm({
            content: '确定退出吗？',
            onOk:()=> {
               /* //退出当前用户并清除缓冲和内存中数据
                storageUtils.removeUser();
                memoryUtils.user={};*/
               this.props.loginOut();
                //跳到首页
                this.props.history.replace('/login');
                console.log('OK');
            }
        })
    }
   /*
   当组件卸载之前调用
    */
   componentWillUnmount(){
       //清楚定时器
       clearInterval(this.intervalId)
   }

    render() {
        //获取当前时间和天气情况
        const {currentTime,wea}=this.state;
        //获取当前用户信息
      //  const username=memoryUtils.user.username;
        //redux获取user中name
        const username=this.props.user.username
        //动态获取页面显示
     //  const title=this.getTitle();
     const title= this.props.headTitle
        return(
            <div className='header'>
                <div className="header-top">
                  <span>欢迎 {username}</span>
                  <LinkButton href="javascript" onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                     <div className="header-bottom-left">{title}</div>
                     <div className="header-bottom-right">
                         <span>{currentTime}</span>
                         <img src={tq} alt="tq"/>
                         <span>{wea}</span>
                     </div>
                </div>
            </div>
        )

    }
}
//export default withRouter(Header)
//用redux方式实现
export default connect(
    //函数用于显示
    state=>({headTitle:state.headTitle,user:state.user}),
    //对象用于更新
    {loginOut}
)(withRouter(Header))