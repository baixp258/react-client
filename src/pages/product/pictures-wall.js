/**
 * 用于图片上传组件
 * */
import {Upload, Modal,message} from 'antd'
import  React,{Component} from 'react'
import { PlusOutlined } from '@ant-design/icons';
import {deleteImgByImgName} from '../../api'
import PropTypes from 'prop-types'




export default class PicturesWall extends  Component{


    static propTypes={
        images:PropTypes.string
    }

    /**
     * {
                uid: '-1', //每个file都有自己唯一的id
                name: 'image.png', //图片文件名
                status: 'done', // 图片状态：done 已经上传  ，uploading ：正在上传中 ，remove：已删除
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', //图片地址


            }{
                uid: '-1', //每个file都有自己唯一的id
                name: images, //图片文件名
                status: 'done', // 图片状态：done 已经上传  ，uploading ：正在上传中 ，remove：已删除
                url: images, //图片地址
            },

     * @param props
     */
    constructor(props){
        super(props)
        let fileList=[]
        const {images}=this.props
        console.log(images)
        if(images){
            /*this.setState({
                fileList:[ {
                    uid: '-1', //每个file都有自己唯一的id
                    name: 'image.png', //图片文件名
                    status: 'done', // 图片状态：done 已经上传  ，uploading ：正在上传中 ，remove：已删除
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', //图片地址
                }]
            })*/
          /*  fileList=[ {
                uid: '-1', //每个file都有自己唯一的id
                name: 'image.png', //图片文件名
                status: 'done', // 图片状态：done 已经上传  ，uploading ：正在上传中 ，remove：已删除
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', //图片地址
            }]*/
        }
        this.state = {
            previewVisible: false,//标识是否显示大图预览
            previewImage: '',//大图url
            previewTitle: '',
            fileList: [
                 {
                     uid: '-1', //每个file都有自己唯一的id
                     name: 'image.png', //图片文件名
                     status: 'done', // 图片状态：done 已经上传  ，uploading ：正在上传中 ，remove：已删除
                     url: images //图片地址
                 }
            ]
        };
    }


    /**
     * 隐藏Modal
     * @returns {*}
     */
    handleCancel = () => this.setState({ previewVisible: false });

    /**
     * 获取fileList值传递给父组件adduodate
     * @param file
     * @returns
     */
    getPictureDate=()=>{
        return this.state.fileList.map(file=>file.url)
    }


    handlePreview = async file => {
        //显示指定file对应大图
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };
    /**
     * file:当前操作的图片文件（上传/删除）
     * fileList:所有已上传图片文件对象的数组
     * @param fileList
     */
    handleChange =async ({ file,fileList }) => {
        console.log('handChange()',file.status,file.length)
        this.setState({ fileList })
        console.log(file.response)
        if(file.status==='done'){
            //一旦上传成功，将当前上传的file信息修正（name，url）
            const {name,url} =file.response.data;
            if(file.response.code==="0000"){
                console.log(name,url)
                file=fileList[fileList.length-1]
                file.name=name
                file.url=url
                message.success('图片上传成功！')
            } else{
                message.error('图片上传失败！')
            }
        }else if(file.status==='removed'){
            const result=await deleteImgByImgName(file.name);
            if(result.code==="0000"){
                message.success("删除图片成功")
            }else{
                message.error("删除图片失败");
            }
        }
    };

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <>
                <Upload
                    action='http://localhost:8081/upload/singleImg' /*上传图片的接口地址*/
                    accept='image/*' /*只接收图片格式*/
                    name='uploadFile'  /*请求参数名*/
                    listType="picture-card"  /*卡片样式*/
                    fileList={fileList}   /*所有已上传图片文件对象的数组*/
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </>
        );
    }
}
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}