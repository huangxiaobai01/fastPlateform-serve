var express = require('express');
var router = express.Router();
var {access, constants, mkdir, writeFileSync, rmdir, statSync, createReadStream}= require("fs")
const download = require('download-git-repo')
const compressing = require('compressing');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/downLoadProject', function(req, res, next) {
  var cwdpath = process.cwd()
  var random = Math.floor(Math.random() * 10000000000)
  let tempPath = cwdpath + '\\testCode\\' + random
  // testCode文件夹是存放下载项目的文件夹
  access(tempPath, constants.F_OK, function(err) {
    if (err) {
      // 不存在
      // 创建文件夹
      mkdir(tempPath, function(err) {
        if (err) {
          res.json({
            code: 500
          })
        } else {
          // 创建成功
          download('direct:http://192.168.16.65/huangrucong/fastplateform.git', tempPath, { clone: true }, function (err) {
            if (err) {
              rmdir(tempPath, function(){})
              res.json({
                code: 500
              })
            } else {
              // 下载成功
              req.body.list.forEach(item => {
                if (item.id === 'element') {
                  const { addElement } = require('./libraryConfig/element.js')
                  addElement(tempPath)
                } else if (item.id === 'echarts') {
                  const { addEcharts } = require('./libraryConfig/echarts/index.js')
                  addEcharts(tempPath)
                } else if (item.id === 'html2canvas') {
                  const { addHtml2canvas } = require('./libraryConfig/html2canvas/index.js')
                  addHtml2canvas(tempPath)
                } else if (item.id === 'jsPDF') {
                  const { addJspdf } = require('./libraryConfig/jspdf/index.js')
                  addJspdf(tempPath)
                } else if (item.id === 'lodash') {
                  const { addLodash } = require('./libraryConfig/lodash.js')
                  addLodash(tempPath)
                } else if (item.id === 'vuescroll') {
                  const { addVuescroll } = require('./libraryConfig/vuescroll/index')
                  addVuescroll(tempPath)
                }
              });
              [
                "new Vue({\n",
                "\trouter,\n",
                "\tstore,\n",
                "\trender: h => h(App)\n",
                "}).$mount('#app')"
              ].forEach(item => {
                writeFileSync(tempPath + '\\src\\main.js', item, { flag: 'a+' }, err => {})
              })
              compressing.tgz.compressDir(tempPath, tempPath + '\\project.tgz', { zipFileNameEncoding: 'gbk' }).then(() => {
                console.log('success');
                var fileName = req.body.fileName;
                var filePath = tempPath + '\\project.tgz';
                var stats = statSync(filePath); 
                if(stats.isFile()){
                  res.set({
                    'Content-Type': 'application/octet-stream',
                    'Content-Disposition': 'attachment; filename='+fileName,
                    'Content-Length': stats.size,
                    'Access-Control-Expose-Headers': 'Content-Disposition'
                  });
                  createReadStream(filePath).pipe(res);
                } else {
                  res.end(404);
                }
              }).catch(err => {
                rmdir(tempPath, function(){})
                res.json({
                  code: 500
                })
              });
            }
          })
        }
      })
    } else {
      // 存在
      res.json({
        code: 500
        // node中项目文件夹已经存在，一般不太可能！
        // message: '文件已存在！'
      })
    }
  })
});
router.post('/downLoadCode', function(req, res, next) {
  var fileName = req.body.fileName;
  var cwdpath = process.cwd();
  var filePath = cwdpath + '\\testCode\\testt.rar';
  var stats = statSync(filePath); 
  if(stats.isFile()){
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': 'attachment; filename='+fileName,
      'Content-Length': stats.size,
      'Access-Control-Expose-Headers': 'Content-Disposition'
    });
    createReadStream(filePath).pipe(res);
  } else {
    res.end(404);
  }
})
router.post('/downLoadSpecification', function(req, res, next) {
  var fileName = req.body.fileName;
  var cwdpath = process.cwd();
  var filePath = cwdpath + '\\specification\\' + fileName;
  res.download(filePath)
})
module.exports = router;
