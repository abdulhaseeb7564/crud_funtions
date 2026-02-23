const { Sequelize } = require("sequelize");

     // Naya Sequelize instance create kar rahe hain
    // Yeh database ke saath connection establish karega
const sequelize = new Sequelize(
  "world", // Database ka name 
  "root",  // Database ka username
   "",    // Database ka password (yahan empty hai)
   {
  host: "localhost", // Database server ka address
  dialect: "mysql",  // Kaunsa database use ho raha hai (mysql)
});

  // Async function jo database connection check karegi
const dbConnection = async () => {
  try {
  // Sequelize ka authenticate() method database se connection test karta hai
    await sequelize.authenticate();
   // Agar connection successful ho jaye
    console.log("Connection has been established successfully.");
  } catch (error) {
  // Agar connection fail ho jaye to error yahan catch hoga
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = {
  dbConnection,
  sequelize,
};
