const router = require("express").Router();
const {
  validateUserInfo,
  validateUserAvatar,
  validateUserId,
} = require("../validate/userValidate");

const {
  getAllUsers,
  getUserData,
  updateUserInfo,
  updateUserAvatar,
  getUserId,
} = require("../controllers/users");

router.get("/me", getUserData);
router.get("/", getAllUsers);
router.get("/:id", validateUserId, getUserId);
router.patch("/me", validateUserInfo, updateUserInfo);
router.patch("/me/avatar", validateUserAvatar, updateUserAvatar);

module.exports = router;
