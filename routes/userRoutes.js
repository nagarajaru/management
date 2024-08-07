const express=require('express');
const userRouter=express.Router();
const userController=require('../controllers/userController');
const auth=require('../middleware/auth');


//userRouter.get('/',userController.getdata);
userRouter.post('/register',userController.register);
userRouter.post('/login',userController.login);
userRouter.get('/logout',userController.logout);
userRouter.get('/profile',auth.verifyToken,userController.getprofile);
userRouter.put('/profile',auth.verifyToken,userController.updateprofile);
userRouter.delete('/profile',auth.verifyToken,userController.deleteprofile);


userRouter.get('/admin/users', auth.verifyToken, auth.isAdmin, userController.getUsers);
userRouter.get('/admin/users/:id', auth.verifyToken, auth.isAdmin, userController.getUser);
userRouter.put('/admin/users/:id', auth.verifyToken, auth.isAdmin, userController.updateUser);
userRouter.delete('/admin/users/:id', auth.verifyToken, auth.isAdmin, userController.deleteUser);


module.exports=userRouter;