const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        // console.log("authMidleware: ", err);
        return res.status(401).json({ message: "Auth failed", success: false });
      } else {
        // console.log("authMidleware: ", decoded);
        req.body.userId = decoded.id;
        // console.log("authMiddleware req body: ", req.body)
        next();
      }
    });
  } catch (error) {
    return res.status(401).json({ message: "Auth failed", success: false });
  }
};
