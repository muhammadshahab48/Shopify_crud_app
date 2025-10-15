const { STATUS_CODES } = require("../utils/constants");
const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers?.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) return res.status(STATUS_CODES.ERROR.UNAUTHORIZED_ERROR).send({
      status: false,
      message: "Authrization does not exist in headers"
    });
    const token = authHeader.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_KEY);
    req['user'] = user;
    next();
  } catch (error) {
    return res.status(STATUS_CODES.ERROR.UNAUTHORIZED_ERROR).send({
      status: false,
      message: error.message
    })
  }
};

module.exports = {
  authMiddleware
}