  const fs = require('fs')
  
  // 添加依赖
  function addDependencies(packPath) {
    const currFile = fs.readFileSync(packPath + '\\package.json')
    const currFileObj=JSON.parse(currFile)
    const currType = 'dependencies'
    if(currFileObj[currType]) {
      currFileObj[currType]["html2canvas"] = "^1.0.0-rc.5"
    } else {
      currFileObj[currType] = {}
      currFileObj[currType]["html2canvas"] = "^1.0.0-rc.5"
    }
    // 写入文件
    fs.writeFileSync(packPath + '\\package.json',JSON.stringify(currFileObj,"","\t"))
  }
  
  // 添加实例
  function addConfigFile(packPath) {
    var cwdpath = process.cwd()
    const sourceExamplePath = cwdpath + '\\routes\\libraryConfig\\html2canvas\\html2canvasExample.vue'
    const sourceExampleFile = fs.readFileSync(sourceExamplePath)
    fs.writeFileSync(packPath + '\\src\\examples\\html2canvasExample.vue', sourceExampleFile, {encoding: 'utf-8', flag: 'w'})
  }
  
  function addHtml2canvas(packPath) {
    addDependencies(packPath)
    addConfigFile(packPath)
  }
  module.exports = {
    addHtml2canvas: addHtml2canvas
  }