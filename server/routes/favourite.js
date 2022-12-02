const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.post("/add", authorization, async (req, res) => {
  
});

router.post("/delete", authorization, async (req, res) => {
  
});

router.post("/show", authorization, async (req, res) => {
  
});

module.exports = router;
