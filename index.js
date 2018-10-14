const http = require('http');
const url  = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');


//ceate server
const server  = http.createServer((req,res)=>{
    var parseulr = url.parse(req.url,true);
    var path     = parseulr.pathname;
    var trimmedpath = path.replace(/^\/+|\/+$/g,'');
    var queryStringObject = parseulr.query;
    var headers     = req.headers;
    var method     = req.method.toLowerCase();

    var decoder = new StringDecoder('utf-8');
    var buffer  = '';
    req.on('data',(data)=>{
        buffer += decoder.write(data);
    });

    req.on('end',()=>{
        buffer += decoder.end();

        var choosenHandler  = typeof(route[trimmedpath]) !== undefined ? route[trimmedpath] : handlers.notFound;
        var data = {
            'trimmedPath':trimmedpath,
            'queryStringObject':queryStringObject,
            'method':method,
            'headers':headers,
            'payload':buffer
        };

        choosenHandler(data,(statusCode,payload)=>{
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
            payload     = typeof(payload) == 'object' ? payload : {};
            var payloadString = JSON.stringify(payload);
         
            res.setHeader('Content-Type','application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
           
        });
    });
});

//start server
server.listen(config.port,()=>{
    console.log('server is listerning on port '+ config.port);
});


//define handlers
var handlers = {};
handlers.hello = (data,callback)=>{
    callback(406,{'message':'Welcome to pirple tutorial'});
};
handlers.notFound = (data,callback)=>{
    callback(404);
};
//define routes
var route = {
  'hello':handlers.hello
};