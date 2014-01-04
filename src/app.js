var path = require('path');
var timelapse = require('./timelapse.js');

var urlOptions = {
    host: '192.168.1.64', 
    port: 8080,
    path: '/shot.jpg'
}

var interval = 1000;
var numberOfShots = 10;
var fps = 6;

var root_directory = path.dirname(__dirname);
// var imageDirectory = root_directory + '/images/';
// var videoDirectory = root_directory + '/videos/';
var imageDirectory = '/Users/markdessain/Documents/images/';
var videoDirectory = '/Users/markdessain/Documents/videos/';
var imageFormat = 'image%05d.jpg';

// Wrap-up
function createVideoAndDeleteImages() {
    timelapse.createVideo(imageDirectory, imageFormat, videoDirectory, fps, function(err){
        timelapse.removeImages(imageDirectory, function(err) {});
    }); 
}

//Start
var interval_id = timelapse.snapShotUrl(urlOptions, interval, numberOfShots, imageDirectory, createVideoAndDeleteImages);

// To allow the user to cancel a timelapse and interrupt the setInterval
// var stdin = process.openStdin();
// stdin.on('data', function(chunk) { 
//  clearInterval(interval_id);
//  createVideoAndDeleteImages()
// });