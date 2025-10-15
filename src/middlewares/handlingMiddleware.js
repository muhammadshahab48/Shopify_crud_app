const jwt = require("jsonwebtoken");
const { STATUS_CODES } = require("../utils/constants")

const notFoundHandling = (req, res) => {
  return res.status(STATUS_CODES.ERROR.NOT_FOUND).json({
    status: false,
    message: "Route not found",
    path: req.originalUrl,
  })
};

const healthCheckHandling = (req, res) => {
  return res.status(200).send({
    status: true,
    message: "Server is Running",
  })
};

const loggingHandling = (req, res, next) => {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.originalUrl}`);
  next();
};

const generateToken = (req, res) => {
  const token = jwt.sign({
    id: "1",
    name: "testing user",
    description: "this user is only for testing purpose for test the apis"
  }, process.env.JWT_KEY);
  return res.status(STATUS_CODES.SUCCESS.OK).send({
    status: true,
    message: "Successfully generate token",
    token: token
  })
};


module.exports = {
  notFoundHandling,
  healthCheckHandling,
  loggingHandling,
  generateToken
}