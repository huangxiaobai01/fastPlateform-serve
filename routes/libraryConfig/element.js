
const mainCode = [
  "// element ui\n",
  "import ElementUI from 'element-ui';\n",
  "import 'element-ui/lib/theme-chalk/index.css';\n",
  "Vue.use(ElementUI);\n"
]
const fs = require('fs')

// 添加依赖
function addDependencies(packPath) {
  const currFile = fs.readFileSync(packPath + '\\package.json')
  const currFileObj=JSON.parse(currFile)
  const currType = 'dependencies'
  if(currFileObj[currType]) {
    currFileObj[currType]["element-ui"] = "^2.13.0"
  } else {
    currFileObj[currType] = {}
    currFileObj[currType]["element-ui"] = "^2.13.0"
  }
  // 写入文件
  fs.writeFileSync(packPath + '\\package.json',JSON.stringify(currFileObj,"","\t"))
}

// 添加main
function editMain(packPath) {
  mainCode.forEach(item => {
    fs.writeFileSync(packPath + '\\src\\main.js', item, { flag: 'a+' }, err => {})
  })
}

function addElement(packPath) {
  addDependencies(packPath)
  editMain(packPath)
}
module.exports = {
  addElement: addElement
}
