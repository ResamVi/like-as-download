const fs = require('fs');
const youtubedl = require('youtube-dl');
const http = require('http');

http.createServer(function (req, res) {
  
  if(req.url === '/favicon.ico') {
    return;
  }
  
  // format 18 is mp4
  const url = req.url.slice(1);
  const video = youtubedl(url, ['--format=18'], { cwd: __dirname });
  let filename;
  
  video.on('info', function(info) {
    console.log('Download started:\t' + url);
    console.log('filename:\t\t' + info._filename);
    console.log('size:\t\t\t' + info.size);
    filename = info._filename;
    video.pipe(fs.createWriteStream(info._filename));
  });
  
  video.on('end', function(info) {
    console.log('Download finished');
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    fs.readFile('./' + filename, function(error, content) {
      if(error) {
        console.log(error);
      } else {
        res.writeHead(200, { 
          'Content-Type': 'video/mp4',
          'Content-disposition': 'attachment; filename="' + filename + '"',
        });
        res.end(content);
      }
    });
  });
}).listen(8080);

console.log('Server started');