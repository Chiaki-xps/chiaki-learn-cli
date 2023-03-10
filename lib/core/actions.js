// promisify帮助我们把函数包装到promise中去
const { promisify } = require('util');
const path = require('path');

// require('download-git-repo')返回的是一个回调函数，然后进行promise的包裹。当回调函数执行后，err会执行reject，其他会执行resolve
// 之后我们可以通过then获取结果
// 也可以对promise使用async await
const download = promisify(require('download-git-repo'));
const open = require('open');

const { vueRepo } = require('../config/repo-config');
const { commandSpawn } = require('../utils/terminal');
const { compile, writeToFile, createDirSync } = require('../utils/utils');

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
  // 这里没有使用await，因为npm run serve执行后只有ctrl + C才会关闭进程，这会导致下面没有人为关闭的情况下，一直阻塞，无法执行下面的open
  commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` });

  // 4.打开浏览器
  open("http://localhost:8080/");
};

// 添加组件的action
const addComponentAction = async (name, dest) => {
  // 1.编译ejs模板 result
  const result = await compile("vue-component.ejs", {name, lowerName: name.toLowerCase()});

  // 2.写入文件的操作
  const targetPath = path.resolve(dest, `${name}.vue`);
  console.log(targetPath);
  writeToFile(targetPath, result);
}

// 添加组件和路由
const addPageAndRouteAction = async (name, dest) => {
  // 1.编译ejs模板 result
  const data = {name, lowerName: name.toLowerCase()};
  // 返回的是一个字符串
  const pageResult = await compile('vue-component.ejs', data);
  const routeResult = await compile('vue-router.ejs', data);


  // 2.写入文件的操作
  // dest我们控制台传入的路径
  const targetDest = path.resolve(dest, name.toLowerCase());
  if (createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `${name}.vue`);
    const targetRoutePath = path.resolve(targetDest, 'router.js')
    writeToFile(targetPagePath, pageResult);
    writeToFile(targetRoutePath, routeResult);
  }

}

// 创建store过程
const addStoreAction = async (name, dest) => {
  // 1.遍历的过程
  const storeResult = await compile('vue-store.ejs', {});
  const typesResult = await compile('vue-types.ejs', {});

  // 2.创建文件
  const targetDest = path.resolve(dest, name.toLowerCase());
  if (createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `${name}.js`);
    const targetRoutePath = path.resolve(targetDest, 'types.js')
    writeToFile(targetPagePath, storeResult);
    writeToFile(targetRoutePath, typesResult);
  }
}

module.exports = {
  createProjectAction,
  addComponentAction,
  addPageAndRouteAction,
  addStoreAction
}