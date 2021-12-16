/**
 * 用来指定商品详情的父文本编辑器
 * */
import React, { Component } from 'react';
import { EditorState, convertToRaw ,ContentState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import PropTypes from 'prop-types'
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


/**
 *   <textarea
 disabled
 value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
 />
 */
export default class RichTextEditor extends Component {

    //接受父组件传值
    static propTypes={
        detail: PropTypes.string
    }

    constructor(props) {
        super(props);
        const html = this.props.detail
        console.log(html)
        if (html) {//如果有值，根据html格式字符串创建一个对应的编辑对象
            const contentBlock = htmlToDraft(html);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.state = {
                editorState,
            };
        }else{
            this.state = {
                editorState: EditorState.createEmpty(),//创建一个空的没有内容的对象
            }
        }
    }


    /**
     * 输入过程中实时的回调
     * @param editorState
     */
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    /**
     *将Editor的文本编辑内容传到父组件传用from表单收集数据，用户添加或者修改
     * @returns {*}
     */
    getDtail=()=>{
        //返回输入数据对应的html格式的文本
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    }

     uploadImageCallBack=(file)=> {
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', 'http://localhost:8081/upload/singleImg');
                xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
                const data = new FormData();
                data.append('uploadFile', file);
                xhr.send(data);
                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText);
                    const url=response.data.url
                    resolve({data:{link:url}});
                });
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText);
                    reject(error);
                });
            }
        );
    }

    render() {
        const { editorState } = this.state;
        return (
                <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    editorStyle={{border:'1px solid black',minHeight:200,paddingLeft:10}}
                    onEditorStateChange={this.onEditorStateChange}
                    toolbar={{
                        image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
                    }}
                />
        );
    }
}

