import  jwt  from "jsonwebtoken";
export  const veifyToken = async(req,res,next)=>{
    try {
        let token = req
    } catch (err) {
        res.status(500).json(err)
    }
}