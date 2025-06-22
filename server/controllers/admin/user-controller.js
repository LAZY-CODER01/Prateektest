const User = require("../../models/User");

const getUserStatistics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    const verifiedUsers = await User.countDocuments({ isVerified: true });
    const unverifiedUsers = await User.countDocuments({ isVerified: false });

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        verifiedUsers,
        unverifiedUsers,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred while fetching user statistics",
    });
  }
};

module.exports = {
  getUserStatistics,
};
