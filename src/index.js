const express = require("express");
 const route =require("./route/route");
const mongoose = require("mongoose");

const multer = require("multer");
const app = express();

app.use(express.json());
app.use(multer().any());
mongoose.set("strictQuery", false);

mongoose
  .connect(
    "mongodb+srv://yachika03:wkaTIq3zkjIou3YI@cluster0.t9qdtvx.mongodb.net/databse1",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));
  app.use('/', route);

app.listen(3001, function () {
  console.log("Express app running on port " + 3001);
});
