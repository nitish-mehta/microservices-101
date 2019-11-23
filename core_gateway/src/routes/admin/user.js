const express = require("express");
const libAdminUser = require("../../lib/admin/user");
const router = express.Router();

/**
 * Fetch list of users
 * @param {Object} req request object
 * @param {Object} res response object
 */
async function getAllUsers(req, res) {
  try {
    const response = await libAdminUser.getAllUsers();
    res.status(200).json(response);
    logger.info({
      req,
      message: "Loaded list of users",
      section: "routes.admin.user.getAllUsers"
    });
  } catch (error) {
    res.status(500).json(error);
    logger.error({
      req,
      message: "Failed to load list of users",
      section: "routes.admin.permission.getAllUsers",
      errorDetails: error
    });
  }
}

/**
 * Create new user account
 * This API creates new user account in Auth0, creates user in our database and sends invitiation email to the user
 * @param {Object} req request object
 * @param {Object} res response object
 */
async function createUser(req, res) {
  try {
    const response = await libAdminUser.createUser(req.body);

    res.status(200).json(response);
    logger.info({
      req,
      message: "Created new user",
      section: "routes.admin.user.createUser"
    });
  } catch (error) {
    res.status(500).json(error);
    logger.error({
      req,
      message: "Failed to create new user account",
      section: "routes.admin.permission.createUser",
      errorDetails: error
    });
  }
}

router.get("/", getAllUsers);
router.post("/", createUser);

module.exports = router;
