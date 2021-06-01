const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(require("./routes"));

/* mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/pizza-hunt", {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); */

// Use this to log mongo queries being executed!
mongoose.set("debug", true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));

const connection =
  "mongodb+srv://mmm97m:mebechjo!1@cluster0/pizza-hunt-db?retryWrites=true&w=majority";
mongoose
  .connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.log(err));
