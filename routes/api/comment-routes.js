const router = require("express").Router();
//import methods from comment-controller
const {
  addComment,
  removeComment,
  addReply,
  removeReply,
} = require("../../controllers/comment-controller");

router.route("/:pizzaId").post(addComment);

//delete route needs both comment and pizza IDs
//updated to add reply, callback of route method has automatic req and res parameters
router.route("/:pizzaId/:commentId").put(addReply).delete(removeComment);

router.route("/:pizzaId/:commentId:/replyId").delete(removeReply);
module.exports = router;
