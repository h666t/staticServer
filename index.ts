import * as http from 'http';
import {IncomingMessage, ServerResponse} from 'http';
import * as fs from 'fs';
import * as p from 'path';
import * as url from 'url';


// 声明请求
const server = http.createServer();
const publicDir = p.resolve(__dirname, `public`);
//监听请求
server.on('request', (request: IncomingMessage, response: ServerResponse) => {
    const {url: path, method, headers} = request;
    //获取查询参数
    if (method !== 'GET') {
      response.statusCode = 405;
      response.end();
      return;
    }
    const object = url.parse(path);
    const {pathname, search} = object;
    let filename = pathname.substring(1);
    if (filename === '') {filename = 'index.html';}
    fs.readFile(p.resolve(publicDir, filename), (error, data) => {
      if (error) {
        response.statusCode = 404;
        response.end();
      } else {
        response.setHeader('Cache-control', `public,max-age=${3600 * 24 * 365}`);
        response.end(data);
      }
    });
  }
);
//监听端口
server.listen(8888, () => {
  // console.log(server.address());
  //目前的地址
});



