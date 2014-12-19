var request = require('../index');
var expect = require('expect.js');
var fs = require('fs');
var should = require('should');

describe('request scenario', function () {
    it('encoding via header', function (done) {
        request.get('http://www.moye.me/', {gzip: true}, function (err, res, html) {
            html.should.not.equal(null);
            done();
        });
    });

    it('encoding via charset ', function (done) {
        request.get('http://www.glgoo.com/', {gzip: true}, function (err, res, html) {
            html.should.not.equal(null);
            done();
        });
    });

    it('test download method', function (done) {
        var filePath = 'avatar.jpg';
        request.download(
            'http://gravatar.com/avatar/84cbf739853b2e023328e2c0428d663c',
            'http://en.gravatar.com/',
            {gzip: true},
            filePath,
            function (err, res) {
                fs.existsSync(filePath).should.equal(true);
                done();
            });
    });

    it('test download to Buffer method', function (done) {
        var filePath = 'avatar.jpg';
        request.download2Buffer(
            'http://gravatar.com/avatar/84cbf739853b2e023328e2c0428d663c',
            'http://en.gravatar.com/',
            {gzip: true},
            function (err, buf) {
                should.exists(buf);
                done();
            });
    });
});

