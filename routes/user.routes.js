const express = require("express");
const { body } = require("express-validator");
const { upload_profile } = require("../config/storage");
const { patientRegister, addPsychiatrist, psychiatrist, hospitalDetails } = require("../controllers/user.controller");
const { form } = require("../middleware/validator");
const { authToken } = require("../services/authenticate");
const bodyParser = require("body-parser")
const validation = require("../middleware/validator");
const { addUserValidation } = require("../middleware/userValidator");
const router = express.Router();

const urlencodedParser = bodyParser.urlencoded({ extended: false });
router.post("/", upload_profile.single("myField"), authToken ,addUserValidation ,patientRegister);
router.post("/find",addPsychiatrist)
router.post("/token", psychiatrist);
router.post("/hospital" , hospitalDetails)

module.exports = router;
