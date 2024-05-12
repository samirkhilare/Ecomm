const { loginValidation, registerValidation } = require("../middleware/validation");
const User = require("../modules/userSchema");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

exports.loginUser = async (params) => {
  const { error } = loginValidation(params);
  if (error) throw { message: error.details[0].message, statusCode: 400 };

  const { email, password } = params;
  const hashedPassword = md5(password.toString());

  try {
    const user = await User.findOne({ email, password: hashedPassword });
    if (!user) {
      throw { message: "Wrong credentials, please try again", statusCode: 400 };
    }
    const token = jwt.sign({ data: user }, "secret");
    return { message: "Logged in successfully", data: user, token };
  } catch (error) {
    throw { message: "Something went wrong, please try again", statusCode: 400, data: error };
  }
};

exports.registerUser = async (params) => {
  // const { error } = registerValidation(params);
  // if (error) throw { message: error.details[0].message, statusCode: 400 };

  const { fullName, email, password } = params;
  const hashedPassword = md5(password.toString());

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw { message: "Email address is in use, please try a different one", statusCode: 400 };
    }

    const newUser = await User.create({ fullName, email, password: hashedPassword });
    const token = jwt.sign({ data: newUser }, "secret");
    return { data: newUser, message: "You have successfully registered.", token, statusCode: 200 };
  } catch (error) {
    console.log('ERROR : ', error);
    throw { message: "Something went wrong, please try again", statusCode: 400, data: error };
  }
};
