const asynchandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next))
      .catch(next)
  }
}

export { asynchandler }




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