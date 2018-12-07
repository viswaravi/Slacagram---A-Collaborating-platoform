var express=require('express');
var mongoose=require('mongoose');
const multer = require('multer');

var User = require('../Schemas/user.schema');
var Post  = require('../Schemas/post.schema');

var router = express.Router();

mongoose.connect('mongodb://localhost:27017/slacagram', { useNewUrlParser: true });


router.get('/getAllPosts', function(req,res,next) {
    Post.find({})
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

const MIME_TYPE_MAP = { 
    'image/png' : 'png',
    'image/jpeg': 'jpg',
    'image/jpg' : 'jpg',
};

const storage  = multer.diskStorage({
    destination: (req,file,cb) => {
        const isvalid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if(isvalid){
            error = null;
        }
        cb(error,"backend/images");  
    },
    filename: (req,file,cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null,name+'-'+ Date.now()+'.'+ext);
    }
});

router.post('/pimage',multer({storage: storage}).single("image"),function(req,res,next) {
    const url = req.protocol + '://' + req.get("host");
    var newPost=new Post({
        _id: new mongoose.Types.ObjectId(),
        'hashtag' : req.body.hashtag,
        'type':req.body.type,
        'content':req.body.content,
        'title':req.body.title,
        'by': req.body.by,
        'imagepath': url + "/images/" + req.file.filename 
     });
     
     newPost.save(function(err,posts){
       if(err){
         return res.status(500).json({
           title :'An error occured while Signing Up',
           error:err
         });
        }
      res.status(201).json({
            msg:'Post Created',
            obj:posts
      });      
      });
});


router.post('/ptext',function(req,res,next) {
    
    var newPost=new Post({
        _id: new mongoose.Types.ObjectId(),
        'hashtag' : req.body.hashtag,
        'type':req.body.type,
        'content':req.body.content,
        'title':req.body.title,
        'by': req.body.by,
        'imagepath': null
     });
     
     newPost.save(function(err,posts){
       if(err){
         return res.status(500).json({
           title :'An error occured while Signing Up',
           error:err
         });
        }
      res.status(201).json({
            msg:'Post Created',
            obj:posts
      });      
      });
});

module.exports = router;