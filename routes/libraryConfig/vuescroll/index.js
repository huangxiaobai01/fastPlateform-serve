  const mainCode = [
    "// vuescroll\n",
    "import vuescroll from 'vuescroll';\n",
    "Vue.use(vuescroll);\n",
  ]
  const fs = require('fs')
  
  // 添加依赖
  function addDependencies(packPath) {
    const currFile = fs.readFileSync(packPath + '\\package.json')
    const currFileObj=JSON.parse(currFile)
    const currType = 'dependencies'
    if(currFileObj[currType]) {
      currFileObj[currType]["vuescroll"] = "^4.17.3"
    } else {
      currFileObj[currType] = {}
      currFileObj[currType]["vuescroll"] = "^4.17.3"
    }
    // 写入文件
    fs.writeFileSync(packPath + '\\package.json',JSON.stringify(currFileObj,"","\t"))
  }

  // 添加实例
  function addConfigFile(packPath) {
    var cwdpath = process.cwd()
    const sourceExamplePath = cwdpath + '\\routes\\libraryConfig\\vuescroll\\vuescrollExample.vue'
    const sourceExampleFile = fs.readFileSync(sourceExamplePath)
    fs.writeFileSync(packPath + '\\src\\examples\\vuescrollExample.vue', sourceExampleFile, {encoding: 'utf-8', flag: 'w'})
  }
  
  // 添加main
  function editMain(packPath) {
    mainCode.forEach(item => {
      fs.writeFileSync(packPath + '\\src\\main.js', item, { flag: 'a+' }, err => {})
    })
  }
  
  function addVuescroll(packPath) {
    addDependencies(packPath)
    addConfigFile(packPath)
    editMain(packPath)
  }
  module.exports = {
    addVuescroll: addVuescroll
  }
  