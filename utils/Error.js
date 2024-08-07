const unknownendpoint=(req,res)=>{
    res.status(404).send({error:'unknownendpoint'})
}
module.exports=unknownendpoint;