const express = require("express");
const session = require("express-session");
require("dotenv").config();
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const passport = require("./auth");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const app = express();
const prisma = new PrismaClient();


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 500 * 60 * 1000,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/upload", uploadRouter);
app.use("/folders", folderRouter);


app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});


app.listen(3000, () => {
  console.log("Listening on port 3000");
});
