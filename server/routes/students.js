const express = require("express");
const router = express.Router();
const studentsController = require("../controllers/studentsController");

router.get("/",studentsController.view);
router.get("/adduser",studentsController.adduser);
router.post("/adduser",studentsController.save);


module.exports = router;