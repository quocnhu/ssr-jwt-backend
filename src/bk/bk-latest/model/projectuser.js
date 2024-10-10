'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProjectUser.belongsTo(models.Project, { foreignKey: 'projectId' });
      ProjectUser.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  ProjectUser.init({
    projectId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'ProjectUser',
    tableName: 'project_users',
    freezeTableName: true,
  });
  return ProjectUser;
};