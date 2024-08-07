const requestlogger=(req,res,next)=>{
    console.log('cookies:',req.cookies)
    console.log('method:',req.method)
    console.log('path:',req.path)
    console.log('body:',req.body)
    console.log('query:',req.query)
    console.log('params:',req.params)
    console.log('cookies:',req.cookies)
    console.log('---')
    next()

}

module.exports=requestlogger;