const express = require("express");
const {
  signupUser,
  loginUser,
  logoutUser,
  authMiddleware,
  verifyOTP,
  updateProfile,
  verifyPhone,
} = require("../../controllers/auth/auth-controller");
const User = require("../../models/User");

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/verify-otp", verifyOTP);
router.put("/update-profile", authMiddleware, updateProfile);
router.put("/verify-phone", authMiddleware, verifyPhone);

router.get("/check-auth", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Authenticated User!",
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
    res.status(500).json({
      success: false,
      message: "Error checking authentication",
    });
  }
});

module.exports = router;
