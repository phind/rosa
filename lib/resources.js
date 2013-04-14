var Post = require('./model');

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.send(200);
    });

    app.post('/posts', function(req, res) {
        var post = new Post(req.body);
        post.save(function(err) {
            if (err) {
                return res.send(500);
            }

            res.send(201);
        });
    });

    app.get('/posts', function(req, res) {
        res.send(200, [{
            title: 'sup'
        }]);
    });
};
