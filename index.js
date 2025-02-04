import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";
import prisma from "./lib/prisma.js";
// import dotenv from "dotenv";
// dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL_LOCAL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome",
  });
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

// prisma.user.deleteMany();
app.listen(8800, () => {
  console.log("Server is running!");
});
