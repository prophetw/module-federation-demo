const express = require('express');
const cors = require('cors');
const app = express();

// 使用默认配置启用CORS
app.use(cors());

// 用于解析JSON格式的请求体
app.use(express.json());

// 提供静态文件服务
app.use(express.static('public'));


app.get('/', (req, res) => {
  // 你可以根据请求体(req.body)来定制返回的JSON内容
  // 例如，我们在这里简单地将请求体返回给客户端
  res.json({
    message: '收到请求',
  });
});

// POST接口，返回一个JSON
app.post('/api/config', (req, res) => {
  // 你可以根据请求体(req.body)来定制返回的JSON内容
  // 例如，我们在这里简单地将请求体返回给客户端
  res.json({
    message: 'success',
    scope: 'Motor',
    module: './Motor',
    url: 'http://localhost:3000/v1.4.3/remoteEntry.js',
    baseUrl: 'http://localhost:3000/v1.4.3',
  });
});

// 启动服务，监听3000端口
app.listen(3000, () => {
  console.log('服务器已启动在 http://localhost:3000');
});
