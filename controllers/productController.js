const product=require('../models/product');

const productController={
    createProduct:async(req,res)=>{
        try{
            const{name,description,price,image,category,stock}=req.body;
            const newProduct=new product({
                name,
                description,
                price,
                image,
                category,
                stock
            });
            const savedProduct=await newProduct.save();
            res.send({message:'Product created successfully',product:savedProduct}); 
        }catch(error){
            res.send({message:error.message});
        }
    },
    getAllProducts:async(req,res)=>{
        try{
            const products=await Product.find();
            res.send({message:'All Products',products});
        }catch(error){
            res.send({message:error.message});
        }
    },
    getProductById:async(req,res)=>{
        try{
            const productId=req.params.id;
            const product=await Product.findById(productId);
            if(!product){
                return res.send({message:'Product does not exist'});
            }
            res.send({message:'Product',product});
        }catch(error){
            res.send({message:error.message});
        }
    },
    updateProduct:async(req,res)=>{
        try{
            const productId=req.params.id;
            const{name,description,price,image,category,stock}=req.body;
            const updatedProduct=await Product.findByIdAndUpdate(productId,{
                name,
                description,
                price,
                image,
                category,
                stock
            }, {new:true});
            res.send({message:'Product updated successfully',product:updatedProduct});
        }catch(error){
            res.send({message:error.message});
        }
        },
        deleteProduct:async(req,res)=>{
            try{
                const productId=req.params.id;
               const deletedProduct= await Product.findByIdAndDelete(productId);
               if(!deletedproduct)
                return res.send({message:'product does not exist'});
                res.send({message:'Product deleted successfully'});
            }catch(error){
                res.send({message:error.message});
            }
        }
    }
 
    module.exports=productController;