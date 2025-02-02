const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
   const token = req.headers.authorization?.split(" ")[1];
   if (!token) return res.status(400).json({ message: "Unauthorized" });
  
   try {
   const verified = jwt.verify(token, process.env.JWT_TOKEN);
   req.user = verified
   next();
   } catch {
   res.status(400).json({ message: "Invalid token" });
   }
  };

  module.exports = authMiddleware;