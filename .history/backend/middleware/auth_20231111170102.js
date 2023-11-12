import jwt from "jsonwebtoken";
export const veifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if(!token)return res.sta
  } catch (err) {
    res.status(500).json(err);
  }
};
