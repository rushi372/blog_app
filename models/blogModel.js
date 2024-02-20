const mongoose = require('mongoose');

//Schema
const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required: [true, 'title is required'],
    },
    description:{
        type:String,
        required: [true, 'description is required'],
    },
    image:{
        type:String,
        required: [true, 'image is required'],
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        require: [true, 'Please fill all the fields'],
    },
},
{ timestamps: true }
);

//model
const blogModel = mongoose.model('Blog', blogSchema);

module.exports = blogModel;