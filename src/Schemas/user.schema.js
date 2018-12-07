var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
    password: {type: String},
    name : {type:String},
    username:{type:String},
    email:{type:String},
    who:{type:String},
    chats:[{
        conversationId:{
            type:Schema.Types.ObjectId,
            ref:'chatboard'
        }
    }],
    });

module.exports = mongoose.model('user',schema);