var resources = require('./lib/resources'),
    getPost = require('./lib/model');

var restify = require('restify');

var app = restify.createServer();
app.use(restify.bodyParser({ mapParams: false }));
getPost(function (err, Post) {
    console.log('err', err, Post);
    resources(app, Post);

    app.listen(process.env.PORT, function() {
        console.log('Listening');
    });
});
