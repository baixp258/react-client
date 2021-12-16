/**
 * 饼状图
 *
 */
import  React,{Component} from 'react'
import {Button,Card} from 'antd'
import ReactECharts from 'echarts-for-react';
var ROOT_PATH =
    'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';
const weatherIcons = {
    Sunny: ROOT_PATH + '/data/asset/img/weather/sunny_128.png',
    Cloudy: ROOT_PATH + '/data/asset/img/weather/cloudy_128.png',
    Showers: ROOT_PATH + '/data/asset/img/weather/showers_128.png'
};
export default class Pie extends  Component{

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
            title: {
                text: 'Weather Statistics',
                subtext: 'Fake Data',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                bottom: 10,
                left: 'center',
                data: ['CityA', 'CityB', 'CityD', 'CityC', 'CityE']
            },
            series: [
                {
                    type: 'pie',
                    radius: '65%',
                    center: ['50%', '50%'],
                    selectedMode: 'single',
                    data: [
                        {
                            value: 1548,
                            name: 'CityE',
                            label: {
                                formatter: [
                                    '{title|{b}}{abg|}',
                                    '  {weatherHead|Weather}{valueHead|Days}{rateHead|Percent}',
                                    '{hr|}',
                                    '  {Sunny|}{value|202}{rate|55.3%}',
                                    '  {Cloudy|}{value|142}{rate|38.9%}',
                                    '  {Showers|}{value|21}{rate|5.8%}'
                                ].join('\n'),
                                backgroundColor: '#eee',
                                borderColor: '#777',
                                borderWidth: 1,
                                borderRadius: 4,
                                rich: {
                                    title: {
                                        color: '#eee',
                                        align: 'center'
                                    },
                                    abg: {
                                        backgroundColor: '#333',
                                        width: '100%',
                                        align: 'right',
                                        height: 25,
                                        borderRadius: [4, 4, 0, 0]
                                    },
                                    Sunny: {
                                        height: 30,
                                        align: 'left',
                                        backgroundColor: {
                                            image: weatherIcons.Sunny
                                        }
                                    },
                                    Cloudy: {
                                        height: 30,
                                        align: 'left',
                                        backgroundColor: {
                                            image: weatherIcons.Cloudy
                                        }
                                    },
                                    Showers: {
                                        height: 30,
                                        align: 'left',
                                        backgroundColor: {
                                            image: weatherIcons.Showers
                                        }
                                    },
                                    weatherHead: {
                                        color: '#333',
                                        height: 24,
                                        align: 'left'
                                    },
                                    hr: {
                                        borderColor: '#777',
                                        width: '100%',
                                        borderWidth: 0.5,
                                        height: 0
                                    },
                                    value: {
                                        width: 20,
                                        padding: [0, 20, 0, 30],
                                        align: 'left'
                                    },
                                    valueHead: {
                                        color: '#333',
                                        width: 20,
                                        padding: [0, 20, 0, 30],
                                        align: 'center'
                                    },
                                    rate: {
                                        width: 40,
                                        align: 'right',
                                        padding: [0, 10, 0, 0]
                                    },
                                    rateHead: {
                                        color: '#333',
                                        width: 40,
                                        align: 'center',
                                        padding: [0, 10, 0, 0]
                                    }
                                }
                            }
                        },
                        { value: 735, name: 'CityC' },
                        { value: 510, name: 'CityD' },
                        { value: 434, name: 'CityB' },
                        { value: 335, name: 'CityA' }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]

        }

    }

    setOption=()=>{
        return{
            title: {
                text: 'Customized Pie',
                left: 'center',
                top: 20,
                textStyle: {
                    color: '#ccc'
                }
            },
            tooltip: {
                trigger: 'item'
            },
            visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '90%',
                    center: ['50%', '50%'],
                    data: [
                        { value: 335, name: 'Direct' },
                        { value: 310, name: 'Email' },
                        { value: 274, name: 'Union Ads' },
                        { value: 235, name: 'Video Ads' },
                        { value: 400, name: 'Search Engine' }
                    ].sort(function (a, b) {
                        return a.value - b.value;
                    }),
                    roseType: 'radius',
                    label: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    labelLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    },
                    itemStyle: {
                        color: '#c23531',
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
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
                <Card title='饼状图一'>
                    <ReactECharts option={this.getOption()} />
                </Card>
                <Card title='饼状图二'>
                    <ReactECharts option={this.setOption()} />
                </Card>
            </div>
        )

    }


}