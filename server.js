var express = require('express');
var proxy = require('http-proxy-middleware');
const path = require('path')
 
var app = express();

//静态资源处理
app.use(express.static(path.join(__dirname, 'public')))

// 服务器代理
app.use('/api', proxy({
    target: 'http://47.75.103.239:8084/', //目标服务器
    pathRewrite: function (path, req) {

    console.log(path);
     return path.replace('/api', '')  //删除原路径中的/api
    },
     changeOrigin: true}
     ));

     app.use('*', function (request, response){
        response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
      })

      //源服务器
app.listen(9000,function(req,res){
    console.log("服务器已经开启9000");
});