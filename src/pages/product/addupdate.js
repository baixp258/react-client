/**
 * 商品分类路由
 * */
import  React,{Component,useState} from 'react'
import {
    Card,
    Input,
    Form,
    Cascader,
    Button,
    message
} from 'antd'
import {ArrowLeftOutlined } from '@ant-design/icons';
import {reqCategorysPost, reqCategoryChildrens, addPorduct,updateProduct} from '../../api'
import PicturesWall from "./pictures-wall";
import RichTextEditor from './rich-text-editor'
const Item =Form.Item
const { TextArea } = Input;

export default class ProductAddUpdate extends  Component{


    //二级联动初始化数组
   state={
       options:[],
   }
   //初始化一个容器
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.editor=React.createRef();
    }

    //获取数组值
    initOptions=async (categorys)=>{
       //根据categorys生成options数组
       const options= categorys.map(c =>({
            value: c.id,
            label: c.name,
            isLeaf: false, //不是叶子
        }))
        //如果是一个二级分类商品的更新
        const {isUpdate,product} = this
        const {pcategoryId,categoryId}=product;
        if(isUpdate && pcategoryId !=="0"){
            //获取对应的二级分类列表
          const childrenCategorys= await this.getCategorys(pcategoryId);
          console.log("childrenCategorys"+childrenCategorys)
          //生成二级下拉列表
            const childOption=childrenCategorys.map(c=>({
                value: c.id,
                label: c.name,
                isLeaf: true, //是叶子
            }))
            //关联对应的一级option上
            const targetOption=options.find(option=>option.value===pcategoryId)
            targetOption.children=childOption
        }

        //跟新option状态
        this.setState({
            options
        })
    }
    /*
     获取一级/二级分类列表
     */
   getCategorys=async (parentId)=>{
       let result
       let categorys
       if(parentId===0){
            result=await reqCategorysPost(parentId);
           if(result.code==="0000"){
               categorys=result.data;
               this.initOptions(categorys);
           }
        }else{
            result=await reqCategoryChildrens(parentId);
           if(result.code==="0000"){
               categorys=result.data;
               return categorys
           }
       }
   }

   //render之后加载数据
    componentDidMount(){
           //判断如果是修改重新获一级/或者二级链表分类
           this.getCategorys(0);
   }
    //render之前加载数据
    componentWillMount(){
       // debugger
        //取出携带的status
        const product = this.props.location.state;
        //保存是否更新的标识
        this.isUpdate=!!product;
        this.product=product || {}
    }

    //获取表单数据
    // noinspection JSAnnotator
    onFinish  = async  (values: any) => {
       //1.收集数据
        const {pname,pdesc,price,options}=values
        let pcategoryId,categoryId
        if(options[0].length===1){
            pcategoryId='0'
            categoryId=options[0]
        }else{
            pcategoryId=options[0]
            categoryId=options[1]
        }
        const imgs=this.myRef.current.getPictureDate();
        const detail=this.editor.current.getDtail()
        const images=imgs[0]
        console.log('Received values of form: ', values);
        console.log("images"+images[0]);
        console.log("detail"+detail)
        //封装product产品对象
        const product={pname,pdesc,price,pcategoryId,categoryId,images,detail}
        console.log("pcategoryId=====>"+product.pcategoryId);
        //2.调用接口请求函数去添加/更新
          if(this.isUpdate){
            product.id=this.product.id
              console.log("product"+product.id)
            const result=await updateProduct(product);
              console.log("result"+result)
            if(result.code==="0000"){
                message.success("修改成功");
                this.props.history.goBack();
            }
          }else{
              const result=await  addPorduct(product);
              if(result.code==="0000"){
                  message.success("添加成功");
                  this.props.history.goBack();
              }
          }

        //3.根据结果显示

      ;
    }


    /**
     * 自定义价格校验规则
     */
    validatorPrice=(rule, value, callback)=>{
        console.log(value,typeof value)
        if(value * 1>0){
           callback();
        }else{
            callback("输入的数字必须大于0")
        }

    }

    //加载联动数据
     loadData =async selectedOptions => {
        //得到选中的option对象
        const targetOption = selectedOptions[0];
        //显示loading效果
        targetOption.loading = true;
        //根据选中的分类，请求获取二级分类列表
        const subCategory=await  this.getCategorys(targetOption.value);
        //debugger
        targetOption.loading = false;
        if(subCategory && subCategory.length>0){
            //生成一个二级列表的option
            const childrenCategory=subCategory.map( c=>({
                value: c.id,
                label: c.name,
                isLeaf: true, //不是叶子
            }))
            //关联到当前option上
            targetOption.children=childrenCategory
        }else{//没有二级分类，将叶子节点状态设置为true
            targetOption.isLeaf=true;
        }
         // 模拟请求异步获取二级列表数据，并更新
        /*setTimeout(() => {
            targetOption.loading = false;
            targetOption.children = [
                {
                    label: `${targetOption.label} Dynamic 1`,
                    value: 'dynamic1',
                    isLeaf: true
                },
                {
                    label: `${targetOption.label} Dynamic 2`,
                    value: 'dynamic2',
                    isLeaf: true
                },
            ];
        }, 1000);*/
      this.setState({
             options: [...this.state.options],
         });
    };


    render(){
      // debugger
        const {isUpdate,product}=this
        const {pcategoryId,categoryId,images,detail}=product;
        const categorysIds=[]
        if(isUpdate){
            if(pcategoryId==="0"){
                categorysIds.push(pcategoryId)
            }else{
                categorysIds.push(pcategoryId)
                categorysIds.push(categoryId)
            }

        }
        const formItemLayout = {
            labelCol: {
                xs: { span: 2 },
                sm: { span: 2 },
            },//左侧label的宽度
            wrapperCol: {
                xs: { span: 2 },
                sm: { span: 8 },
            },//制定右侧包裹的宽度
        };
        const title = (
            <span>
                <ArrowLeftOutlined style={{ marginRight:20,color:'green',fontSize:20 }} onClick={()=>this.props.history.goBack()}/>
                <span>{!isUpdate? "添加商品":"修改商品"}</span>

            </span>
        )
        return(
            <Card title={title}>
                <Form {...formItemLayout}
                      name="normal_login"
                      className="login-form"
                      initialValues={{
                          options: categorysIds,
                          prefix: '86',
                      }}
                      onFinish={this.onFinish}
                >
                    <Item label="商品名称"
                          name="pname"
                          rules={[
                              { required: true, message: '输入商品名称!' }
                          ]}>
                        <Input placeholder='输入商品名称' defaultValue={product.pname}/>
                    </Item>
                    <Item label="商品描述"
                          name="pdesc"
                          rules={[
                              { required: true, message: '输入商品描述!' }
                          ]}>
                        <TextArea placeholder="请输入商品描述" autosize  defaultValue={product.pdesc}/>
                    </Item>
                    <Item label="商品价格"
                          name="price"
                          rules={[
                              { required: true, message: '输入商品价格!' }
                              ,{validator:this.validatorPrice}
                          ]}>
                        <Input type='number' placeholder='请输入商品价格' addonAfter="元" defaultValue={product.price}/>
                    </Item>
                    <Item label="商品分类"
                          name="options">
                        <Cascader
                            options={this.state.options} /* 需要显示的列表数据数组*/
                            loadData={this.loadData}  /*当选择某个列表项，加载下一级列表的监听回调*/
                        />
                    </Item>
                    <Item label="商品图片">
                       <PicturesWall ref={this.myRef} images={images}/>
                    </Item>
                    <Item label="商品详情" labelCol={{sm: { span: 2 }}} wrapperCol={{sm: { span: 20 }}}>
                        <RichTextEditor ref={this.editor} detail={detail}/>
                    </Item>
                    <Item>
                        <Button type='primary' type="primary" htmlType="submit">提交</Button>
                    </Item>
                </Form>
            </Card>
        )

    }


}
/*
* 1.子组件调用父组件的方法：将父组件的方法以函数属性的形式传递给子组件，子组件就可以调用
* 2.父组件调用子组件的方法：在父组件通过ref得到子组件的标签对象（也就是组件对象），调用其方法
*
* */
