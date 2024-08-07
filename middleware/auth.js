
const jwt=require('jsonwebtoken');
const { JWT_SECRET } = require("../utils/config");
const User=require('../models/user');


const auth={
    verifyToken:async(req,res,next)=>{
        try{
            const Token=req.cookies.token;
            if(!Token){
                return res.send({message:'Token not found'});
            }
            try{
                const decoded=JWT.verify(token,JWT_SECRET);
                req.userId=decoded.Id;
                next();
            }catch(error){
                return res.send({message:'Invalid token'});
            }
        }catch(error){
            res.send({message:error.message})
        }
    },
    isAdmin: async (req, res, next) => {
        try {
            const userId = req.userId;
            const user = await User.findById(userId);

         if (!user) {
                return res.send({ message: 'User not found' });
            }

            if (user.role !== 'admin') {
                return res.send({ message: 'Unauthorized' });
            }

            next();
        } catch (error) {
            res.send({ message: error.message })
        }
    }
}

module.exports=auth;