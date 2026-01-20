const asynchandler  = (requestHandler) =>{
    (req,res,next)=>{
        Promise.resolve(req,res,next).catch( (err) => next(err))
    }
}


export  {asynchandler}



/*
const asynchandler =(fn ) =>async(req , res, next)=>
{try 
    {
        await fn (req , res, next)
    }catch(error){
        req.status(err.code||500).json ({
            success : false,
            message : err.message
        })
    }
}*/