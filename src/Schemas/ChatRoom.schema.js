var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    hashTag:{type:String},
   /* members:[{
        type:Schema.Types.ObjectId,
        ref:'user'
    }], */
    createdBy:{type:String},
    messages:[{
        by:{type:String},
        text:{type:String},
        time:{type:Date}
    }]
    });

module.exports = mongoose.model('chatRoom',schema);