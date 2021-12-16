const {override,fixBabelImports,addLessLoader}=require('customize-cra');
module.exports=override(
    //针对antd实现按需打包，根据import打包（使用工具包babel-plugin-import）
    fixBabelImports('import',{
        libraryName: 'antd',
        libraryDirectory:'es',
        style:'css',//自动打包相关的样式
    }),
    addLessLoader({
        isJavaScriptEnabled:true,
        modifyVars: { '@primary-color': '#1DA57A' }
    }),
);