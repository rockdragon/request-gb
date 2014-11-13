var request = require('request');
var iconv = require('iconv-lite');
var BufferHelper = require('bufferhelper');
var fs = require('fs');

module.exports.get = get;
module.exports.post = post;
module.exports.download = download;

function get(url, opts, fn) {
    crawl(url, 'GET', opts, fn);
}

function post(url, opts, fn) {
    crawl(url, 'POST', opts, fn);
}

function crawl(url, method, opts, fn) {
    var buffer = new BufferHelper();
    opts.url = url;
    opts.method = method;
    opts.gzip = opts.gzip || true;
    request(opts, function (err, res) {
        var encoding = res.headers['content-type'].split('charset=')[1] || 'UTF-8';
        console.log(url, ' encoding:', encoding);
        var html = iconv.decode(buffer.toBuffer(), encoding);
        fn(err, html);
    }).on('data', function (data) {
        buffer.concat(data);
    });
}

function download(url, referer, opts, path, fn) {
    opts.url = url;
    opts.method = 'GET';
    if(referer)
        opts.headers = {'referer': referer};
    opts.gzip = opts.gzip || true;
    var r = request(opts,function(err, res){
        fn(err, res);
    }).pipe(fs.createWriteStream(path));
}