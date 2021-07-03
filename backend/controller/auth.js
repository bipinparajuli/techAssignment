const User = require("../model/user");
const {validationResult} = require("express-validator");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const expressJwt = require("express-jwt");
exports.signup = async (req,res) => {


    const {username,email,password} = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }

   await bycrypt.hash(password,11,(err,hash)=>{
       console.log(hash);
    const user = new User({email,password:hash,username});

     user.save().then((data)=>
     {
         return res.json({
             statusCode:200,
             success:true,
             messege:[],
             data:data
         })
     }
     )
     .catch(err=>{
         return res.json({
             statusCode:500,
             success:false,
             messege:["Failed to save data"],
             data:err
         })
     })

       
    })

 

 


}

exports.signin = async (req,res) => {

    const {email,password} = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(422).json({
            error:errors.array()[0].msg
        })       
    }

    User.findOne({email}).then((user)=>{

        bycrypt.compare(password,user.password,(err,result)=>{
            
            if(result)
            {
               //CREATING A TOKEN

               const token = jwt.sign({id:user._id},"techassignment");

               return res.json({
                statusCode:200,
                success:true,
                messege:[],
                data:{
                    email:user.email,
                    username:user.username,
                    token:token
                }
            })

            }


            return res.json({result})
        })
    }).catch((err)=>{
        return res.json({
            statusCode:500,
            success:false,
            messege:["Email not found"],
            data:err
        })       
    })

}


exports.isSignedIn = () => {
    expressJwt({
        secret:process.env.SECRET,
        userProperty:"auth"
    })
}

exports.isAuthenticated = (req,res,next) => {
    let cheker = req.profile && req.auth && req.profile._id == req.auth._id;

    if(!cheker)
    {
        return res.json({
            statusCode:403,
            success:false,
            messege:["ACCESSED DENIED"],
        })

    }

    next();
}
