import express from "express";
import mongoose from "mongoose";
import BlogRouter from "./routes/blog-routes";
import router from "./routes/user.router";

const app = express();
app.use(express.json());
app.use("/api/user",router);
app.use("/api/blog",BlogRouter);
app.use("/api", (req, res, next) => {
  res.send("hello da");
});

mongoose
  .connect(
    "mongodb+srv://vurguns:kaptan42@cluster0.m6cep.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => app.listen(5000))
  .then(() => console.log("Baglanti basarılı"))
  .catch((err) => console.log(err));


