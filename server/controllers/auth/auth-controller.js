const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const nodemailer = require("nodemailer");

// Configure nodemailer transporter (using Gmail as an example)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "prateek7525@gmail.com", // Replace with your Gmail
    pass: "rpxh vagn fqwd dbun", // Replace with your app password
  },
});

//signup
const signupUser = async (req, res) => {
  const { userName, email, password, phoneNumber } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message:
          "User is already exist with the same email. Please try again later.",
      });

    const checkUsername = await User.findOne({ userName });
    if (checkUsername)
      return res.json({
        success: false,
        message:
          "User is already exist with the same username. Please try again later.",
      });

    const phone = req.body.phoneNumber;
    if (phone.length !== 10)
      return res.json({
        success: false,
        message: "Phone number must be 10 digits",
      });

    const password = req.body.password;
    if (password.length < 6)
      return res.json({
        success: false,
        message: "Password must be at least 6 characters long",
      });

    const hashPassword = await bcrypt.hash(password, 12);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

    const newUser = new User({
      userName,
      email,
      password: hashPassword,
      phoneNumber,
      otp,
      otpExpiry,
      isVerified: false,
    });
    await newUser.save();

    // Send OTP email
    const mailOptions = {
      from: "prateekkhare2111@gmail.com",
      to: email,
      subject: "Email Verification OTP",
      text: `Your OTP for email verification is: ${otp}`,
    };
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message:
        "Sign Up Successfully. Please verify your email with the OTP sent.",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exist! Please SignUp first",
      });

    if (!checkUser.isVerified) {
      return res.json({
        success: false,
        message: "Please verify your email first.",
      });
    }

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect Password! Please try again",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName, ///
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "LoggedIn Successfully!",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
        phoneNumber: checkUser.phoneNumber,
        isPhoneVerified: checkUser.isPhoneVerified,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};
//logout
const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged Out Successfully!",
  });
};
//auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};

//verify OTP
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found.",
      });
    }
    console.log(user.otp, otp, user.otpExpiry, new Date());
    console.log("DB OTP:", user.otp, typeof user.otp);
    console.log("Input OTP:", otp, typeof otp);

    if (user.otp !== otp || user.otpExpiry < new Date()) {
      return res.json({
        success: false,
        message: "Invalid or expired OTP.",
      });
    }
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();
    res.json({
      success: true,
      message: "Email verified successfully.",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  try {
    const { userName, phoneNumber } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if username is already taken by another user
    if (userName && userName !== user.userName) {
      const existingUser = await User.findOne({ userName });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Username is already taken",
        });
      }
      user.userName = userName;
    }

    // Update phone number if provided
    if (phoneNumber) {
      if (phoneNumber.length !== 10) {
        return res.status(400).json({
          success: false,
          message: "Phone number must be 10 digits",
        });
      }
      user.phoneNumber = phoneNumber;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        email: user.email,
        userName: user.userName,
        role: user.role,
        id: user._id,
        phoneNumber: user.phoneNumber,
        isPhoneVerified: user.isPhoneVerified,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error updating profile",
    });
  }
};

// Verify Phone Number
const verifyPhone = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.phoneNumber !== phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Phone number mismatch",
      });
    }

    user.isPhoneVerified = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Phone number verified successfully",
      user: {
        email: user.email,
        userName: user.userName,
        role: user.role,
        id: user._id,
        phoneNumber: user.phoneNumber,
        isPhoneVerified: user.isPhoneVerified,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error verifying phone number",
    });
  }
};

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  authMiddleware,
  verifyOTP,
  updateProfile,
  verifyPhone,
};
