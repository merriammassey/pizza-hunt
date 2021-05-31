//import dependencies: Schema constructor and model function
const { Schema, model, Types } = require("mongoose");

//import date format function
const dateFormat = require("../utils/dateFormat");

//define fields with specific data types to regulate data appearance
const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //use getter to format date using the dateFormat() function
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    size: {
      type: String,
      required: true,
      enum: ["Personal", "Small", "Medium", "Large", "Extra Large"],
      default: "Large",
    },
    toppings: [],
    //expect an ObjectId and to tell it that its data comes from the Comment model
    comments: [
      {
        type: Schema.Types.ObjectId,
        //tell the Pizza model which documents to search to find the right comment
        ref: "Comment",
      },
    ],
  },
  //tell schema to use virtuals for comment count
  {
    toJSON: {
      virtuals: true,
      //enable getters
      getters: true,
    },
    id: false,
  }
);

// with a virtual, get total count of comments and replies on retrieval
//updated to include replies
//use .reduce() to tally up comment plus replies
PizzaSchema.virtual("commentCount").get(function () {
  return this.comments.reduce(
    (total, comment) => total + comment.replies.length + 1,
    0
  );
});

// create the Pizza model using the PizzaSchema
const Pizza = model("Pizza", PizzaSchema);

// export the Pizza model
module.exports = Pizza;
