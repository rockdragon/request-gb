var request = require('request');
var iconv = require('iconv-lite');
var BufferHelper = require('bufferhelper');

module.exports.get = get;
module.exports.post = post;

function get(url, opts, fn) {
    crawl(url, 'GET', opts, fn);
}

function post(url, data, opts, fn) {
    crawl(url, 'POST', data, opts, fn);
}

function crawl(url, method, opts, fn) {
    var buffer = new BufferHelper();
    var options = {
        method: method,
        gzip: opts.gzip || true,
        url: url
    };
    if (opts.proxy)
        options.proxy = opts.proxy;
    request(opts, function (err, res) {
        var encoding = res.headers['content-type'].split('charset=')[1] || 'UTF-8';
        console.log(url, ' encoding:', encoding);
        var html = iconv.decode(buffer.toBuffer(), encoding);
        fn(err, html);
    }).on('data', function (data) {
        buffer.concat(data);
    });
}

