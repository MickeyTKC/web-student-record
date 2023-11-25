const express = require("express");
const router = express.Router();


router.get("/*",(req,res,next)=>{
    console.log("api does not exsit.")
})

module.exports = router;