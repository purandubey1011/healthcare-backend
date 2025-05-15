let express = require("express");
const {
    homepage,
    contactForm,
    applynow,
    readytoapply
} = require("../controllers/index.controllers");
let router = express.Router();

// home route
router.route("/").get(homepage);

router.route("/contact-form").post(contactForm);

router.route("/applynow-form").post(applynow);

router.route("/readytoapply-form").post(readytoapply);

module.exports = router;