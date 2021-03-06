/*
 react-redux库的主模块
 1）react-redux向外暴露了2个API
  a.provider组件类
  b.connect函数
 2）.Provider组件
    接收store属性
    让所有容器组件都可以看到store，从而通过store读取/更新状态
 3）.connect函数
   接受俩个参数：mapStateToProps和mapDispatchToProps
   mapStateToProps:为一个函数，用来指定UI组件传递哪些一般属性
   mapDispatchProps:为一个函数或对象，用来指定向UI组件传递哪些函数属性
   connect（）执行的返回值为高阶组件UI，返回一个新的容器组件，容器组件会向UI传入前面指定的一般/函数类型属性
 */
import React,{Component} from 'react'
import PropTypes from 'prop-types'
export  class Provider extends Component{

    //接收store对象
    static propTypes={
        store: PropTypes.object.isRequired
    }


    //声明提供的context的数据名称和类型
    static childContextTypes ={
        store:PropTypes.object
    }

    //向所有有声明子组件提供包含要传递数据的context对象
    getChildContext(){
        return {
            store:this.props.store
        }
    }

    render(){
        return this.props.children

    }
}

/*
  connect高阶函数：接收mapStateProps和mapDispatchToPtops俩个参数，返回一个高阶函数：结束
  一个UI组件容器，返回一个容器组件
 */
export function connect(mapStateProps,mapDispatchToPtops) {
    //返回一个高阶组件函数
    return (UIcomponent)=>{

        //返回容器组件
        return class ContainerComponent extends Component {

            //声明接收的context数据的名称和类型
            static contextTypes={
                store:PropTypes.object
            }

            constructor(props,context){
                super(props)
                console.log('ContainerComponent constructor()',context.store)
                //得到store
                const {store} =context
                //得到包含所有一般属性的对象
                const stateProps=mapStateProps(store.getState())
               //将所有的一般的属性作为容器的状态数据
                this.state=stateProps
                let dispatchProps
                //得到所有包含函数属性的对象
                if(typeof mapDispatchToPtops==="function"){
                     dispatchProps=mapDispatchToPtops(store.dispatch)
                }else{
                    dispatchProps= Object.keys(mapDispatchToPtops).reduce((pre,key)=>{
                        const actionCreator=mapDispatchToPtops[key]
                        //参数透传
                        pre[key]=(...args)=>store.dispatch(actionCreator(...args))
                        return pre
                    },{})
                }

                //保存到组件上
                this.dispatchProps=dispatchProps

                //绑定store的state事件监听的变化
                store.subscribe(()=>{//store内部的状态数据发生变化
                    //更新容器组件==>UI组件更新
                    this.setState({...mapStateProps(store.getState())})
                })
            }





            render(){
                //返回UI组件的标签
                return <UIcomponent {...this.state} {...this.dispatchProps}/>
            }

        }
    }
}