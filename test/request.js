var request = require('../index');
var expect = require('expect.js');
var fs = require('fs');
require('should');


describe('request scenario', function () {
    it('test get method', function (done) {
        request.get('http://www.moye.me/', {gzip:true}, function(err, res, html){
            html.should.not.equal(null);
            done();
        });
    });

    it('test download method', function (done) {
        var filePath = 'avatar.jpg';
        request.download(
            'http://gravatar.com/avatar/84cbf739853b2e023328e2c0428d663c',
            'http://en.gravatar.com/',
            {gzip:true},
            filePath,
            function(err, res){
                fs.existsSync(filePath).should.equal(true);
                done();
            });
    });
});

