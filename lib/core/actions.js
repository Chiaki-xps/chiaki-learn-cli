// promisify帮助我们把函数包装到promise中去
const { promisify } = require('util');

// require('download-git-repo')返回的是一个回调函数，然后进行promise的包裹。当回调函数执行后，err会执行reject，其他会执行resolve
// 之后我们可以通过then获取结果
// 也可以对promise使用async await
const download = promisify(require('download-git-repo'));

const { commandSpawn } = require('../utils/terminal');

const { vueRepo } = require('../config/repo-config');

// callback -> promisify(函数) -> Promise -> async await
const createProjectAction = async (project) => {
  console.log('createProjectAction', project);
  console.log("why helps you create your project~")
  console.log(process.platform);

  // 1.clone项目
  await download(vueRepo, project, { clone: true });
  console.log('执行完成download');

  // 2.执行npm install
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  // 文档参数，第一个是命令，第二个是指令的数组，第三个是options对象
  // cwd指的是进程运行时所在的目录
  await commandSpawn(command, ['install'], { cwd: `./${project}` });

  // 3.运行npm run serve
  commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` });


};

module.exports = {
  createProjectAction,
};
