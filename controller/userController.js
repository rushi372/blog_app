//users callback fun
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

//register user
exports.registerController = async(req, res) => {
    try{
        //destructure
        const {username, email, password} = req.body;

        //validation
        if(!username || !email || !password){
            res.status(400).send({
                success:false,
                message:'Please fill all the fields',
            });
        }
        
        //existing user
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(401).send({
                success:false,
                 message: 'user already exists',
            });
        }
        const hashedPassword = await bcrypt.hash(password,10);
        //new user
        const user = new userModel({username, email, password:hashedPassword});
        await user.save();
        return res.status(201).send({
            status: true,
            message: 'User created',
            user,
        });

    }catch(error){
        console.log(error);
        return res.status(500).send({
            success: false,
            message:'error in register callback',
            error,
        });
    }
};

//getAllUsers
exports.getAllUsers = async(req, res) => {
    try{
        const users = await userModel.find({});
        return res.status(200).send({
            success:true,
            message: 'All register users',
            users,
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message: 'error in getAllUsers callback',
            error,
        });
    }
};

//login user
exports.loginController = async(req, res) => {
    try{
        const {email, password} = req.body; 
        //validation
        if(!email || !password){
            return res.status(400).send({
                success:false,
                message: 'please fill all the fields',
            });
        }

        //find by email
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(200).send({
                success:false,
                message: 'email is not registered',
            });
        }

        //password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).send({
                success:false,
                message: 'iNVALId email or password',
            });
        }

        //after all validation
        return res.status(200).send({
            success:true,
            message:'Logged in successfully',
            user,
        });

    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message: 'error in loginController callback',
            error,
        });
    }
};