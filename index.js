#!/usr/bin/env node

const program = require('commander');

// 输出版本号
// require可以加载json文件，node文件
// 函数第二个参数字符串，可以覆盖默认的参数解析
// program.version(require('./package.json').version, '-v, --version');
program.version(require('./package.json').version);

//process全局变量，node进程相关信息
// argv数组。命令行参数
// program.parse解析参数后，执行对应的函数
program.parse(process.argv);