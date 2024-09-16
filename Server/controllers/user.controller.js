import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register User Login
export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;

    //if any of the field's value is not their, return error
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    // Check if user already exists or not
    const user = await User.findOne({ email });
    if (user)
      return res.status(400).json({
        message: "User is already exist with this email",
        success: false,
      });

    // convert plain text password into hash
    const hashPassword = await bcrypt.hash(password, 10); //hash function takes two arguments, password and salt value means lenght of the hashed password

    // Create User
    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashPassword,
      role,
    });

    return res.status(201).json({
      message: "Account Created Successfully",
      success: true,
    });
  } catch (error) {
    console.log("Unable to Register User: ", error);
  }
};

// Login login
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    //if any of the field's value is not their, return error
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    // Check user is exist or not in our table using email
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        message: "Incorrect Email",
        success: false,
      });

    // Check password is correct or not
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch)
      return res.status(400).json({
        message: "Incorrect Password",
        success: false,
      });

    // Check role is correct or not
    if (role !== user.role)
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false,
      });

    // Token generation
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // toker send to client
    res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: "true",
        sameSite: "strict",
      })
      .json({
        message: `Welcome Back, ${user.fullName}`,
        user: {
          _id: user._id,
          fullName: user.fullName,
          phoneNumber: user.phoneNumber,
          email: user.email,
          role: user.role,
          profile: user.profile,
        },
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

// logout logic
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log("Unable to logged out: ", error);
  }
};

// Update Profile
export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    const skillsArray = skills && skills.split(",");
    
    const userId = req.id; //This id will set in between using middleware auth
    
    let user = await User.findOne({ _id:userId });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    // update user
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;
    // resume comes later here...

    await user.save();

    res.status(200).json({
      message: `Profile Updated Successfully`,
      user,
      success: true,
    });
  } catch (error) {
    console.log("Unable to update profile: ", error);
  }
};
