import jwt from "jsonwebtoken";
export const veifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) return res.status(403).send("Access Denied");
 if(token.startsWith) 
} catch (err) {
    res.status(500).json(err);
  }
};
