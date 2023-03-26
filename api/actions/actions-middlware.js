// eylemlerle ilgili ara katman yazılımları yazın
const actionsModel = require("./actions-model");
const projectModel = require("../projects/projects-model");

async function checkActionsId(req, res, next) {
  try {
    const isExistActions = await actionsModel.get(req.params.id);
    if (!isExistActions) {
      res.status(404).json({ message: "not actions" });
    } else {
      req.existActions = isExistActions;
      next();
    }
  } catch (error) {
    next(error);
  }
}

async function checkPayloadActions(req, res, next) {
  try {
    let { project_id, description, notes } = req.body;
    let isExistProject = await projectModel.get(project_id);
    let isValidLengthDescription = description && description.length < 128;

    if (!isValidLengthDescription || !isExistProject || !notes) {
      res.status(400).json({ message: "check the entered fields" });
    } else {
      req.payloadActions = {
        project_id: project_id,
        description: description,
        notes: notes,
        completed: req.body.completed,
      };
      next();
    }
  } catch (error) {
    next(error);
  }
}
module.exports = {
  checkActionsId,
  checkPayloadActions,
};
