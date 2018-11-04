# Like-as-download

Press the like button. Download the video simultaneously

https://addons.mozilla.org/en-US/firefox/addon/like-as-download/

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Deployment

To be a provider that downloads and serves requests run
```
$ yarn install
$ node server.js
```
on your server.

Adjust `manifest.json`
```
"permissions": [
    "<Your Server IP>",
    "https://www.youtube.com/service_ajax?name=likeEndpoint",
    "downloads",
    "webRequest"
  ],
```

Adjust `extension.js`
```
let downloading = browser.downloads.download({
    url: '<Server URL>' + videoUrl,
    filename : videoId + '.mp4',
    conflictAction : 'uniquify',
  });
```

## Example like
![grafik](https://user-images.githubusercontent.com/6261556/47953301-14a38680-df7c-11e8-944c-2605f7c4651d.png)

## Built With

* [Node.js](https://nodejs.org/en/) - The server runtime environment
* [yarn](https://yarnpkg.com/lang/en/) - Package Management


## License

This project is licensed under the GNU LGPLv3 License - see the [LICENSE.md](LICENSE.md) file for details


