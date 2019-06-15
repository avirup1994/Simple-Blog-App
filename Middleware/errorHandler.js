let applicationErrorhandler=(err,req,res)=>{
    console.log('applicationErrorhandler called');
    console.log(err);
    res.send('Some error occured in application level');
}
let globalerrorHandler=(req,res,err)=>{
console.log('Global error handler called');
res.status(404).send('Global error found in the application');
console.log(err);
}
module.exports={
    globalerrorHandler:globalerrorHandler,
    applicationErrorhandler:applicationErrorhandler
}