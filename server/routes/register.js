const router =require('express').Router()
const {check,validationResult}=require('express-validator')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const User=require('../models/User')


router.post('/',

[
    check('name','Please provide a name').not().isEmpty(),
    check('email','please provide a valid email').isEmail(),
    check('password','Please provide 6 character long password').isLength({min:6})
],

async (req,res)=>{
  
    const errors=validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }


    //res.send('success register')
    const{name,email,password}=req.body
    try{
            let user=await User.findOne({email})
            if(user){
                return res.status(400).json({msg:'user already exists'})
            }
        user=new User({
            name,
            email,
            password
        })    
        
        
        const salt=await bcrypt.genSalt(10)
        //res.send('user password salt:'+salt)
        user.password=await bcrypt.hash(password ,salt)
        //res.send('user password:'+user.password)
        
        //user.password=password
        
        await user.save()
        const payLoad={
            user:{
                id:user.id
            }
        }
        //res.send('user password:'+user.password)
        

        jwt.sign(payLoad,process.env.SECRET,{
            expiresIn:3600
        },(err,token)=>{
            if (err) throw err
            console.log('this is the regisger')
            
            res.send({token})
        })


    }catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports=router