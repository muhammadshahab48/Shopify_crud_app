const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userService = require("../services/userService")
const { userSignupValidation, userLoginValidation, resetPasswordValidation } = require("../schema/userSchema");
const { STATUS_CODES } = require("../utils/constants");

const userSignUpHandler = async (req, res) => {
  try {
    const userData = req?.body ?? {};
    const { error } = userSignupValidation.validate(userData);
    if (error) return res.status(STATUS_CODES.ERROR.VALIDATION_ERROR).send({
      status: false,
      message: error.message
    });
    const user = await userService.createUserService(userData);
    return res.status(STATUS_CODES.SUCCESS.CREATED).send({
      status: true,
      message: "User Signup successfully",
    })
  } catch (error) {
    return res.status(STATUS_CODES.ERROR.SERVER_ERROR).send({
      status: false,
      message: error.message
    })
  }
};

const userLoginHandler = async (req, res) => {
  try {
    const userData = req?.body ?? {};
    const { error } = userLoginValidation.validate(userData);
    if (error) return res.status(STATUS_CODES.ERROR.VALIDATION_ERROR).send({
      status: false,
      message: error.message
    });
    const user = await userService.findOneUserService({ email: userData.email });
    if (!user) throw new Error("User not found ")
    const passwordMatch = await bcrypt.compare(userData.password, user.password);
    console.log(`UserData ${userData.password}, user ${user.password}, match: ${passwordMatch}`);

    if (!passwordMatch) return res.status(STATUS_CODES.ERROR.UNAUTHORIZED_ERROR).send({
      status: false,
      message: "Sorry! your password is incorrect!"
    });
    const token = jwt.sign(user, process.env.JWT_KEY);
    return res.status(STATUS_CODES.SUCCESS.OK).send({
      status: true,
      message: "User Loggedin successfully",
      data: {
        user,
        token
      }
    })
  } catch (error) {
    return res.status(STATUS_CODES.ERROR.SERVER_ERROR).send({
      status: false,
      message: error.message
    })
  }
};

const resetPasswordHandler = async (req, res) => {
  try {
    const userData = req?.body ?? {};
    const requestedUser = req.user;
    const { error } = resetPasswordValidation.validate(userData);
    if (error) return res.status(STATUS_CODES.ERROR.VALIDATION_ERROR).send({
      status: false,
      message: error.message
    });
    const user = await userService.findOneUserService({ email: requestedUser.email });
    if (!user) throw new Error("User not found ")
    const oldPasswordMatch = await bcrypt.compare(userData.oldPassword, user.password);
    if (!oldPasswordMatch) return res.status(STATUS_CODES.ERROR.UNAUTHORIZED_ERROR).send({
      status: false,
      message: "Sorry! your old password is incorrect!"
    });
    const newPassword = await bcrypt.hash(userData.newPassword, 10)
    await userService.updateUserService({ id: user.id }, { password: newPassword })
    return res.status(STATUS_CODES.SUCCESS.OK).send({
      status: true,
      message: "Your Password is reset successfully",
    })
  } catch (error) {
    return res.status(STATUS_CODES.ERROR.SERVER_ERROR).send({
      status: false,
      message: error.message
    })
  }
}


module.exports = {
  userSignUpHandler,
  userLoginHandler,
  resetPasswordHandler
}