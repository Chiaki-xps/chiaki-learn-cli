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

module.exports = {
  compile,
}