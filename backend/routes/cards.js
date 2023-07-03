const router = require("express").Router();
const {
  validateCardData,
  validateCardById,
} = require("../validate/cardValidate");

const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

router.get("/", getAllCards);
router.post("/", validateCardData, createCard);
router.delete("/:id", validateCardById, deleteCard);
router.put("/:id/likes", validateCardById, likeCard);
router.delete("/:id/likes", validateCardById, dislikeCard);

module.exports = router;
