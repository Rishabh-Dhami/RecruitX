const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.routes.js");
const jobRouter = require("./routes/job.routes.js");
const applicantRouter = require("./routes/applicant.routes.js");

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/jobs", applicantRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ success: false, message: err.message || "Internal Server Error" });
});

module.exports = { app };
