const { updateUserValidation } = require("../middleware/validation");
const User = require("../modules/userSchema");
const md5 = require("md5");

exports.updateUser = async (params) => {
  const { error } = updateUserValidation(params);
  if (error) throw { message: error.details[0].message, statusCode: 400 };

  const { userId, fullName, email, password } = params;
  const hashedPassword = md5(password.toString());

  try {
    const user = await User.findOne({ _id: userId, password: hashedPassword });
    if (!user) {
      throw { message: "Wrong credentials, please try again", statusCode: 400 };
    }

    if (email === user.email && fullName === user.fullName) {
      throw { message: "No new data has been provided", statusCode: 400 };
    }

    const updateFields = {};
    if (email !== user.email) {
      updateFields.email = email;
    }
    if (fullName !== user.fullName) {
      updateFields.fullName = fullName;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });
    return {
      message: "User details have been successfully updated",
      data: updatedUser,
    };
  } catch (error) {
    throw { message: "Failed to update user details", statusCode: 500, data: error };
  }
};
