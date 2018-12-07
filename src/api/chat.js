var express=require('express');
var mongoose=require('mongoose');

var Chat = require('../Schemas/ChatRoom.schema');
var chatRoom = require('../Schemas/ChatRoom.schema');

var router = express.Router();

mongoose.connect('mongodb://localhost:27017/slacagram', { useNewUrlParser: true });

router.get('/getChatTags', function(req,res,next) {
    Chat.find({})
    .exec(function(err,posts){
       if(err){
         return res.status(500).json({
           title:'error occured',
           error:err
         });
       }
    res.status(200).json(posts);
});
});


router.get('/getChatRoom/:tag', function(req,res,next) {
    Chat.findOne({'hashTag': req.params.tag})
    .exec(function(err,posts){
       if(err){
         return res.status(500).json({
           title:'error occured',
           error:err
         });
       }
    res.status(200).json(posts);
});
});

router.post('/newRoom',function(req,res,next) {   
 
  var room=new chatRoom({
      _id: new mongoose.Types.ObjectId(),
      'hashTag' : req.body.hashTag,
      'createdBy':req.body.createdBy,
      'messages': []
   });
   
   room.save(function(err,rooms){
     if(err){
       return res.status(500).json({
         title :'An error occured while Signing Up',
         error:err
       });
      }
    res.status(201).json({
          msg:'Room Created',
          obj:rooms
    });      
    });
});

router.put('/sendMessage/:id', function(req,res,next) {
    Chat.findByIdAndUpdate({_id:req.params.id},{$push:{messages: req.body}})
    .exec(function(err,posts){
       if(err){
         return res.status(500).json({
           title:'error occured',
           error:err
         });
       }
    res.status(200).json(posts);
});
});

module.exports = router;