const { Router } = require("express");
const learnerController = require("./learner/learner.controller");

const api = Router().use(learnerController);

module.exports = Router().use("/api", api);
