const program = require('commander');

const {
  createProjectAction
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
}


module.exports = createCommands;
