import React,{Component} from 'react';


import PropTypes from 'prop-types';



class A extends Component{

    static childContextTypes ={
        name:PropTypes.string
    }

    state={
        name:'源码时代'
    }

    getChildContext(){
        return{name:this.state.name}
    }
    render(){
        return(
            <div className='App'>
                这是爷爷组件
                <Fuqin name={this.state.name}/>
            </div>
        )
    }

}
class B extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return(
            <div>
                <div className='footer'>
                    <Erzi name={this.props.name}/>
                    这是父亲组件
                    <p className='p'>{this.props.name}</p>是通过props组父组件拿到的值
                </div>
            </div>
        )
    }
}
class C extends Component{

    static contextTypes ={
        name:PropTypes.string
    }


    render(){
        return(
            <div>

                <div className='footer'>
                    <p>这是孙子组件</p>
                    <p className='p'>
                        {this.props.name}
                    </p>
                    这是从爷爷组件一级一级传递下来的
                    <p className='p'>
                        {this.context.name}
                    </p>
                    ---直接经过context拿到爷爷组建中的值
                </div>
            </div>
        )
    }
}


