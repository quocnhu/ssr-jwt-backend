'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.belongsToMany(models.Group, {
        through: 'GroupRole',
        foreignKey: 'roleId',
        otherKey: 'groupId',
        as: 'groups',
      });
    }
  }
  Role.init({
    url: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Role',
    tableName: 'roles',
    freezeTableName: true,
  });
  return Role;
};