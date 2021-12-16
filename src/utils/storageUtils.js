/*
进行loacl数据存储管理的工具模块
 */
import store from 'store'
const USER_KEY='user_key';
const CATEGORY_KEY="category_key";
const CATEGORYCHILDREN_KEY="categorychild_key";
const ROLE_KEY='role_key'
export  default {

    //保存user
    saveUser(user){
      //  localStorage.setItem(USER_KEY,JSON.stringify(user));
        store.set(USER_KEY,user);
    },

    //读取user
     getUser(){
       // return JSON.parse(localStorage.getItem(USER_KEY) || '{}');
         return store.get(USER_KEY) || {};
     },
    //删除user
    removeUser(){
        //localStorage.removeItem(USER_KEY);
        store.remove(USER_KEY);
    },
    //保存category
    saveCategory(category){
        store.set(CATEGORY_KEY,category);
    },
    //读取category
    getCategory(category){
        store.get(CATEGORY_KEY,category);
    },
    //删除category
    removeCategory(category){
        store.remove(CATEGORY_KEY,category);
    },
    //保存categoryChildren
    saveCategoryChildren(category){
        store.set(CATEGORYCHILDREN_KEY,category);
    },
    //保存categoryChildren
    getCategoryChildren(category){
        store.get(CATEGORYCHILDREN_KEY,category);
    },
    //保存categoryChildren
    removeCategoryChildren(category){
        store.remove(CATEGORYCHILDREN_KEY,category);
    },
    //保存role更新数据
    saveRole(role){
        store.set(ROLE_KEY,role);
    },
    //获取role更新数据
    getRole(){
        return store.get(ROLE_KEY) || {};
    },
    //删除role数据
    removeRole(){
        store.remove(ROLE_KEY);
    },


}