const mongoose=require('mongoose');
const myToken=mongoose.Schema;

let authToken=new myToken({

userId:{
        type:String,
        default:''
    },
authToken:{
    type:String,
    default:''
},
secretkey:{
    type:String,
    default:''
}
})

mongoose.model('saveToken',authToken);
