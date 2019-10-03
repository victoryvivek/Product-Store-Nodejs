const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    const authHeader=req.get('Authorization');
    if(!authHeader){
        const err=new Error('Not authenticated');
        err.statusCode=401;
        throw err;
    }
    const token=authHeader.split(' ')[1];
    console.log(token);
    let decodedToken;
    try{
        decodedToken = jwt.verify(token, 'secretkey');
    }catch(err){
        err.statusCode=500;
        throw err;
    }

    if(!decodedToken){
        const err=new Error('Not Authorised');
        err.statusCode = 500;
        throw err;
    }
    req.userId=decodedToken.userId;
    next()    ;
}