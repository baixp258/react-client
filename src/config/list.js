/**
 *  
 * @type {*[]}
 */
const List=[

    {
        title: '授权页面',
        key: '0-0',
        children: [
            {
                title: '首页',
                key: '/home'
            },
            {
                title:'商品管理',
                key: '/product',
                children:[
                    {
                        title: (<span style={{color: '#1890ff',}}>品类管理</span>),
                        key: '/product/category',
                        
                    }, {
                        title: (<span style={{color: '#1890ff',}}>商品管理</span>),
                        key:'/product/product',
                    }
                ]
            },
            {
                title: '用户管理',
                key: '/user',
            },
            {
                title: '角色管理',
                key: '/role',
            },
            {
                title:'图形图标',
                key:'/charts',
                //icon:'/area-chart',
                children:[
                    {
                        title: (<span style={{color: '#1890ff',}}>柱形图</span>),
                        key:'/bar',
                        
                    },
                    {
                        title: (<span style={{color: '#1890ff',}}>折线图</span>),
                        key:'/line',
                        
                    },
                    {
                        title: (<span style={{color: '#1890ff',}}>饼状图</span>),
                        key:'/pie',
                    },
                ]
            }
        ],
    },
]

export default List
