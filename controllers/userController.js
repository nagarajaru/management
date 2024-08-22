const User = require("../models/user");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const{JWT_SECRET}=require('../utils/config');
const user = require("../models/user");

const userController={
    //getdata:(req,res)=>{
      //  res.send('Hello World!!');
    //}
    register:async(req,res)=>{
        try{
            const{name,email,password}=req.body;
            const user=await User.findOne({email});
            if(user){
                return res.send({message:'user already exists'});
            }
            const hashedpassword=await bcrypt.hash(password,10);

            const newUser=new User({name,email,password});
            
            const savedUser=await newUser.save();
            
            res.send({message:'user created successfully',user:savedUser});

        }catch(error){
            res.send({message:error.message});
        }
    },
    login:async(req,res)=>{
        try{
            const {email,password}=req.body;
            const user=await User.findOne({email});
            if(!user){
                return res.send({message:'User does not exist'});
            }
            const isPasswordcorrect= bcrypt.compare(password,user.password);
            if(!isPasswordcorrect){
                return res.send({message:'Invalid credentials'})
            }
            const token=jwt.sign({id:user._id},JWT_SECRET);
            res.cookie('token',token,{
                httpOnly:true,
                sameSite:true,
                secure:false,
                expires:new Date(new Date().getTime()+ 24 * 60 * 60 * 1000)
            });
            res.send({message:'Login successful',user});
        }catch(error){
            res.send({message:error.message})
            console.log(error);
        }
    },
    logout:async (req,res)=>{
        try{
            res.clearCookie("token", {
                httpOnly: true,
                sameSite: "none",
                secure: false, // Secure should be true in production
              });

            
            res.send({message:'Logout successful'});
        }catch(error){
            res.send({message:error.message})
        }
    },
    getprofile:async(req,res)=>{
        try{
            const userId=req.userId;
            const userProfile=await User.findById(userId);
            if(!userProfile){
                return res.send({message:'user does not exist'});
            }
            res.send({message:'User Profile',user:userProfile});
        }catch(error){
            res.send({message:error.message})
        }
    },
    updateprofile:async(req,res)=>{
        try{
            const userId=req.userId;
            const{name,email}=req.body;
            const user=await User.findById(userId);
            if(!user){
                return res.send({message:'User does not exist'});
            }
            user.name=name || user.name;
            user.email=email || user.email;
            const updatedUser=await user.save();
            res.send({message:'User profile updated successfully',user:updatedUser});
        }catch(error){
            res.send({message:error.message})
        }
    },
    deleteprofile:async(req,res)=>{
        try{
           const userId=req.userId;
           const deletedUser=await User.findByIdAndDelete(userId);
           if(!deletedUser){
            return res.send({message:'user does not exist'});
           }
           res.send({message:'User deleted successfully',user:deletedUser});
        }catch(error){
            res.send({message:error.message})
        }
    },
    getUsers: async (req, res) => {
        try {
            
            const users = await User.find();

            
            res.send({ message: 'All users', users });

        } catch (error) {
            res.send({ message: error.message })
        }
    },
    getUser: async (req, res) => {
        try {
            
            const userId = req.params.id;

            
            const user = await User.findById(userId);

            
            if (!user) {
                return res.send({ message: 'User does not exist' });
            }

        
            res.send({ message: 'User', user });

        } catch (error) {
            res.send({ message: error.message })
        }
    },

    updateUser: async (req, res) => {
        try {
            
            const userId = req.params.id;

        
            const { name, email } = req.body;

            
            const user = await User.findById(userId);

    
            if (!user) {
                return res.send({ message: 'User does not exist' });
            }

    
            user.name = name || user.name;
            user.email = email || user.email;

    
            const updatedUser = await user.save();

            
            res.send({ message: 'User updated successfully', user: updatedUser });

        } catch (error) {
            res.send({ message: error.message })
        }
    },

    deleteUser: async (req, res) => {
        try {
            
            const userId = req.params.id;


            const deletedUser = await User.findByIdAndDelete(userId);

        
            if (!deletedUser) {
                return res.send({ message: 'User does not exist' });
            }

            
            res.send({ message: 'User deleted successfully', user: deletedUser });

        } catch (error) {
            res.send({ message: error.message })
        }
    },
    checkAuth: async (req, res) => {
        try {
            
            const token = req.cookies.token;

            
            if (!token) {
                return res.status(401).send({ message: 'Access denied' });
            }

        
            try {
                const decoded = jwt.verify(token, JWT_SECRET);
                return res.status(200).send({ message: 'Valid token' });
            } catch (error) {
                return res.status(401).send({ message: 'Invalid token' });
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
}

module.exports=userController;