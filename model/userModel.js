const { sequelize } = require("../config/dbConnect"); // DB connection
const { DataTypes } = require("sequelize"); // Data types

    // User table
const UserModel = sequelize.define("users", {
  firstName: {
    type: DataTypes.STRING,     // String type
    allowNull: false,           // Required field
  }, 
  lastName: DataTypes.STRING,   // Optional string

  email: {
    type: DataTypes.STRING,    // Email string
    unique : true,            // Unique value
    allowNull: false,         // Required field
    validate: {
    isEmail: true             // Email format
    }
  },
  password:{
    type : DataTypes.STRING,    // Password string
     allowNull: false,          // Required field
  },
  age: DataTypes.INTEGER,      // Integer type

  mobileNumber: {
    type: DataTypes.STRING,    // Mobile string
   allowNull: false,           // Required field
   unique: true                // Unique value
  },
  isActive: {
    type: DataTypes.BOOLEAN,    // Boolean type
    defaultValue: true,         // Default true
  },
});

module.exports = { UserModel };
