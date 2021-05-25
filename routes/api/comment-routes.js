const router = require("express").Router();
//import methods from comment-controller
const {
  addComment,
  removeComment,
} = require("../../controllers/comment-controller");

router.route("/:pizzaId").post(addComment);
//delete route needs both comment and pizza IDs
router.route("/:pizzaId/:commentId").delete(removeComment);
module.exports = router;
