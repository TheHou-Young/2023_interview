const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { errorConfig, notExistConfig } = require('./middlewares/error')
const httpHeader = require('./middlewares/httpHeader')
const { loadEnv } = require('./config/env')
const connectDB = require('./config/db')
const { loadRouter } = require('./routes/index')
const consulInstance = require('./middlewares/consul/index');


const app = express();

loadEnv() // 加载env环境
connectDB() // 连接数据库

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('*', httpHeader)
app.options('*', (_, res) => res.sendStatus(200))

loadRouter(app) // 路由加载

app.use(errorConfig) // 404
app.use(notExistConfig) // 500

module.exports = app;
