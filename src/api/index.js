/*
要求：能根据接口文档定义接口请求
包含应用中所有接口函数的模块
函数的返回值是promise对象
 */
import ajax from './ajax'
import jsonp from 'jsonp'
import  axios from 'axios'
import {message} from "antd/lib/index";
//登录
/*
export function reqLogin(username,password) {
   return ajax('/login',{username,password},'POST');
}
 */
/*
export const reqLogin=(username,,password)=>ajax('/login',{username,password},'POST')
这种写法等同于{return }
export const reqLogin=(username,,password)=>{ return ajax('/login',{username,password},'POST')}
 */
export const reqLogin=(username,password)=>ajax('/login',{username,password},'POST')
//添加用户
export const reqAddUser=(user)=>ajax('/manage/user/add',user,'POST')

//调用天气预报
export const reqWeather=()=>ajax('https://v0.yiketianqi.com/api?unescape=1&version=v9&city="北京"&appid=35899939&appsecret=9h9O5liq',"",'GET')
/*
*jsonp请求的接口请求函数
 */
 export const reqTQ=(city)=>{
   /*  const url= 'https://v0.yiketianqi.com/api?unescape=1&version=v9&city="北京"&appid=35899939&appsecret=9h9O5liq';
     jsonp(url,{},(err,data)=>{
         console.log('jsonp()',err,data);
     })*/
     //自定义promise
     return new Promise((resolve,reject)=>{
         const url=`https://v0.yiketianqi.com/api?unescape=1&version=v9&city=${city}&appid=35899939&appsecret=9h9O5liq`;
         axios.get(url).then(function (response) {
                 console.log(response.data.data[0].wea);
                 //获取天气显示
                 const wea =response.data.data[0].wea;
                 resolve(wea)
             })
             .catch(function (error) {
                 console.log('请求异常'+error.message);
             })


     })
 }

/**
 *获取一级分类列表 GET 和POST请求
 */
export const reqCategorys=(parentId) => ajax('/manager/categoryList',{parentId},'GET')
export const reqCategorysPost=(parentId) => ajax('/manager/categoryList',{parentId},'POST')

/**
 *获取二级分类的列表
 */
export const reqCategoryChildrens=(parentId) => ajax('/manager/categoryChildRenList',{parentId},'POST')

/**
 * 添加一级分类列表
 */
export const reqCategoryAdd=(name,parentId) => ajax('/manager/categoryAdd',{name,parentId},'POST')

/**
 * 修改一级分类列表
 */
export const reqCategoryUpdate=(id,name) => ajax('/manager/categoryUpdate',{id,name},'POST')

/**
 * 用分页获取产品的列表信息
 */
export const reqProductLimit=(pageNum,pageSize)=>ajax('/manager/product/list/limit',{pageNum,pageSize},'GET')

/**
 * 分页带查询条件
 */
export const reqProductLimitAndCondition=(pageNum,pageSize,searchName,searchType)=>ajax('/manager/productList/limitAndCondition',{
    pageNum,
    pageSize,
    [searchType]:searchName},'GET')
/**
 * 产品获取父分类名称
 */
export const reqProductCategoryByParentId=(pcategoryId)=>ajax('http://localhost:8081/manager/findProductPcategoryByPId',{pcategoryId},'GET')

/**
*产品获取子类名称
*/
export const reqProductCategoryChildrenByParentId=(categoryId)=>ajax('/manager/findProductCategoryById',{categoryId},'GET')

/**
 *更新商品状态
 */
export const updateProductStatus=(id,status)=>ajax('/manager/updateProductStatusById',{id,status},'GET')

/**
 * 根据图片名称删除图片
 */
export const deleteImgByImgName=(imgName)=>ajax('http://localhost:8081/upload/deleteImg',{imgName},'GET')


/**
 * 添加商品
 */
export const addPorduct=(product)=>ajax('http://localhost:8081/manager/addProduct',product,'POST')

/**
 * 修改商品信息
 */
export const updateProduct=(product)=>ajax('http://localhost:8081/manager/updateProductById',product,'POST')


/**
 * 获取当前所有角色的列表
 */
export const reqRoleList=()=>ajax('http://localhost:8081/selectAllRoleAndPermission',{},'GET');

/**
 * 修改角色权限
 */
export const updateRole=(roleid,menu)=>ajax('http://localhost:8081/setRoleAndPermission',{roleid,menu},'POST')

/**
 * 查询当前用户列表
 */
export const selectUserRoleList=()=>ajax('http://localhost:8081/selectUserByLoginName',{},'GET');

/**
 * 根据当前用户id删除用户
 */
export const deleteUserByuserId=(userid)=>ajax("http://localhost:8081/deleteUserByUserid",{userid},'GET')

/**
 * 获取当前所有角色列表
 */
export const selectRolesList=()=>ajax("http://localhost:8081/selectAllSysRole",{},'GET')

/**
 * 添加用户
 */
export const addUser=(addUserRole)=>ajax("http://localhost:8081/addSysUser",addUserRole,'POST');

/**
 *修改用户和对应的角色关系
 */
export const updateUser=(addUserRole)=>ajax("http://localhost:8081/updateSysUser",addUserRole,'POST')
/**
 *添加角色
 */
export const addRole=(role)=>ajax("http://localhost:8081/addSysRole",role,"POST")

/**
 * 查询访问量
 */
export const getVisitNum=(currentTime)=>ajax(" http://localhost:8081/getStatisticsVisit",{currentTime},"GET")

/**
 * 查询商品信息 http://localhost:8081/salesVolumet
 */
export const getSalesNum=()=>ajax(" http://localhost:8081/salesVolumet",{},"GET")




/*
jsonp 解决ajax请求跨域问题
jsonp请求不是ajax请求，而是一般的得get请求
基本原理
   浏览器端:
       动态生成<script>来请求后台接口（src就是接口的url）
       定义好用于接受相应数据（fn），并将函数名通过请求参数提交给后台（如：callback=fn）
    服务器端：
       接受到请求处理产生结果数据后，返回一个函数调用的js代码，并将结果数据作为实参传入函数调用
    浏览器端：
       收到相应自动执行函数调用的js代码，也就执行了提前定义好的回调函数，也是得到需要结果。
 */