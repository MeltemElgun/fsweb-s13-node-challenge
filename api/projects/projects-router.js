// "project" routerını buraya yazın!

const express = require("express");
const router = express.Router();
const projectModel = require("./projects-model");
const { checkProjectId, checkPayload } = require("./projects-middleware");

router.get("/", async (req, res, next) => {
  try {
    const allProjects = await projectModel.get();
    res.status(200).json(allProjects);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", checkProjectId, async (req, res, next) => {
  try {
    res.json(req.project);
  } catch (error) {
    next(error);
  }
});

router.post("/", checkPayload, async (req, res, next) => {
  try {
    let insertedProject = await projectModel.insert(req.payloadProject);
    res.json(insertedProject);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", checkProjectId, checkPayload, async (req, res, next) => {
  try {
    let updatedProject = await projectModel.update(
      req.params.id,
      req.payloadProject
    );
    res.json(updatedProject);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", checkProjectId, async (req, res, next) => {
  try {
    await projectModel.remove(req.params.id);
    res.json({ message: "deletion successful" });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/actions", checkProjectId, async (req, res, next) => {
  try {
    let result = await projectModel.getProjectActions(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
