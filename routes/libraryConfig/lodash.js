
  const fs = require('fs')
  
  // 添加依赖
  function addDependencies(packPath) {
    const currFile = fs.readFileSync(packPath + '\\package.json')
    const currFileObj=JSON.parse(currFile)
    const currType = 'dependencies'
    if(currFileObj[currType]) {
      currFileObj[currType]["lodash"] = "^4.17.15"
    } else {
      currFileObj[currType] = {}
      currFileObj[currType]["lodash"] = "^4.17.15"
    }
    // 写入文件
    fs.writeFileSync(packPath + '\\package.json',JSON.stringify(currFileObj,"","\t"))
  }
  
  function addLodash(packPath) {
    addDependencies(packPath)
  }
  module.exports = {
    addLodash: addLodash
  }