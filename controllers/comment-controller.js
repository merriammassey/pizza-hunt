const { Comment, Pizza } = require("../models");

const commentController = {
  // add comment to pizza
  addComment({ params, body }, res) {
    console.log(body);
    Comment.create(body)
      .then(({ _id }) => {
        //add it to the Pizza
        return Pizza.findOneAndUpdate(
          { _id: params.pizzaId },
          //add the comment's _id to the specific pizza
          { $push: { comments: _id } },
          //receive back updated pizza
          { new: true }
        );
      })
      //return Pizza promise
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No such pizza found" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.json(err));
  },

  addReply({ params, body }, res) {
    Comment.findOneAndUpdate(
      { _id: params.commentId },
      { $push: { replies: body } },
      { new: true, runValidators: true }
    )
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.json(err));
  },
  removeReply({ params }, res) {
    Comment.findOneAndUpdate(
      { _id: params.commentId },
      { $pull: { replies: { replyId: params.replyId } } },
      { new: true }
    )
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => res.json(err));
  },
  // remove comment
  removeComment({ params }, res) {
    Comment.findOneAndDelete({ _id: params.commentId })
      .then((deletedComment) => {
        if (!deletedComment) {
          return res.status(404).json({ message: "No comment found" });
        }
        //remove comment from Pizza
        return Pizza.findOneAndUpdate(
          { _id: params.pizzaId },
          { $pull: { comments: params.commentId } },
          { new: true }
        );
      })
      //return updated Pizza
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = commentController;
