var mongoose = require('mongoose'),
    mongoosastic = require('mongoosastic');

var util = require('util');

function createSchema() {
    var Schema = mongoose.Schema({
        title:     { type: String },
        content:   { type: String },
     
        created:   { type: Date },
        updated:   { type: Date },
        deadline:  { type: Date, es_null_value: '' },

        location: {
            geo_point: {
                type: String,
                es_type: 'geo_point',
                es_lat_lon: true
            },

            lat: {
                type: Number
            },

            lon: {
                type: Number
            }
        },

        placename: { type: String, es_null_value: 'No place name' },
        post_id:   { type: Number },
        tags:      { type: Array }
    });

    Schema.index({ post_id: 1 });

    var es_host = util.format('%s:%s@%s', process.env.es_user,
            process.env.es_password, process.env.es_host);

    Schema.plugin(mongoosastic, {
        host: es_host,
        port: 80,
        index: 'phind-posts'
    });

    return Schema;
}

module.exports = function (callback) {
    mongoose.connect(process.env.mongo_host, process.env.mongo_db,
        process.env.mongo_port, {

        user: process.env.mongo_user,
        pass: process.env.mongo_password
    }, function (err) {
        if (err) {
            return callback(err);
        }

        var Schema = createSchema();

        var Post = mongoose.model('Post', Schema);

        Post.createMapping(function (err, mapping) {
            callback(err, Post);
        });
    });
};

