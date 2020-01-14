const http = require('http');
const path = require('path');
const fs = require('fs');

//Commonly used media type extensions and its content type
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
};

// create server
const server = http.createServer();

server.on('request', (req, res) => {

  const { method, url } = req;

  const fileExtension = path.extname(url);
  
  // Serving static files 
  if(method === 'GET' && (url === '/' || fileExtension) && url !== "/favicon.ico"){

    // Default file index.html and it will be served on root
    let filepath = path.join(__dirname, '/public/index.html');
      if(path.extname(url)){
        filepath = `${__dirname}${url}`;
      }
    
    let contentType = mimeTypes[fileExtension] || 'text/html';

    fs.readFile(filepath, (err, data) => {
      if(data){
        res.writeHead(200,{'Content-Type':contentType });
        res.end(data);
      }else if(err){
        console.log('err ===> ', err);
      }
    });

  }else{
    res.end('Hello Node world');
  }

});

server.listen(6060, () => console.log('Server is running at port 6060'));

