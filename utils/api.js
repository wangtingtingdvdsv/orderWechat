/*
*debug调试
*/
var Mock = require("./mock.js");
Mock.mock('https://mp.weixin.qq.com/debug',{
    "code":200,
    "message":"炒菜"
})