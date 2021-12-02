const fs = require('fs')
  
// 添加依赖
function addDependencies(packPath) {
  const currFile = fs.readFileSync(packPath + '\\package.json')
  const currFileObj=JSON.parse(currFile)
  const currType = 'dependencies'
  if(currFileObj[currType]) {
    currFileObj[currType]["jspdf"] = "^2.4.0"
  } else {
    currFileObj[currType] = {}
    currFileObj[currType]["jspdf"] = "^2.4.0"
  }
  // 写入文件
  fs.writeFileSync(packPath + '\\package.json',JSON.stringify(currFileObj,"","\t"))
}

// 添加实例
function addConfigFile(packPath) {
  var cwdpath = process.cwd()
  const sourceExamplePath = cwdpath + '\\routes\\libraryConfig\\jspdf\\jspdfExample.vue'
  const sourceExampleFile = fs.readFileSync(sourceExamplePath)
  fs.writeFileSync(packPath + '\\src\\examples\\jspdfExample.vue', sourceExampleFile, {encoding: 'utf-8', flag: 'w'})

  const exampleImgPath = cwdpath + '\\routes\\libraryConfig\\jspdf\\pdftest.png'
  const exampleImg = fs.readFileSync(exampleImgPath)
  fs.writeFileSync(packPath + '\\src\\examples\\pdftest.png', exampleImg, {encoding: 'utf-8', flag: 'w'})
}

function addJspdf(packPath) {
  addDependencies(packPath)
  addConfigFile(packPath)
}
module.exports = {
  addJspdf: addJspdf
}