const express = require("express");
const { dbConnection } = require("./config/dbConnect");
const { router } = require("./routes/route");
const { UserModel } = require("./model/userModel");


const app = express();
app.use(express.json());

app.use("/", router);

UserModel.sync({ alter: true });
app.listen(3006, async () => {
  console.log("Server is running on port 3006");
  await dbConnection();
});
