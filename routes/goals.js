var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

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

router.get("/getGoals", function (req, res, next) {
    goalInit
        .find({})
        .then((response) => res.status(200).json(response))
        .catch((err) => res.status(500).json(err));
});

router.delete("/removeGoal/:id", function (req, res, next) {
    console.log(req.params.id);
    if (req.params && req.params.id) {
        let id = req.params.id;
        goalInit
            .deleteOne({ _id: new mongoose.Types.ObjectId(id) })
            .then((response) => {
                res.status(200).json(response);
            })
            .catch((err) => res.status(500).json(err));
    } else {
        res.status(400).json({});
    }
});

router.post("/addGoal", function (req, res, next) {
    if (req.body && req.body.name && req.body.description && req.body.dueDate) {
        const goals = new goalInit(req.body);
        goals
            .save()
            .then(() => res.status(200).json({}))
            .catch((err) => res.status(500).json(err));
    } else {
        res.status(400).json(goals);
    }
});
module.exports = router;
