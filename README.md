request-gb
======

This module extends [request/request](https://github.com/request/request)'s Request class with a with automatic Chinese encoding conversion.

It is backed by the [request](https://github.com/request/request) module, so see its README for more details.

Installation
======
```shell
	$npm install request-gb
```

Example
======

```javascript
var request = require('request-gb').get;
request.get('http://www.xxx.com', {gzip:true}, function(err, res){
   console.log(res);
});
```