console.log('like-as-download started.');

function onStarted(id) {
  console.log(`Started downloading: ${id}`);
}

function onFailed(error) {
  console.log(`Download failed: ${error}`);
}

function clean(str) {
  return str.replace(/^[^a-z]+|[^\w:.-\s]+/gi, "");
}

function download(request) {
  
  let metadata = JSON.parse(request.requestBody.formData.sej).likeEndpoint;
  
  if (metadata.status === 'LIKE') {
    
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() { 
      if (http.readyState == 4 && http.status == 200) {
        
        let video = JSON.parse(http.responseText);
        const videoUrl = 'https://www.youtube.com/watch?v=' + metadata.target.videoId;
        
        // Send request to download server who will download for us and serve the result.
        let downloading = browser.downloads.download({
          url: 'http://resamvi.de:8080/' + videoUrl,
          filename : clean(video.title) + '.mp4',
          conflictAction : 'uniquify',
        });
        
        downloading.then(onStarted, onFailed);
      }
    }
    // Get more information on video (of which we only have its videoId)
    http.open('GET', 'https://www.youtube.com/oembed?url=http://youtube.com/watch?v=' + metadata.target.videoId + '&format=json', true);
    http.send();
  }
}

browser.webRequest.onBeforeRequest.addListener(
  download,
  {
    urls: ['https://www.youtube.com/service_ajax?name=likeEndpoint']
  },
  ['requestBody']
);
