var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    hashtag:{type:String},
    type: {type: String},
    content: {type: String},
    title:{type:String},
    by: {type: String},
    imagepath: {type: String}
    });

module.exports = mongoose.model('posts',schema);