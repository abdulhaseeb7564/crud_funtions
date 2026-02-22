const { sequelize } = require("../config/dbConnect");
const { DataTypes } = require("sequelize");

const UserModel = sequelize.define("users", {
  firstName: {
    type: DataTypes.STRING,
   allowNull: false,
  },
  lastName: DataTypes.STRING,

  email: {
    type: DataTypes.STRING,
    unique : true,
    allowNull: false,
    validate: {
    isEmail: true
    }
  },
  password:{
    type : DataTypes.STRING,
     allowNull: false,
  },
  age: DataTypes.INTEGER,

  // mobileNumber: {
  //   type: DataTypes.STRING,
  //  allowNull: false,
  //  unique: true
  // },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = { UserModel };
