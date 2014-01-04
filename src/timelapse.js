var fs = require('fs')
var http = require('http')
var ffmpeg = require('fluent-ffmpeg');


function snapShotUrl(urlOptions, interval, numberOfShots, imageDirectory, callback) {
    console.log('Starting');
    var n = 1;
    var fileNamePadding = 5;
    var intervalId = setInterval(function(){

        if(n > numberOfShots){
            clearInterval(intervalId);
            callback()
            return
        }

        http.get(urlOptions, function(res){
            var imagedata = ''
            res.setEncoding('binary')

            res.on('data', function(chunk){
                imagedata += chunk
            })

            var fileName = String('00000'+n).slice(- fileNamePadding);
            n = n + 1;
            res.on('end', function(){
                fs.writeFile(imageDirectory + 'image' + fileName + '.jpg', imagedata, 'binary', function(err){
                    if (err) throw err
                    console.log('File saved - ' + fileName)
                    // TODO: If we are unable to load a frame then use the 
                    // last successful frame and log a warning.
                })
            })
        }).on('error', function(e) {
          console.log("Got error: " + e.message);
        });

    }, interval)

    return intervalId;
}

function createVideo(imageDirectory, imageFormat, videoDirectory, fps, callback) {
    var proc = new ffmpeg({source: imageDirectory + imageFormat})
    .withFps(fps)
    .saveToFile(videoDirectory + '' + String(Date()) + '.m4v', function(retcode, error){
        callback(null)
    });
    return proc;
}

function removeImages(imageDirectory, callback) {
    fs.readdir(imageDirectory, function(err, files) {
        for(var i in files) {
            var file = files[i];
            fs.unlink(imageDirectory + file, function(err) {
                if(err) {
                    console.log('Unable to remove image: ' + err);
                }
                callback(err);
            });
        }
    });
}

exports.createVideo = createVideo;
exports.snapShotUrl = snapShotUrl;
exports.removeImages = removeImages;


