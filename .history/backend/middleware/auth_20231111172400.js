import jwt from "jsonwebtoken";
export const veifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) return res.status(403).send("Access Denied");
    if (token.startsWith("Bearer")) {
      token = token.slice(7, token.length).trimLeft();
    }
    const veryfied = jwt.verify(token, process.env.JWT_SECRET);
    req.user = veryfied
  } catch (err) {
    res.status(500).json(err);
  }
};
