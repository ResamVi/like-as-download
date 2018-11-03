console.log('like-as-download started.');

function onStarted(id) {
  console.log('Started downloading: ' + id);
}

function onFailed(error) {
  console.log('Download failed: ${error}');
}

function logResponse(responseDetails) {
  const videoUrl = responseDetails.documentUrl;
  const videoId = videoUrl.slice("https://www.youtube.com/watch?v=".length);

  let downloading = browser.downloads.download({
    url: 'http://resamvi.de:8080/' + videoUrl,
    filename : videoId + '.mp4',
    conflictAction : 'uniquify',
  });
  
  downloading.then(onStarted, onFailed );
}

browser.webRequest.onCompleted.addListener(
  logResponse,
  {
    urls: ['https://www.youtube.com/service_ajax?name=likeEndpoint']
  }
);
