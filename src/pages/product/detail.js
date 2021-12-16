/**
 * 商品分类路由
 * */
import  React,{Component} from 'react'
import Icon from '@ant-design/icons';
import {ArrowLeftOutlined } from '@ant-design/icons';
import {Card,Button,List} from 'antd'
import  './product.less'
import {reqProductCategoryByParentId,reqProductCategoryChildrenByParentId} from '../../api'
const Item=List.Item;

export default class Detail extends  Component{

    state = {
      cName1:'',//一级分类
      cName2:''//二级分类
  }

 async componentDidMount(){
        //获取当前产品的品类Id和父id
      const {pcategoryId,categoryId}=this.props.location.state;
      //一级分类
      if(pcategoryId=="0"){
        const result=await  reqProductCategoryByParentId(pcategoryId)
          const cName1=result.data.name
          this.setState({cName1})
      }else {//二级分类
        /*
          //功能上满足，但是效率偏低
          const result1=await reqProductCategoryByParentId(pcategoryId);
          const result2=await reqProductCategoryChildrenByParentId(categoryId);
          const cName1=result1.data.name;
          const cName2=result2.data.name;*/
        const result=await Promise.all([reqProductCategoryByParentId(pcategoryId),reqProductCategoryChildrenByParentId(categoryId)]);
          const cName1=result[0].data.name;
          const cName2=result[1].data.name
          this.setState({cName1,cName2})
      }
  }
    render(){
        //读取携带过来的state的对象
        const {pname,price,pdesc,status,images,detail}=this.props.location.state;
        const {cName1,cName2}=this.state;
        const title=(
            <span>
                <ArrowLeftOutlined
                    style={{color:'green' ,marginRight: 15,fontSize:20}}
                    onClick={()=>this.props.history.goBack()}/>
                <span>商品详情</span>
            </span>
        )
        return(
            <div>
                <Card title={title} className='product-detail'>
                    <List>
                        <Item>
                            <span className="left">商品名称:</span>
                            <span>{pname}</span>
                        </Item>
                        <Item>
                            <span className="left">商品描述:</span>
                            <span>{pdesc}</span>
                        </Item>
                        <Item>
                            <span className="left">商品价格:</span>
                            <span>{price}</span>
                        </Item>
                        <Item>
                            <span className="left">所属分类:</span>
                            <span>{cName1}->{cName2?'-->'+cName2:''}</span>
                        </Item>
                        <Item>
                            <span className="left">商品图片:</span>
                            <span>
                                <img
                                    className="product-img"
                                    src={images}
                                    alt="img"
                                    />
                                <img
                                    className="product-img"
                                    src={images}
                                    alt="img"
                                />
                            </span>
                        </Item>
                        <Item>
                            <span className="left">商品详情:</span>
                            <span dangerouslySetInnerHTML={{__html: detail}}></span>
                        </Item>
                    </List>

                </Card>
            </div>
        )

    }


}