const express = require("express");
const router = express.Router();
const studentsController = require("../controllers/studentsController");

router.get("/",studentsController.view);

//add new student
router.get("/adduser",studentsController.adduser);
router.post("/adduser",studentsController.save);

//edit user
router.get("/edituser/:id",studentsController.edituser);
router.post("/edituser/:id",studentsController.editsave);



//delete user
router.get("/deleteuser/:id",studentsController.delete);



module.exports = router;