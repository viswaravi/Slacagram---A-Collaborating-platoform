var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    members:[{
        types:Schema.Types.ObjectId,
        ref:'user'
    }],
    messages:[{
        by:{type:String},
        text:{type:String},
        time:{type:String}
    }]
    });

module.exports = mongoose.model('chatBsoard',schema);