#!/usr/bin/env node

const program = require('commander');

// 输出版本号
// require可以加载json文件，node文件
// 函数第二个参数字符串，可以覆盖默认的参数解析
// program.version(require('./package.json').version, '-v, --version');
program.version(require('./package.json').version);

// --help还有-V等都是默认的可选参数，我们还可以增加自己的option
// 第一个参数：指令名 <参数名称>
// 第二个参数：说明
// --help的时候就会显示该option和说明
program.option('-w --why', 'a why cli')

// 整个指令是可选的，你可以选择使用或不使用，使用的时候<dest>是必须传的
program.option('-d --dest <dest>', 'a destination folder,例如： -d /src/components', )
program.option('-f --framework <framework>', 'your framework', )
// 实践发现option是模糊匹配的 -d/src与-d /src一样。空格表示参数分割，<dest>只会匹配第一个

// 监听指令
program.on('--help', function() {
  console.log("");
  console.log("Other: ");
  console.log(" other option~");
})

//process全局变量，node进程相关信息
// argv数组。命令行参数
// program.parse解析参数后，执行对应的函数
program.parse(process.argv);

// 旧版本获取option的值直接program中获取对应的<dest>
// console.log(program.dest);

// 新版本需要使用opts()获取
// console.log(program.opts().dest);

// 开发库的时候叫lib作为文件夹 core放核心代码 utils工具