/*
 * redux库主模块
 * 1）redux库向外暴露下面几个函数：
 * createStore():接收参数为reducer函数，返回store对象
 * combineReducers():接收包含n个reducer方法的对象，返回一个新的reducer函数
 * applyMiddleware()：暂时不用
 * 2）store对象内部结构：
 * getState():返回值为内部保存的state数据
 * dispatch():参数为action对象
 * subscribe():参数为监听内部state更新的回调函数
 */
/**
 * 根据指定的reducer函数创建一个store对象函数返回
 */

export function createStore(reducer) {
   //用来存储内部状态数据的变量，初始值为调用reducer函数的返回的结果（外部指定的默认值）
    let state=reducer(undefined,{type:'@@redux/init'})
    //用来存储监听state更新回调函数的数组容器
    const listeners=[]

    /**
     * 返回当前内部state数据
     */
    function getState() {
        return state
    }

    /**
     *分发action
     * 1）触发reducer调用，
     * 2）产生新的state
     * 3）调用所有已存在的监视回调函数
     */
    function dispatch(action) {
        //触发reducer调用,得到新的state
        const newState=reducer(state,action)
        //保存新的state
        state=newState
        //调用所有自己存在的监视回调函数
        listeners.forEach(listener=>listener())

    }
    /*
     绑定内部state改变的监听回调
     */
    function subscribe(listener) {
        // 保存到lisner容器中
        listeners.push(listener)
    }

    //返回stroe
    return {
        getState,
        dispatch,
        subscribe
    }
}


/*
 整合传入参数对象中的多个reducer函数，返回一个新的reducer
 新的reducer管理的总状态：{r1：state1，r2：state2}
 */
export function combineReducers1(reducers) {

    //1.返回一个新的总redcer函数
    //2.totalState：总状态
    //3. Object.key(reducers)就是等同于[conut,user]
    const totalState={}
    return (state={},action)=>{
        //执行reducer中每个reducer函数得到一个新的子状态，并封装一个对象容器中
        Object.keys(reducers).forEach(key=>{
            //通过key获取reducer对应的函数传入state，action获取新的state，并接受
           totalState[key] =reducers[key](state[key],action)
        })
        return totalState
    }
}

export function combineReducers(reducers) {
    return (state={},action)=>{
        return Object.keys(reducers).reduce((totalState,key)=>{
           totalState[key]= reducers[key](state[key],action)
            return totalState
        },{})
    }
}