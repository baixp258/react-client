/**
 * 首页
 * */
import  React,{Component} from 'react'
import {Button,Card,Steps,DatePicker,Space,Statistic,Modal} from 'antd'
import './home.less'
import moment from 'moment';
import ReactECharts from 'echarts-for-react';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import {getVisitNum,getSalesNum} from '../../api'
const { Step } = Steps;
const dateFormat = 'YYYY/MM/DD';
const { RangePicker } = DatePicker;
export default class Home extends  Component{


    state = {
        current: 0,
        visitdata:[],
        currentTime:'',
        salsedata:[]
    };

    //日期回调
    // noinspection JSAnnotator
    onOpenChange=(dates: [moment], dateStrings: [string])=>{

        this.setState({currentTime:dateStrings})
     //   console.log(dateStrings);
    }


    //获取图表数据
    getLineOption=()=>{
        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Direct',
                    type: 'line',
                    barWidth: '60%',
                    data: [10, 52, 200, 334, 390, 330, 220]
                }
            ]
        }
    }

    //获取图表数据
    getOption=()=>{

        if(Object.keys(this.state.visitdata).length===2){
            return {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['当前访问量', '历史访问量'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'Direct',
                        type: 'bar',
                        barWidth: '60%',
                        data: this.state.visitdata
                    }
                ]
            }
        }else{
            return {
                title:{
                    text:'销量榜单'
                },
                tooltip:{},
                legend:{
                    data:['销量','库存']
                },
                xAxis: {
                    type: 'category',
                    data: this.state.salsedata[0]
                },
                yAxis: {
                },
                series: [
                    {
                        name:'销量',
                        type:'bar',
                        data: this.state.salsedata[1],
                    },{
                        name:'库存',
                        type:'bar',
                        data: this.state.salsedata[2],
                    }
                ]
            }

        }

    }
    onChange = (current) => {
        console.log('onChange:', current);
        this.setState({ current });
    };

    getVisitNum=async()=>{
        const {currentTime} =this.state
       const result=await getVisitNum(currentTime);
       if(result.code="0000"){
           console.log(result.data)
           this.setState({
               visitdata:result.data,
               salsedata:[]
           })
       }
    }

    getSellNum=async ()=>{
       const result=await getSalesNum()
        if(result.code==="0000"){
           console.log(result.data)
            this.setState({
               salsedata:result.data,
                visitdata:[]
           })
        }

    }

    render(){
        const {current} = this.state;
      const title=(
        <div>
            <Button onClick={this.getVisitNum}>访问量</Button>
            <DatePicker defaultValue={moment('2021/01/01', dateFormat)} format={dateFormat} onChange={this.onOpenChange}/>
            <Button onClick={this.getSellNum}>销量</Button>
             <RangePicker
                defaultValue={[moment('2021/01/01', dateFormat), moment('2021/01/01', dateFormat)]}
                format={dateFormat}  onChange={this.onOpenChange}/>
        </div>

      )

        return(

            <div className='home'>
                <div className='quarter-div'>
                    <Card>
                        <Statistic
                            title="Active"
                            value={11.28}
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                            suffix="%"
                        />
                    </Card>
                    <Card>
                        <Statistic
                            title="Active"
                            value={11.28}
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                            suffix="%"
                        />
                    </Card>
                </div>
                <div className='quarter-line'>
                    <Card >
                        <ReactECharts option={this.getLineOption()} />
                    </Card>
                </div>
                    <Card className='quter-card' title={title}>
                    <div className='quarter-bar'>
                        <Card>
                                <ReactECharts option={this.getOption()} />
                        </Card>
                    </div>
                    <div className='quter-text'>
                        <Card  >
                            <Steps current={current} onChange={this.onChange} direction="vertical" responsive={true}>
                                <Step title="需求分析" description="This is a description." />
                                <Step title="代码开发" description="This is a description." />
                                <Step title="上线" description="2021-11-30" />
                            </Steps>
                        </Card>
                    </div>
                    </Card>

            </div>
        )

    }


}