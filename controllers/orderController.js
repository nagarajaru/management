const order = require("../models/order");

const orderController={
    createOrder:async(req,res)=>{
        try{
            const{products,quantity,total,status}=req.body; 
            const userId=req.userId;
            const newOrder=new orderController({
                user:userId,
                products,
                total,
                status,
            })
            const savedOrder=await newOrder.save();
            res.send({message:'Order created successfully',order:savedOrder});
     }catch(error){
        res.send({message:error.message});
     }
    },
    getAllOrders:async(req,res)=>{
        try{
            const orders=await order.find();
            res.send({message:'All orders',orders});
        }catch(error){
            res.send({message:error.message});
        }
    },
    getOrderById:async(req,res)=>{
        try{
            const orderId=req.params.Id;
            const order=await order.findById(orderId);
            if(!order){
                return res.send({message:'Order does not exist'});
            }
            res.send({message:'Order',order});
        }catch(error){
            res.send({message:error.message});
        }
    },
    updateOrder:async(req,res)=>{
        try{
            const orderId=req.params.Id;
            const{products,total,status}=req.body;
            const updatedOrder=await order.findByIdAndUpdate(orderId,{
                products,
                total,
                status,
            },{new:true});
            if(!updatedOrder){
                return res.send({message:'Order does not exist'});
            }
            res.send({message:'Order updated successfully',order:updatedOrder});
        }catch(error){
            res.send({message:error.message});
        }
    },
    deleteOrder:async(req,res)=>{
        try{
            const orderId=req.params.Id;
            const deletedOrder=await order.findByIdAndDelete(orderId);
            if(!deletedOrder){
                return res.send({message:'Order does not exist'});
            }
            res.send({message:'Order deleted successfully',order:deletedOrder});
        }catch(error){
            res.send({message:error.message});
        }
    }
}

module.exports=orderController;