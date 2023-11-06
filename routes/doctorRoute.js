const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// authMiddleware,


// get doctor profile by userId:
router.get("/profile/:userId",  async (req, res)=>{
  console.log(req.params.userId)
})

module.exports = router;