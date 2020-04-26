const router =require('express').Router()
const {check,validationResult}=require('express-validator')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const auth=require('../middleware/auth')



const User=require('../models/User')

router.get('/',auth,async (req,res)=>{
    try {
        //res.send ('send data:',req.user.id)
        console.log('this is auth')
        const user=await User.findById(req.user.id).select("-password")
        
        res.json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error password')
    }
})

router.post('/',

[
    
    check('email','please provide a valid email').isEmail(),
    check('password','Please provide 6 character long password').exists()
],

async (req,res)=>{
  
    const errors=validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }


    //res.send('success register')
    const{email,password}=req.body
    try{
            let user=await User.findOne({email})
            if(!user){
                return res.status(400).json({msg:'Invalid Credentials'})
            }
        
            const match=await bcrypt.compare(password,user.password)
            if (!match){

                return res.status(400).json({msg:'Invalid Credentials not match'}) 
            }

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
            console.log('This is auth')
            res.send({token})
        })


    }catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports=router