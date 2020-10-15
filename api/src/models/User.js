const { DataTypes } = require('sequelize');
const { validator } = require('sequelize/types/lib/utils/validator-extras');

module.exports = (sequelize) => {

  sequelize.define('user', {
    firstname:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    username:{
      type: DataTypes.STRING,
      allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }

  });
}; 
  
