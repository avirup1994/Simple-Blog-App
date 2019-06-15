const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const model = mongoose.model('Data');
const mymodel2 = mongoose.model('Test');
const userResponse = require('./../Library/userResponse');
const loggerResponse = require('./../Library/LoggerResponse');
const check = require('./../Library/check');
const emailpass = require('./../Library/Email & Password');
const Password = require('./../Library/Password');
const Jwttoken=require('./../Library/JwtToken');
const authTokendatabase=mongoose.model('saveToken');


let RouteParameter = (req, res) => {
    console.log(req.params);
    res.send(req.params);
}

let queryparameter = (req, res) => {
    let fullName = req.query.fullName;
    let arr = fullName.split(' ');
    let nameObj = {
        firstName: arr[0],
        lastName: arr[1]
    }
    res.send(JSON.stringify(nameObj));

    let dob = req.query.dob;
    let arr1 = dob.split("-");
    let dobYear = Number(arr1[0]);
    let dobMonth = Number(arr1[1]);
    let dobDay = Number(arr1[2]);
    let today = new Date();
    let age = today.getFullYear() - dobYear;
    if (today.getMonth() + 1 < dobMonth || (today.getMonth() + 1 == dobMonth && today.getDate() < dobDay)) {
        age--;
    }
    res.send(JSON.stringify({ age: age }));
};

let bodyparameter = (req, res) => {
    console.log(req.body);
    res.send(req.body);
}

let getalldata = (req, res) => {
    model.find().exec((err, result) => {
        if (err) {
            let myResponse = userResponse.Message(true, 500, 'Some error occured', null)
            res.send(myResponse);
            loggerResponse.error('Error in getalldata', 'getalldata()', 500);
        }
        else if (check.isEmpty(result)) {
            let myResponse = userResponse.Message(true, 500, 'Some error occured', null)
            res.send(myResponse);
            loggerResponse.error('Error in getalldata', 'getalldata()', 500);
        }
        else {
            loggerResponse.info('All data fetched successfully', 'getalldata', 200);
            let myResponse = userResponse.Message(false, 200, 'All data fetched successfully', result)
            res.send(myResponse);
        }
    })
}

let getdatabyuserid = (req, res) => {
    model.findOne({ userId: req.params.userId }, (err, result) => {
        if (err) {
            let myResponse = userResponse.Message(true, 500, 'Some error occured', null)
            res.send(myResponse);
            loggerResponse.error('Error in getdatabyuserid', 'getdatabyuserid()', 500);
        }
        else if (check.isEmpty(result)) {
            let myResponse = userResponse.Message(true, 500, 'Some error occured', null)
            res.send(myResponse);
            loggerResponse.error('Error in getdatabyuserid', 'getdatabyuserid()', 500);
        }
        else {
            loggerResponse.info('Data fetched successfully', 'getdatabyuserid()', 200);
            res.send(result);
        }
    })
}
let createData = (req, res) => {
    let userId = shortid.generate();
    let date = Date.now();
    let mydata = new model({
        userId: userId,
        createdOn: date,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobileNumber: req.body.mobileNumber,
        email: req.body.email,
        password: req.body.password
    })
    mydata.save((err, result) => {
        if (err) {
            loggerResponse.error('Error in createData', 'createData()', 500);
            let myResponse = userResponse.Message(true, 500, 'Some error occured', null)
            res.send(myResponse);
        }
        else {
            loggerResponse.info('Data created successfully', 'createData()', 200);
            res.send(result);
        }
    })
}
let editData = (req, res) => {
    let options = req.body;
    console.log(options);
    model.update({ userId: req.params.userId }, options, { multi: true }).exec((err, result) => {
        if (err) {
            let myResponse = userResponse.Message(true, 500, 'Some error occured', null)
            res.send(myResponse);
            loggerResponse.error('Error in editData', 'editData()', 500);
        }
        else if (check.isEmpty(result)) {
            let myResponse = userResponse.Message(true, 500, 'Some error occured', null)
            res.send(myResponse);
            loggerResponse.error('Error in editData', 'editData()', 500);
        }
        else {
            loggerResponse.info('All data edited successfully', 'editData()', 200);
            console.log(result);
            res.send(result);
        }
    })
}
let deletefile = (req, res) => {
    model.remove({ userId: req.params.userId }, (err, result) => {
        if (err) {
            let myResponse = userResponse.Message(true, 500, 'Some error occured', null)
            res.send(myResponse);
            loggerResponse.error('Error in deletedata', 'deletefile()', 500);
        }
        else if (check.isEmpty(result)) {
            let myResponse = userResponse.Message(true, 500, 'Some error occured', null)
            res.send(myResponse);
            loggerResponse.error('Error in deletedata', 'deletefile()', 500);
        }
        else {
            loggerResponse.info('All data deleted successfully', 'deletefile()', 200);
            console.log(result);
            res.send(result);
        }
    })
}
let increaseview = (req, res) => {
    model.findOne({ userId: req.params.userId }, (err, result) => {
        if (err) {
            let myResponse = userResponse.Message(true, 500, 'Some error occured', null)
            res.send(myResponse);
            loggerResponse.error('Error in increaseview', 'increaseview()', 500);
        }
        else if (check.isEmpty(result)) {
            let myResponse = userResponse.Message(true, 500, 'Some error occured', null)
            res.send(myResponse);
            loggerResponse.error('Error in increaseview', 'increaseview()', 500);
        }
        else {
            result.view = result.view + 1;
            result.save((err, result) => {
                if (err) {
                    let myResponse = userResponse.Message(true, 500, 'Some error occured', null)
                    res.send(myResponse);
                    loggerResponse.error('Error in increaseview', 'increaseview()', 500);
                }
                else {
                    loggerResponse.info('View has been increased', 'increaseview()', 200);
                    res.send(result);
                }
            })
        }
    })
}

let getalldetails = (req, res) => {
    mymodel2.find().exec((err, result) => {
        if (err) {
            let myResponse = userResponse.Message(true, 500, 'Some error occured', null)
            res.send(myResponse);
            loggerResponse.error('Error in getalldetails', 'getalldetails()', 500);
        }
        else if (check.isEmpty(result)) {
            let myResponse = userResponse.Message(true, 500, 'No data found', null)
            res.send(myResponse);
            loggerResponse.error('No data found in getalldetails', 'getalldetails()', 500);
        }
        else {
           
            loggerResponse.error('All data fecthed', 'getalldetails()', 200);
            let myResponse = userResponse.Message(false, 200, 'All data fecthed', result)
            res.send(myResponse);
        }
    })
}

//*****/
let signupFunction = (req, res) => {
    let email = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                if (!emailpass.Email(req.body.email)) {
                    loggerResponse.error('Error in email', 'signupfunction-email()', 200);
                    let myResponse = userResponse.Message(true, 300, 'Error in email', null)
                    reject(myResponse);
                }
                else if (check.isEmpty(req.body.password)) {
                    loggerResponse.error('Password is missing', 'signupfunction-email()', 200);
                    let myResponse = userResponse.Message(true, 300, 'Password is missing', null)
                    reject(myResponse);
                }
                else {
                    resolve(req)
                }
            }
            else {
                loggerResponse.error('Parameters are missing', 'signupfunction-email()', 200);
                let myResponse = userResponse.Message(true, 300, 'Parameters are missing', null)
                reject(myResponse);
            }
        })
    }
    let createsaveuser = () => {
        return new Promise((resolve, reject) => {
            mymodel2.findOne({ email: req.body.email }).exec((err, result) => {
                if (err) {
                    loggerResponse.error('Error in email', 'signupfunction-createsaveuser()', 200);
                    let myResponse = userResponse.Message(true, 300, 'Error in email', null)
                    reject(myResponse);
                }
                else if (check.isEmpty(result)) {
                    let savedata = new mymodel2({
                        userId: shortid.generate(),
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        password: Password.hashpassword(req.body.password),
                        email: req.body.email.toLowerCase(),
                        mobileNumber: req.body.mobileNumber,
                        createdOn: Date.now()
                    })
                    savedata.save((err, savedata) => {
                        if (err) {
                            loggerResponse.error('Error while saving data', 'signupfunction-createsaveuser()', 200);
                            let myResponse = userResponse.Message(true, 300, 'Error while saving data', null)
                            reject(myResponse);
                        }
                        else {
                            savedataobj = savedata.toObject();
                            resolve(savedataobj);
                        }
                    })

                }
                else {
                    loggerResponse.error('User already present', 'signupfunction-createsaveuser()', 200);
                    let myResponse = userResponse.Message(true, 300, 'User already present', null)
                    reject(myResponse);
                }
            })
        })
    }
    email(req, res)
        .then(createsaveuser)
        .then((resolve) => {
            let myResponse = userResponse.Message(false, 200, 'user created', resolve)
            res.send(myResponse);
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
}
//Loginfunction***
let Loginfunction = (req, res) => {
    let finduser = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                console.log(req.body.email);
                mymodel2.findOne({ email: req.body.email }).exec((err, result) => {
                    if (err) {
                        loggerResponse.error('Error in find user', 'Loginfunction-finduser()', 200);
                        let myResponse = userResponse.Message(true, 300, 'Unable to login', null)
                        reject(myResponse);
                    }
                    else if (check.isEmpty(result)) {
                        loggerResponse.error('No data available', 'Loginfunction-finduser()', 200);
                        let myResponse = userResponse.Message(true, 300, 'No data found', null)
                        reject(myResponse);
                    }
                    else {
                        resolve(result);
                        loggerResponse.info('Data found in our database', 'Loginfunction-finduser()', 200);
                    }
                })
            }
            else {
                loggerResponse.error('Email parameter is missing', 'Loginfunction-finduser()', 200);
                let myResponse = userResponse.Message(true, 300, 'Email parameter is missing', null)
                reject(myResponse);
            }
        })
    }
    let validatepassword = (fectheddata) => {
        return new Promise((resolve, reject) => {
            Password.comparePassword(req.body.password, fectheddata.password, (err, result) => {
                if (err) {
                    loggerResponse.error('Error in password', 'Loginfunction-validatepassword()', 200);
                    let myResponse = userResponse.Message(true, 300, 'Error in password', null)
                    reject(myResponse);
                }
                else if (result) {
                    fectheddataobj = fectheddata.toObject();
                    delete fectheddataobj.password;
                    resolve(fectheddataobj);
                }
                else {
                    loggerResponse.error('Password parameter is missing', 'Loginfunction-validatepassword()', 200);
                    let myResponse = userResponse.Message(true, 300, 'Password parameter is missing', null)
                    reject(myResponse);
                }
            })
        })
    }

let generateToken=(alldata)=>{
return new Promise((resolve,reject)=>{
    Jwttoken.generateJWT(alldata,(err,data)=>{
        if(err)
        {
            console.log(err);
            loggerResponse.error('Unable to generate token', 'Loginfunction-generateToken()', 200);
            let myResponse = userResponse.Message(true, 300, 'Unable to generate token', null)
            reject(myResponse);      
        }
        else{
           data.alldata=alldata
            resolve(data);
        }
    })
})
}
let savetokens=(alldetails)=>{
    //console.log('savetokens');
    console.log(alldetails);
return new Promise((resolve,reject)=>{
authTokendatabase.findOne({userId:alldetails.userId}).exec((err,result)=>{
    if(err)
    {
        loggerResponse.error('Unable to save token', 'Loginfunction-savetokens()', 200);
        let myResponse = userResponse.Message(true, 300, 'Unable to save token', null)
        reject(myResponse);      
    }
    else if(check.isEmpty(result))
    {
    let newdatas=new authTokendatabase({
    userId:alldetails.alldata.userId,
    authToken:alldetails.token,
    secretkey:alldetails.secretkey
    })
    newdatas.save((err,finaldata)=>{
   if(err)
   {
    loggerResponse.error('Unable to generate token', 'Loginfunction-savetokens()', 200);
    let myResponse = userResponse.Message(true, 300, 'Unable to generate token', null)
    reject(myResponse);    
   }
   else{
       let myfinalresponse={
        authToken :finaldata.authToken,
        userdetails:alldetails.alldata
       }
       resolve(myfinalresponse);
   }
})
}
else{
    retrivedetails.authToken=alldetails.token;
    retrivedetails.secretkey=alldetails.secretkey;
    retrivedetails.save((err,finaldetails)=>{
        if(err)
        {
    loggerResponse.error('Unable to generate token', 'Loginfunction-savetokens()', 200);
    let myResponse = userResponse.Message(true, 300, 'Unable to generate token', null)
    reject(myResponse); 
    }
    else{
        let myfinalresponse={
            authToken :finaldetails.authToken,
            userdetails:alldetails.alldata
           }
           resolve(myfinalresponse);
    }
    })

}
})
})
}
    finduser(req,res)
    .then(validatepassword)
    .then(generateToken)
    .then(savetokens)
    .then((resolve)=>{
        let myResponse = userResponse.Message(false,200, 'You are Login', resolve)
        res.send(myResponse);
    })
    .catch((err)=>{
        console.log(err);
        res.send(err);
    })
}
module.exports = {
    RouteParameter: RouteParameter,
    queryparameter: queryparameter,
    bodyparameter: bodyparameter,
    createData: createData,
    getalldata: getalldata,
    getdatabyuserid: getdatabyuserid,
    editData: editData,
    deletefile: deletefile,
    increaseview: increaseview,
    signupFunction: signupFunction,
    getalldetails: getalldetails,
    Loginfunction: Loginfunction
}