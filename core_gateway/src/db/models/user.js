const Sequelize = require("sequelize");
const uuidv4 = require("uuid/v4");

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      user_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
        allowNull: false
      },
      role_code: {
        /** Improvement tip: Decouple this as an association with roles and permissions */
        type: Sequelize.STRING,
        allowNull: false
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING
      },
      auth_token: {
        type: Sequelize.STRING,
        allowNull: false
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        default: true
      },
      is_admin: {
        type: Sequelize.BOOLEAN,
        default: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      deleted_at: {
        type: Sequelize.DATE
      }
    },
    {
      schema: "public",
      timestamps: true,
      freezeTableName: true,
      paranoid: true,
      updatedAt: "updated_at",
      createdAt: "created_at",
      deletedAt: "deleted_at"
    }
  );

  return user;
};
