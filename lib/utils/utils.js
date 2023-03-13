const path = require('path');
const fs = require('fs');

const ejs = require('ejs');

// 编译的模板名和目标需要的数据
const compile = (templateName, data) => {
  const templatePosition = `../templates/${templateName}`;

  // __dirname当前执行文件的目录。拼接上字符串点点..的时候，会向上一级
  const templatePath = path.resolve(__dirname, templatePosition);

  // 渲染文件，传入一个绝对路径
  // ejs.renderFile(templatePath, {data}, {}, (err, result) => {
  //   if(err) {
  //     console.log(err);
  //     return;
  //   }
  // })

  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { data }, {}, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }

      resolve(result);
    })
  })

}

const createDirSync = (pathName) => {
  if (fs.existsSync(pathName)) {
    return true;
  } else {
    if (createDirSync(path.dirname(pathName))) {
      fs.mkdirSync(pathName);
      return true;
    }
  }
}

// 写入文件
const writeToFile = (path, content) => {
  // fs.promises返回的就是一个promise，外面接收后进行then拿取err或resolve
  // 判断path是否存在, 如果不存在, 创建对应的文件夹
  return fs.promises.writeFile(path, content);
}

module.exports = {
  compile,
  writeToFile,
  createDirSync

}