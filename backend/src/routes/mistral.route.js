const express = require("express");
const router = express.Router();
const MistralCtrl = require("../controllers/mistral.controller");

router.post("/resume", MistralCtrl.resume);

module.exports = router;
