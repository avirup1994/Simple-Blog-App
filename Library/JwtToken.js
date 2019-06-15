const shortid=require('shortid');
const jwt=require('jsonwebtoken');
const secretkey="My Secrets";

let generateJWT=(data,cb)=>{
try{    
    let claims={
        jwtid:shortid.generate,
        iat:Date.now(),
        exp:Math.floor(Date.now()/1000)+(60*60*24),
        sub:'authToken',
        data:data,
        sub:'Test'
    }
    let Tokendetails={
        token:jwt.sign(claims,secretkey),
        secretkey:secretkey
    }
    console.log('Token successfully generated');
    cb(null,Tokendetails)
}
catch(err)
{
console.log('Error in generating token');
cb(err,null)
}
}

let verifyJWT=(token,secretkey,cb)=>{
jwt.verify(token,secretkey,function(err,result){
    if(err)
    {
        console.log('Error occured during verification of authToken');
        cb(null,err)
    }
    else{
        console.log('authToken verified succcessfully');
        cb(null,result)
    }
})
}

let verifyJWTwithoutsecret=(token,cb)=>{
    jwt.verify(token,secretkey,function(err,result){
        if(err)
        {
            console.log('Error occured during verification of authToken');
            cb(null,err)
        }
        else{
            console.log('authToken verified succcessfully');
            cb(null,result)
        }
    })
    }
module.exports={
    generateJWT:generateJWT,
    verifyJWT:verifyJWT,
    verifyJWTwithoutsecret:verifyJWTwithoutsecret
}