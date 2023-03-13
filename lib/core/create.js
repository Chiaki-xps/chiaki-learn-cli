const program = require('commander');

const {
  createProjectAction,
  addComponentAction
} = require('./actions')

const createCommands = () => {
  program
    // <必传参数> [可选参数] ...表示多个参数，剩余参数的意思
    // chiaki不需要加，默认指令是chiaki，create是chiaki中的指令
    .command('create <project> [others...]')
    // 描述指令
    .description('clone a repository into a folder')
    
    // action传入一个回调函数，回调函数参数来自命令定义的,project来自定义的必选参数，others接收剩余的所有参数
    // .action( (project, others) => {
    //   console.log(project, others);
    // } )

    .action(createProjectAction);

    // 添加组件
    program
    .command('addcpn <name>')
    .description('add vue component, 例如: why addcpn HelloWorld [-d src/components]')
    .action((name) => {
      // program中的dest，是来自我们help文件中的自定义option，只要你输入命令的代码中携带 -d --dest就会把后面的携带路径传入program中我们定义的属性dest中
      // 例子：chiaki addcpn 组件名 -d dest参数需要传入的路径
      addComponentAction(name, program.dest || 'src/components');
    });

}


module.exports = createCommands;
