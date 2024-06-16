import express from "express";
import path from "path";
import { mongoConnection } from "./common/config/database.config";
import handleError from "./common/middlewares/error-handler.middleware";
import routes from "../routes/index";
import swagger from "./common/config/swagger.config";
import passport from "passport";
import "./common/config/jwt-strategy";
import session from "express-session";

require("dotenv").config();

const app = express();
mongoConnection();

app.set("view engine", "ejs");
app.set("views", path.join(`${__dirname}../../src`, "views"));

app.use(
  session({
    secret: "hjs89d",
    resave: "false",
    saveUninitialized: "true",
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/media", express.static(path.join(__dirname, "../media")));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

app.use("/api/documentation", swagger);

app.use("/", routes);
app.use(handleError);

var http = require("http").Server(app);

http.listen(process.env.PORT, () => {
  console.log(`listening at ${process.env.BASE_URL}:${process.env.PORT}`);

  console.log(
    `Swagger Url - ${process.env.BASE_URL}:${process.env.PORT}/api/documentation`
  );
});
