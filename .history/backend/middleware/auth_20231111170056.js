import jwt from "jsonwebtoken";
export const veifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if(!token)re
  } catch (err) {
    res.status(500).json(err);
  }
};
