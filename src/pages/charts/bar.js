/**
 * 柱状图
 * */
import  React,{Component} from 'react'
import {Button,Card} from 'antd'
import ReactECharts from 'echarts-for-react';

export default class Bar extends  Component{

    state={
        sales:[30, 40, 15, 60, 80, 11, 13],
        stroes:[300, 400, 150, 600, 800, 110, 130]
    }
    //更新
    update=()=>{
        this.setState({
            sales:this.state.sales.map(sale=>sale+1),
            stroes:this.state.stroes.reduce((pre,store)=>{
                pre.push(store-1)
                return pre
            },[])
        })
    }

    //获取图表数据
    getOption=()=>{
        //解构销量和库存数据
        const {sales,stroes}=this.state
         return {
            title:{
              text:'ECharts入门示例'
            },
             tooltip:{},
             legend:{
                data:['销量','库存']
             },
             xAxis: {
                 type: 'category',
                 data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子', '帽子']
             },
             yAxis: {
             },
             series: [
                 {
                     name:'销量',
                     type:'bar',
                     data: sales,
                 },{
                     name:'库存',
                     type:'bar',
                     data: stroes,
                 }
                 ]
         }

    }

    render(){
        return(
           <div>
               <Card>
                   <Button type='primary' onClick={this.update}>更新</Button>
               </Card>
               <Card title='柱状图一'>
                   <ReactECharts option={this.getOption()} />
               </Card>
           </div>
        )

    }


}