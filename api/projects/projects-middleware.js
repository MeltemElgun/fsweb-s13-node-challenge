// projects ara yazılımları buraya
const projectModel = require("./projects-model");

async function checkProjectId(req, res, next) {
  try {
    const isExistProject = await projectModel.get(req.params.id);
    if (!isExistProject) {
      res.status(404).json({ message: "not projects" });
    } else {
      req.project = isExistProject;
      next();
    }
  } catch (error) {
    next(error);
  }
}

async function checkPayload(req, res, next) {
  try {
    let { name, description } = req.body;
    if (!name || !description) {
      res.status(400).json({ message: "there is a missing field" });
    } else {
      req.payloadProject = {
        name: name,
        description: description,
        completed: req.body.completed,
      };
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  checkProjectId,
  checkPayload,
};
