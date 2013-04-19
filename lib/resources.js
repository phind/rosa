var restify = require('restify');

module.exports = function(app, Post) {
    app.get(/\/public\/?.*/, restify.serveStatic({
        directory: '../surfer'
    }));

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
        Post.find(function (err, posts) {
            if (err) {
                console.log('err:', err);
                return res.send(500);
            }

            res.send(200, {
                posts: posts
            });
        });
    });

    app.get('/posts/:id', function(req, res) {
        Post.find({ id: parseInt(req.params.id, 10) }, function (err, posts) {
            if (err) {
                console.log('err:', err);
                return res.send(500);
            }

            if (posts.length === 0) {
                return res.send(404);
            }

            res.send(200, {
                post: posts[0]
            });
        });
    });

    app.get('/tags', function(req, res) {
        /**
         * Returns tags.
         */

        res.send(200, {
            tags: [{
                title: 'Nutrition'
            }, {
                title: 'Dietetics'
            }]
        });
    });
};
