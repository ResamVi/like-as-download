/**
 * This file should be deployed on a remote server.
 * 
 * The firefox extension will direct the URL to that server
 * to request a download.
 */

const fs = require('fs');
const youtubedl = require('youtube-dl');
const http = require('http');

http.createServer(function (req, res) {
  
  if(req.url === '/favicon.ico') {
    return;
  }
  
  // format 18 is mp4
  const url = req.url.slice(1);
  const video = youtubedl(url, ['--format=best'], { cwd: __dirname });
  let filename;
  
  video.on('info', function(info) {
    console.log('Download started:\t' + url);
    console.log('filename:\t\t' + info._filename);
    console.log('size:\t\t\t' + info.size);
    filename = info._filename;
    video.pipe(fs.createWriteStream(info._filename));
  });
  
  video.on('error', function error(err) {
    console.log('ERROR:', err);
  });
  
  video.on('end', function(info) {
    console.log('Download finished');
    
    fs.readFile('./' + filename, function(error, content) {
      if(error) {
        console.log(error);
      } else {
        res.end(content);
      }
    });

    fs.unlink('./' + filename, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Cleanup successfully');
      }
    })
  });
}).listen(8080);

console.log('Server started');
