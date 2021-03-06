request-gb
======
[![Build Status](https://travis-ci.org/rockdragon/request-gb.svg?branche=master)](https://travis-ci.org/rockdragon/request-gb) [![Coverage Status](https://coveralls.io/repos/rockdragon/request-gb/badge.png?branche=master)](https://coveralls.io/r/rockdragon/request-gb) [![npm version](https://badge.fury.io/js/request-gb.svg?branche=master)](http://badge.fury.io/js/request-gb) [![Dependency Status](https://david-dm.org/rockdragon/request-gb.svg?branche=master)](https://david-dm.org/rockdragon/request-gb)

[![https://www.npmjs.org/package/request-gb](https://nodei.co/npm/request-gb.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.org/package/request-gb)

This module extends [request/request](https://github.com/request/request)'s Request class with a automatic Chinese encoding conversion.

It is backed by the [request](https://github.com/request/request) module, so see its README for more details.

Installation
======
```
	$ npm install request-gb
```

Example
======

```javascript
// get a page
var request = require('request-gb');
request.get('http://www.xxx.com', {gzip:true}, function(err, res){
   console.log(res);
});

// download a file
request.download(
    'http://gravatar.com/avatar/84cbf739853b2e023328e2c0428d663c',
    'http://en.gravatar.com/',
    {gzip:true},
    '/users/xxx/avatar.jpg',
    function(err, res){
        console.log(res.length);
    });

// read file data into a Buffer
request.download2Buffer(
    'http://gravatar.com/avatar/84cbf739853b2e023328e2c0428d663c',
    'http://en.gravatar.com/',
    {gzip:true},
    function(err, buf){
        console.log(buf.length);
    });
```

License
======
MIT