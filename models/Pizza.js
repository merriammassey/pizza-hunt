//import dependencies: Schema constructor and model function
const { Schema, model } = require("mongoose");

//define fields with specific data types to regulate data appearance
const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
    size: {
      type: String,
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
    },
    id: false,
  }
);

// with a virtual, get total count of comments and replies on retrieval
PizzaSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

// create the Pizza model using the PizzaSchema
const Pizza = model("Pizza", PizzaSchema);

// export the Pizza model
module.exports = Pizza;
