// "eylem" routerını buraya yazın
const express = require("express");
const router = express.Router();

const actionsModel = require("./actions-model");
const { checkActionsId, checkPayloadActions } = require("./actions-middlware");

router.get("/", async (req, res, next) => {
  try {
    const allActions = await actionsModel.get();
    res.status(200).json(allActions);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", checkActionsId, async (req, res, next) => {
  try {
    res.json(req.existActions);
  } catch (error) {
    next(error);
  }
});

router.post("/", checkPayloadActions, async (req, res, next) => {
  try {
    let insertedActions = await actionsModel.insert(req.payloadActions);
    res.json(insertedActions);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  checkActionsId,
  checkPayloadActions,
  async (req, res, next) => {
    try {
      let updatedActions = await actionsModel.update(
        req.params.id,
        req.payloadActions
      );
      res.json(updatedActions);
    } catch (error) {
      next(error);
    }
  }
);
router.delete("/:id", checkActionsId, async (req, res, next) => {
  try {
    await actionsModel.remove(req.params.id);
    res.json({ message: "deletion successful" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
