const { Router } = require("express");
const { getGallery } = require("../controllers/gallery");

const router = Router();

router.get("/", getGallery);

module.exports = router;