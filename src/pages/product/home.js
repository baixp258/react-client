/**
 * 商品分类路由
 * */
import  React,{Component} from 'react'
import {
    Card,
    Table,
    Select,
    message,
    Input,
    Space,
    Button
} from 'antd'
import {reqProductLimit,reqProductLimitAndCondition,updateProductStatus} from '../../api'
import {PAGE_SIZE} from '../../utils/contants'
const Option=Select.Option;

export default class Home extends  Component{

    state = {
        total:0,//商品的总数量
        products:[], //商品的数组
        loading:false,
        searchName:'',//商品名称
        searchType:'productName'//商品类型
    }

     updateStatus=async (id,status)=>{
        const result=await updateProductStatus(id,status);
        console.log(result)
        if(result.code==="0000"){
            message.success("更新成功");
            this.getProducts(this.pageNum);
        }
    }

    initColumns = () =>{
         this.columns = [
            {
                title: '商品名称',
                dataIndex: 'pname',
            },
            {
                title: '商品描述',
                dataIndex: 'pdesc',
            },
             {
                 title: '价格',
                 dataIndex: 'price',
                 render: (price) => '¥ ' + price//当前制定了对应的属性，传入的是对应的属性值
             },
             {
                 title: '状态',
                 width: 100,
                /* dataIndex: 'status',*/
                 render: (product) => {
                     const {status,id}=product
                     const newStatus=status===1 ? 2 : 1
                     return(
                         <span>
                             <Button type='primary' onClick={()=> this.updateStatus(id,newStatus)}>{status===1? "上架":"下架"}</Button>
                             <span>{status === 1 ? "在售":"已下架"}</span>
                         </span>
                     )
                 }
             },
             {
                 title: '操作',
                 width: 200,
                 render: (product) => (//render中的cotegory相当于对象，通过点击事件将对象传入，获取父parentId值
                     <Space  size="middle">
                         {/*将product对象使用state传递改目标路由组件*/}
                         <a onClick={()=> this.props.history.push('/product/detail',product)}>详情</a>
                         <a onClick={()=>this.props.history.push('/product/addupdate',product)}>修改</a>
                     </Space>
                 )}
        ];
    }

    //根据分页获取产品列表数据
    getProducts = async (pageNum)=>{
        this.pageNum=pageNum
        const {searchName,searchType}=this.state;
        this.setState({loading:true})//显示loading
        let result
        //searchName不为null条件带分页查询
        if(searchName){
             result=await  reqProductLimitAndCondition(pageNum-1,PAGE_SIZE,searchName,searchType);
             console.log(result.data)
        }else {
             result=await  reqProductLimit(pageNum-1,PAGE_SIZE)
        }
        this.setState({loading:false})//隐藏loading
      if(result.code==="0000"){
          const products=result.data.content
          const total=result.data.totalElements
          this.setState({
              total,
              products
          })
      }
    }

    componentWillMount(){
        this.initColumns();
   }

    componentDidMount(){
        this.getProducts(1)
    }

    render(){

        const {products,total,loading,searchType,searchName}=this.state;


      const title=(
           <span>
                <Select value={searchType}
                        style={{width:150}}
                        onChange={value=>this.setState({searchType:value})}>
                <Option value='productName'>按名称搜索</Option>
                <Option value='productDesc'>按描述搜索</Option>
            </Select>
               <Input placeholder="请输入参数"
                      style={{width:150,margin: '0 15px'}}
                      value={searchName}
                      onChange={event=>this.setState({searchName:event.target.value})}/>
               <Button type='primary'  onClick={()=>this.getProducts(1)}>搜索</Button>
           </span>
        )
        const extra=(
            <Button type='primary' onClick={()=>this.props.history.push('/product/addupdate')}>添加商品</Button>
        )
        return(
          <Card title={title} extra={extra}>
              <Table
                  rowKey="id"
                  bordered
                  dataSource={products}
                  columns={this.columns}
                  pagination={{
                      total,
                      loading:loading,
                      defaultPageSize:PAGE_SIZE,
                      showQuickJumper:true,
                      onChange:(pageNum)=>{this.getProducts(pageNum)}
                      }}
                  />;
          </Card>
        )

    }


}