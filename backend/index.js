import express from "express";
import PORT from "./config.js";
import connectToDatabase from "./database.js";
import router from "./Routes.js";
import cors from "cors";
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";
import path from "path";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import User from "./Models/userModel.js";
import dotenv from "dotenv";

if (process.env.NODE_ENV != "production") {
  dotenv.config();
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());

const corsOption = {
  origin: "http://localhost:5173",
  credentials:true,
  optionSuccessStatus: 200
}
app.use(cors(corsOption));
app.use(
  fileUpload({
    createParentPath: true,
  })
);

// setting for express-session:
const sessionOption = {
  secret: process.env.SESSION_SECRETE,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() * 7 * 24 * 60 * 60 * 1000, //(One week In milli second),
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOption));

// setting for passport :
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
// passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(router);
connectToDatabase();

// app.get("/", (req, res) => {
//   console.log(req);
//   return res.status(200).send("Welcome to WANDERLUST!");
// });

app.listen(PORT, (req, res) => {
  console.log(`Server created successfully on port : ${PORT}`);
});
