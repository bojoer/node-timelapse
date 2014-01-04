var ffmpeg = require('fluent-ffmpeg');

// make sure you set the correct path to your video file
var proc = new ffmpeg({ source: 'images/image%05d.jpg' })
  .withFps(6)
  .saveToFile('videos/your_target.m4v', function(retcode, error){
    console.log('file has been converted succesfully');
  });