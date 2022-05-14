var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

//swagger관련 코드
const swaggerUi = require("swagger-ui-express");//express와 관련된 swagger ui 라이브러리
const swaggerJsdoc = require("swagger-jsdoc"); //자바스크립트 주석을 처리하면 주석내용을 swagger에 반영하는 라이브러리
const options = {
  definition: {
    openapi: "3.0.0", //open api버전
    info: {
      title: "Hello World",
      version: "1.0.0", //api 버전
    },
  },
  apis: ["./routes/*.js"], // routes안에 js파일을 scan함
};
const openapiSpec = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpec)); //api-docs 접속하면 seagger문서를 볼 수 있음

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use('/api', require('./routes/api'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

// npm install -S swagger-ui-express swagger-jsdoc
//swagger-ui-express: express와 관련된 swagger ui 라이브러리
//swagger-jsdoc: 자바스크립트 주석을 처리하면 주석내용을 swagger에 반영하는 라이브러리


//http://localhost:4000/api-docs/ 접속하면 api를 문서화해서 볼 수 있음