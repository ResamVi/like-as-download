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
  
  console.log(request);

  let metadata = JSON.parse(request.requestBody.formData.sej).likeEndpoint;
  
  if (metadata.status === 'LIKE') {
    
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() { 
      if (http.readyState == 4 && http.status == 200) {
        
        let video = JSON.parse(http.responseText);
        const videoUrl = 'https://www.youtube.com/watch?v=' + metadata.target.videoId;
        
        // Send request to download server who will download for us and serve the result.
        let downloading = chrome.downloads.download({
          url: 'http://resamvi.io:8080/' + videoUrl,
          filename : clean(video.title) + '.mp4',
          conflictAction : 'uniquify',
        });
        
      }
    }
    // Get more information on video (of which we only have its videoId)
    http.open('GET', 'https://www.youtube.com/oembed?url=http://youtube.com/watch?v=' + metadata.target.videoId + '&format=json', true);
    http.send();
  }
}

chrome.webRequest.onBeforeRequest.addListener(
  download,
  {
    urls: ['https://www.youtube.com/service_ajax?name=likeEndpoint']
  },
  ['requestBody']
);