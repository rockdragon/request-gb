var request = require('request');
var iconv = require('iconv-lite');
var BufferHelper = require('bufferhelper');
var fs = require('fs');

module.exports.get = get;
module.exports.post = post;
module.exports.download = download;
module.exports.download2Buffer = download2Buffer;

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
    request(opts, function (err, response, res) {
        var encoding = null;
        if (response && response.headers && response.headers['content-type']) {
            encoding = response.headers['content-type'].split('charset=')[1];
        }
        if (!encoding && res.contains('charset=')) {
            var match = /<meta[\s\S]*?charset=([^'"\s]+)/gmi.exec(res);
            if(match && match[1]) {
                encoding = match[1];
            }
        }
        encoding = encoding || 'UTF-8';
        console.log(url, ' encoding:', encoding);
        var html = iconv.decode(buffer.toBuffer(), encoding);
        fn(err, response, html);
    }).on('data', function (data) {
        buffer.concat(data);
    });
}

function download(url, referer, opts, path, fn) {
    opts.url = url;
    opts.method = 'GET';
    if (referer)
        opts.headers = {'referer': referer};
    opts.gzip = opts.gzip || true;
    var r = request(opts, function (err, res) {
        fn(err, res);
    }).pipe(fs.createWriteStream(path));
}

/*
 download binary stream to Buffer
 * */
function download2Buffer(url, referer, opts, fn) {
    var buffer = new BufferHelper();
    opts.url = url;
    opts.method = 'GET';
    if (referer)
        opts.headers = {'referer': referer};
    opts.gzip = opts.gzip || true;
    request(opts, function (err) {
        var buf = buffer.toBuffer();
        console.log(url, ' bytes:', buf.length);
        fn(err, buf);
    }).on('data', function (data) {
        buffer.concat(data);
    });
}

String.prototype.contains = function (needle) {
    if (needle === '') return true;
    if (this == null) return false;
    return this.indexOf(needle) !== -1;
};
