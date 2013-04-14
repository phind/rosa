var resources = require('./lib/resources');

var restify = require('restify');

var app = restify.createServer();
app.use(restify.bodyParser({ mapParams: false }));
resources(app);

app.listen(process.env.PORT, function() {
    console.log('Listening');
});
