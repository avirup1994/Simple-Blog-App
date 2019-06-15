const loggerResponse=require('./../Library/LoggerResponse');
const userResponse=require('./../Library/userResponse');
const mongoose=require('mongoose');
const authfile=mongoose.model('saveToken');
const check=require('./../Library/check');
const jwt=require('./../Library/JwtToken');

let Authenctication=(req,res,next)=>{
if(req.params.authToken||req.query.authToken||req.header.authToken){
authfile.findOne({authToken:req.body.authToken||req.query.authToken||req.params.authToken||req.header('authToken')})
.exec((err,result)=>{
    if(err)
    {
    loggerResponse.error('Unable to find token', 'Authenctication', 300);
    let myResponse = userResponse.Message(true, 300, 'Unable to find token', null)
    res.send(myResponse);    
    }
    else if(check.isEmpty(result))
    {
        console.log(result);
    loggerResponse.error('No data found', 'Authenctication', 300);
    let myResponse = userResponse.Message(true, 300, 'No data found', null)
    res.send(myResponse);    
    }
    else{
    jwt.verifyJWT(result.authToken,result.secretkey,(err,final)=>{
        if(err){
            loggerResponse.error('Unable to verify token', 'Authenctication', 300);
            let myResponse = userResponse.Message(true, 300, 'Unable to verify token', null)
            res.send(myResponse);    
        }
        else{
            
            next();
        }
})
}
})
}
else
{
    loggerResponse.error('Unable to find authtoken', 'Authenctication', 300);
    let myResponse = userResponse.Message(true, 300, 'Unable to find authtoken', null)
    res.send(myResponse); 
}
}
module.exports={
    Authenctication:Authenctication
}