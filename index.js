const fs = require('fs');
const youtubedl = require('youtube-dl');
const http = require('http');

// video.pipe(fs.createWriteStream(info.filename));

http.createServer(function (req, res) {
  
  if(req.url === '/favicon.ico') {
    return;
  }

  const url = req.url.slice(1);
  console.log('Request: ' + url);
  
  // format 18 is mp4
  var video = youtubedl(url, ['--format=18'], { cwd: __dirname });

  video.on('info', function(info) {
    console.log('Download started');
    console.log('filename: ' + info._filename);
    console.log('size: ' + info.size);
  });

  video.on('end', function(info) {
    console.log('Download finished');
    res.writeHead(200, {'Content-Type': 'video/mp4'});
    res.write(req.url);
    res.end();
  });
  
}).listen(8080);

console.log('Server started');