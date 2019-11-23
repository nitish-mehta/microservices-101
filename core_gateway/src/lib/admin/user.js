const Model = require("../../db/models");

const User = Model.user;
const { ERROR_TYPES } = require("../../config/constants");
const { throwIf } = require("../../utils/ErrorHandler");

/**
 * Fetches the list of all users
 */
async function getAllUsers() {
  const aUsers = await throwIf(
    User.findAll({ raw: true }).then(users => {
      return users;
    }),
    {
      type: ERROR_TYPES.DB_ERROR,
      msg: "Unable to fetch list of users"
    }
  );

  return aUsers;
}

/**
 * Creates new user account in our database
 * @param {json} oUserObj userObject with details
 */
async function createUser(oUserObj) {
  // TODO: Validate if user object contains all required parameters

  const oNewUserObj = {
    first_name: oUserObj.first_name,
    last_name: oUserObj.last_name,
    email: oUserObj.email,
    phone: oUserObj.phone,
    auth_token: oUserObj.password,
    role_code: oUserObj.role_code
  };

  oNewUserObj.is_admin = !!oUserObj.is_admin;

  const oSavedUser = await throwIf(
    User.create(oNewUserObj).then(newUser => {
      return newUser;
    }),
    {
      type: ERROR_TYPES.DB_ERROR,
      msg: "Failed to create new user"
    }
  );

  return oSavedUser;
}

async function getUserByProperty(params) {
  const userObj = await throwIf(
    User.findOne({
      raw: true,
      where: {
        ...params
      }
    }),
    {
      type: ERROR_TYPES.DB_ERROR,
      msg: "Failed to fetch user by given params"
    }
  );
  return userObj;
}

/**
 * Gets details of user which satify given params
 * @param params- object having email parameter for email of the user to map
 */
async function getUserDetails(params) {
  const userObj = await throwIf(
    User.findAll({
      raw: true,
      where: {
        ...params
      }
    }),
    {
      type: ERROR_TYPES.DB_ERROR,
      msg: "Failed to fetch user by given params"
    }
  );
  if (!userObj || userObj.length == 0) {
    return [];
  }
  delete userObj[0].auth_token;
  return userObj[0];
}

module.exports = {
  getAllUsers,
  createUser,
  getUserByProperty,
  getUserDetails
};
