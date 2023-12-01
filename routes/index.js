const express = require("express");
const router = express.Router();

const authRoute = require("./auth");

router.get("/", (req, res, next) => {
  return next({ statusCode: 404, message: "API is Not Found" });
});

router.use("/auth", authRoute);

router.get("/*", (req, res, next) => {
  return next({ statusCode: 404, message: "API is Not Found" });
});

router.use((err, req, res, next) => {
  if (!err) {
    err.statusCode = 500;
    err.message = "Internal Server Error";
  }
  res.status(err.statusCode).json({ message: err.message });
});

module.exports = router;
