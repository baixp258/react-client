/**
 * 商品分类路由
 * */
import  React,{Component} from 'react'
import {Redirect,Route,Switch} from 'react-router-dom'
import Home from "./home";
import Detail from "./detail";
import ProductAddUpdate from "./addupdate";
export default class Product extends  Component{


    render(){

        return(
            <div>
                <Switch>
                    <Route path='/product' component={Home} exact></Route>
                    <Route path='/product/add-update' component={ProductAddUpdate}></Route>
                    <Route path='/product/detail' component={Detail}></Route>
                    <Route path='/product/addupdate' component={ProductAddUpdate}></Route>
                    <Redirect to='/product'/>
                </Switch>
            </div>
        )

    }


}