var fs = require('fs');
var sinon = require('sinon');
var rmdir = require('rimraf');
var _ = require('underscore');
var mkdirp = require('mkdirp');
var should = require('should');
var randomstring = require("randomstring");

var timelapse = require('../src/timelapse.js')


describe('timelapse', function(){
    var test_directory = null;
    beforeEach(function(done){
        test_directory = __dirname + '/tmp/' + randomstring.generate() + '/';
        mkdirp(test_directory, function(err) {
            done(); 
        });
    });
    afterEach(function(done){
        rmdir(test_directory, function (err) {
            done();
        });
    });
    describe('removeImages', function(){  
        it('should remove images from the image directory', function(done){
            fs.writeFileSync(test_directory + '1.txt', '');
            fs.writeFileSync(test_directory + '2.txt', '');
            fs.writeFileSync(test_directory + '3.txt', '');
            fs.readdirSync(test_directory).length.should.equal(3);

            var finished = _.after(3, function() {
              fs.readdirSync(test_directory).length.should.equal(0);
              done();
            });

            timelapse.removeImages(test_directory, function(err) { finished(); }); 
        });
    });
});

               