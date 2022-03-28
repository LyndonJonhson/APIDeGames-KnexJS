const express = require("express");
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const GameController = require("../controllers/GameController");
const UserController = require("../controllers/UserController");
const Auth = require("../middleware/Auth");

router.get("/", HomeController.index);
router.get("/games", Auth, GameController.index);
router.get("/game/:id", Auth, GameController.findGame);
router.post("/game", Auth, GameController.create);
router.delete("/game/:id", Auth, GameController.remove);
router.put("/game/:id", Auth, GameController.edit);
router.post("/auth", UserController.auth);
router.post("/user", UserController.create);

module.exports = router;