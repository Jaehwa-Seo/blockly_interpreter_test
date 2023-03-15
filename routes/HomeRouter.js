const express = require('express');

const { HomeController } = require("../controllers");

const router = express.Router();

router.get("/", HomeController.home );
router.get("/test", HomeController.test );

router.get("/coding", HomeController.coding );
router.get("/engine", HomeController.engine );

module.exports = router;