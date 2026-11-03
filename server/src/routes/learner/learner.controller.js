const { Router } = require("express");
const { getLearners } = require("./learner.service");

const router = Router();

router.get("/learner", async (req, res, next) => {
  try {
    const result = await getLearners();
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
