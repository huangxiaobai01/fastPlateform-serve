const mainCode = [
    "// 引入echartS图表\n",
    "import '@/utils/initEcharts.js';\n"
  ]
  const fs = require('fs')
  
  // 添加依赖
  function addDependencies(packPath) {
    const currFile = fs.readFileSync(packPath + '\\package.json')
    const currFileObj=JSON.parse(currFile)
    const currType = 'dependencies'
    if(currFileObj[currType]) {
      currFileObj[currType]["echarts"] = "^4.9.0"
    } else {
      currFileObj[currType] = {}
      currFileObj[currType]["echarts"] = "^4.9.0"
    }
    // 写入文件
    fs.writeFileSync(packPath + '\\package.json',JSON.stringify(currFileObj,"","\t"))
  }
  
  // 添加echarts按需加载配置文件和实例
  function addConfigFile(packPath) {
    var cwdpath = process.cwd()
    const sourcePath = cwdpath + '\\routes\\libraryConfig\\echarts\\addEcharts.js'
    const sourceFile = fs.readFileSync(sourcePath)
    // 写入文件
    fs.writeFileSync(packPath + '\\src\\utils\\initEcharts.js', sourceFile, {encoding: 'utf-8', flag: 'w'})
    const sourceExamplePath = cwdpath + '\\routes\\libraryConfig\\echarts\\echartsExample.vue'
    const sourceExampleFile = fs.readFileSync(sourceExamplePath)
    fs.writeFileSync(packPath + '\\src\\examples\\echartsExample.vue', sourceExampleFile, {encoding: 'utf-8', flag: 'w'})
  }

  // 添加main
  function editMain(packPath) {
    mainCode.forEach(item => {
      fs.writeFileSync(packPath + '\\src\\main.js', item, { flag: 'a+' }, err => {})
    })
  }
  
  function addEcharts(packPath) {
    addDependencies(packPath)
    editMain(packPath)
    addConfigFile(packPath)
  }
  module.exports = {
    addEcharts: addEcharts
  }