const express = require("express");
const router = express.Router();

const auth = require("./auth");
const userRoute = require("./user")

router.get("/", (req, res, next) => {
  return next({ statusCode: 404, message: "API is Not Found" });
});

router.use("/auth", auth.router);
router.use("/user", userRoute);

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
