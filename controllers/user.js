const UserModel=require('../model/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

exports.login=(req,res,next)=>{
    const email=req.body.email;
    const password = req.body.password;
    let currentUser;

    UserModel.findOne({email:email}).then(user=>{
        if(!user){
            const err=new Error('Email not registered');
            err.statusCode=404;
            throw err;
        }
        currentUser=user;
        console.log(user.email+' ' + password + ' '+user.password);
        return bcrypt.compare(password, user.password);

    }).then(isEqual=>{
        if(!isEqual){
            const err = new Error('Wrong Password');
            err.statusCode = 404;
            throw err;
        }
        const token=jwt.sign({
            email:email,
            userId:currentUser._id
        },'secretkey',{expiresIn:'1h'});
        return res.status(200).json({
            token:token,
            userId:currentUser._id
        });
    }).catch(err=>{
        console.log(err);
        next(err);
    });
}

exports.register=(req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.hash(password,12).then(encrytedPassword=>{
        const user=new UserModel({email:email,password:encrytedPassword});
        return user.save();
    }).then(user=>{
        res.status(200).json({
            message:'User Created',
            userId:user._id
        });
    }).catch(err => {
        console.log(err);
        next(err);
    });
}