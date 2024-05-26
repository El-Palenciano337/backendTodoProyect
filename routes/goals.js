var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
/* const { response } = require("../app"); */

let goals = [];

const goalInit = mongoose.model(
    "goals",
    {
        name: String,
        description: String,
        dueDate: String,
    },
    "goals"
);

/* GET users listing. */
router.get("/getGoals", function (req, res, next) {
    goalInit
        .find({})
        .then((response) => res.status(200).json(response))
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.post("/addGoals", function (req, res, next) {
    let timestamp = Date.now() + Math.random();
    req.body.id = timestamp.toString();
    goals.push(req.body);
    res.json(goals);
});

router.delete("/removeGoals/:id", function (req, res, next) {
    let id = req.params.id;
    goals = goals.filter((goal) => goal.id !== id);
    res.json(goals);
});

module.exports = router;
