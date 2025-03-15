const express = require("express");
const session = require("express-session");
require("dotenv").config();
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const passport = require("./auth");
const { PrismaClient } = require("@prisma/client");
const app = express();
const prisma = new PrismaClient();
const signupRouter = require("./routes/signupRoutes.js");
const loginRouter = require("./routes/loginRoutes.js");

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));

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

app.listen(3000, () => {
    console.log("listening on port 3000");
})