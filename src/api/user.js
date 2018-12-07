var express=require('express');
var mongoose=require('mongoose');

var User = require('../Schemas/user.schema');

var router = express.Router();

mongoose.connect('mongodb://localhost:27017/slacagram', { useNewUrlParser: true }).then(()=>{
  console.log('Connected');
}).catch(()=>{
  console.log('Error Connecting to DB');
});

router.post('/signUp',function(req,res,next) {   
    
    var user=new User({
        _id: new mongoose.Types.ObjectId(),
        'name' : req.body.name,
        'password':req.body.password,
        'email':req.body.email,
        'who':req.body.who,
        'chats':[]
     });
     
     user.save(function(err,classes){
       if(err){
         return res.status(500).json({
           title :'An error occured while Signing Up',
           error:err
         });
        }
      res.status(201).json({
            msg:'User Created',
            obj:classes
      });      
      });

});


router.post('/signIn',function(req,res,next){   
  User.findOne({email:req.body.email},function(err,user) {
    if(err){
      return res.status(500).json({
          title:'An error occured',
          error:err
      });
    }
    if(!user){
      return res.status(500).json({
          title:'Login Failed',
          error:{ messages:'Invalid user'}
      });
    }

       if(user.password != req.body.password) {
        return res.status(401).json({
          title:'Login Failes',
          error:{ message: 'Invalid Password'}
        });
    }
    
   res.status(200).json({
    messages:'successfully logged in',
    obj:user
  //  token:token,
});
   /* if(!bcrypt.compareSync(req.body.password,user.password)){
      return res.status(401).json({
        title:'Login Failed',
        error:{ messages:'Invalid password' }
    });
    */
  });
  });


module.exports = router;