const mongoose = require('mongoose'),
mySchema = mongoose.Schema;

let myData = new mySchema({
  userId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  mobileNumber: {
    type: Number,
    default: 0
  },
  createdOn :{
    type:Date,
    default:""
  },
  view:{
    type:Number,
    default:0
  },
  key:{
    type:String,
    default:''
  }
})


mongoose.model('Test', myData);