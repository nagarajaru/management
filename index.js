const {MONGODB_URI}=require('./utils/config');
const app=require('./app');

const mongoose=require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
 .then(()=>{
    console.log('connected to mongodb')
 app.listen(3001,()=>{
    console.log('server is running on port 3001');
 });
})
 .catch(err=>console.error("could not connect to mongodb...",err));
