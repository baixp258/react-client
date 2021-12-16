/**
 * 商品分类路由
 * */
import  React,{Component} from 'react'
import Icon from '@ant-design/icons';
import { Card ,Table,Button,message,Space,Modal,Input} from 'antd';
import {
    reqCategoryAdd,
    reqCategorys,
    reqCategorysPost,
    reqCategoryChildrens,
    reqCategoryUpdate,
    reqLogin
} from "../../api";
import linkButton from '../../components/linkbutton/index.less'
import AddFrom from './AddFrom'
import UpdateFrom from './UpdateFrom'
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import {Form, Select} from "antd/lib/index";
const Item=Form.Item
const Option =Select.Option;

export default class Category extends  Component{

    /**
     * 状态改变刷新
     * @returns {*}
     */
    state={
        cotegorys:[],//一级分类列表
        loading:false,
        parendId:"0",
        parentName:"",
        categoryChildrens:[],
        isModalVisible:"0", //1显示添加 ，2显示修改 ，0不显示
        cotegory:{
            id:'',
            name:''
        },
        updatename:'',//接受修改的参数值
        addname:'',//获取添加数据
        addid:'',//添加id
        addParentId:''//添加的父id
    }

    /*
      初始化所有列的数组
     */
    initColumns=()=>{
       this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                width: 300,
                render: (cotegory) => (//render中的cotegory相当于对象，通过点击事件将对象传入，获取父parentId值
                    <Space  size="middle">
                        <a onClick={()=>{this.showUpdateCategory(cotegory)}}>修改分类</a>
                        {this.state.parendId==="0"? <a onClick={() => {this.showCategoryChildred(cotegory)}}>查看子分类</a>:null}
                    </Space>
                )}
        ];
    }
    getCotegory = async()=>{
        //设置页面加载
        this.setState({
            loading:true
        })
        //调用一级列表接口
        const result =await reqCategorysPost("0");
        this.setState({
            loading:false
        })
       // console.log(result);
        if(result.code==="0000"){
            const cotegorys=result.data;
            memoryUtils.category=cotegorys;
            storageUtils.saveCategory(cotegorys);
            console.log(cotegorys);
            this.setState({
                cotegorys
            })
        }else{
            message.error('获取一级列表分类异常');
        }
    }

    //第一次render准备数据
    componentWillMount(){
        //调用初始化列参数
      this.initColumns();
    }
    /*
      执行异步任务：发异步ajax请求
     */
    componentDidMount(){
        this.getCotegory();
    }
    /*
      获取二级分类的列表
     */
    showCategoryChildred = async (cotegory)=>{
       const reutlt=await reqCategoryChildrens(cotegory.id);
       if(reutlt.code==="0000"){
           this.setState({
               categoryChildrens:reutlt.data,
               parendId:reutlt.data.parendId,
               parentName:cotegory.name
           })
           memoryUtils.categoryChildrens=this.state.categoryChildrens;
           storageUtils.saveCategoryChildren(this.state.categoryChildrens);
       }else{
           message.error("二级分类列表显示异常");
       }

    }

    /*
     点击一级列表返回
     */
    showCatgroy=()=>{
        this.setState({
            parendId:'0',
            parentName:"",
            categoryChildrens:[]
        })
    }

    /**
     * 点击添加
     */
    addCategory=()=>{
        this.setState({
            isModalVisible:1
        })
    }


    /**
     * 点击修改
     */
    showUpdateCategory= (cotegory)=> {
        this.setState({
            cotegory: {
                id:cotegory.id,
                name: cotegory.name
            },
            isModalVisible:2
        })

    }
     /*
         点击确认修改
         设计到将Input表单修改后的数据，用onChange事件获取到，
      */
     updateCatrgory= async ()=>{

         //1.隐藏确定框
        this.setState({
             isModalVisible:0
         })
        // alert(this.state.updatename+'--->'+this.state.cotegory.id)
         //2.发请求更新列表
         const resultCategory=await reqCategoryUpdate(this.state.cotegory.id,this.state.updatename);
         if(resultCategory.code==="0000"){
             //3.重新显示列表
             this.getCotegory();
         }
     }

    // 获取修改的input框的内容
    getUpdateFromData  = (e) => {
        console.log(e.target.value);
        this.setState({
            updatename:e.target.value
        })
    }
    /*
    获取添加的input框内容
     */
    getAddFromData=(e)=>{
        console.log(e.target.value);
       this.setState({
           addname:e.target.value
       })

    }
    /*
     添加
     */
    handleOk= async() =>{
        console.log(this.state.addid+'----'+this.state.addname+'----'+this.state.parendId);
        this.setState({
            isModalVisible:0
        })
        if(this.state.parendId==="0"){
            const resultass=await  reqCategoryAdd(this.state.addname,this.state.parendId);
            console.log(resultass)
        }else{
            const resultass=await  reqCategoryAdd(this.state.addname,this.state.addid);
            console.log(resultass)
        }


    }

    handleChange=(value)=> {
        this.state.cotegorys.map((data,key)=> {
            if(data.id===value){
                this.setState({
                    parendId:data.parendId,
                    addid:data.id
                })
            }

        })

    }

    /*
      修改
     */
    handleCancel=()=>{
        this.setState({
            isModalVisible:0
        })
    }


    render(){
       const {cotegorys,parendId,categoryChildrens,isModalVisible}=this.state;
       const id= ''
       const parnetId=''
        //card左侧标题
        const title =parendId=="0"? '一级分类列表':(
            <span>
                <Button className='linkButton' onClick={this.showCatgroy}>一级分类列表 --> </Button>
               <Icon type='DoubleRightOutlined' style={{marginRight: 5}}></Icon>
                <span>{this.state.parentName}</span>
            </span>
        )
        //card的右侧
        const extra=(
            <Button type='primary' onClick={this.addCategory}>
                <Icon type='plus'/>
                添加
            </Button>
        )

        return(
            <Card title={title} extra={extra}>
                <Table
                    dataSource={parendId=="0"? this.state.cotegorys:categoryChildrens}
                    loading={this.state.loading}
                    bordered={true}
                    columns={this.columns}
                    pagination={{defaultPageSize:3,showQuickJumper:true}} />;

                <Modal title="添加内容" visible={isModalVisible==1} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <Form.Item>
                        <Select defaultValue="0" onChange={this.handleChange}>
                            <Option value="0">一级分类</Option>
                            {
                                cotegorys.map(c=>
                                    <Option value={c.id}>{c.name}</Option>
                                )
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="name"
                        rules={[ { required: true, message: '必须输入!'}]}>
                        <Input
                            placeholder="请输入参数" onChange={this.getAddFromData}/>
                    </Form.Item>
                </Modal>


                <Modal title="修改内容" visible={isModalVisible==2} onOk={this.updateCatrgory} onCancel={this.handleCancel}>
                    <Form.Item
                        name="name"
                        rules={[ { required: true, message: '必须输入!' }]}>
                        <Input
                            placeholder="请输入修改内容"   onChange={this.getUpdateFromData}/>
                    </Form.Item>

                </Modal>
            </Card>
        )

    }


}