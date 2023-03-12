/**
 * 执行终端命令相关的代码
 */
const { spawn } = require('child_process');

// npm install 
// ...args -> 可变参数
const commandSpawn = (...args) => {

  // 全局包裹一个promise，这个时候使用的调用的函数能够知道commandSpawn是否执行完成
  return new Promise((resolve, reject) => {
    // spawn返回子进程的信息
    const childProcess = spawn(...args);
    // 子进程中有很多的打印信息，但是不会显示在我们的当前进程。
    // 子进程会有个属性（标准输出流属性），属性上有个方法管道pipe，我们可以将信息传输到其他进程输出流属性上
    // process全局对象，表示我们当前的进程
    childProcess.stdout.pipe(process.stdout);
    // 报错信息
    childProcess.stderr.pipe(process.stderr);

    // 监听子进程关闭（报错或执行完成）
    childProcess.on("close", () => {
      resolve();
    })
  })
}

// const commandExec = (...args) => {
//   return new Promise((resolve, reject) => {
//     const childProcess = spawn(...args);
//     childProcess.stdout.pipe(process.stdout);
//     childProcess.stderr.pipe(process.stderr);
//     childProcess.on("close", () => {
//       resolve();
//     })
//   })
// }

module.exports = {
  commandSpawn
}
