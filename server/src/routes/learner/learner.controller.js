const { Router } = require("express");
const { getLearners, getLearnerProgress } = require("./learner.service");

const router = Router();

router.get("/learners", async (req, res, next) => {
  try {
    const result = await getLearners();
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
});

router.get("/learners/:username", async (req, res, next) => {
  try {
    const result = await getLearnerProgress(req.params.username, req.query.programId);
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
