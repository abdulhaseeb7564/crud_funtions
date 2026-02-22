const { validate } = require("joi"); //  // validate request body using Joi schema //validate  ya code user ka data check (validate) karta hai
const { userSchema } = require("../middleware/userValidate");
const { UserModel } = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

// Create user
const createUser = async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
      // Create user in the database
    }


    // email validate code 
    const existUsers = await UserModel.findOne({where: {email : req.body.email}});
    if (existUsers) {
      return res.status (900).json({error: "Users is already exist"});
    }

    // phone number  validate
    const mobileNumber = await UserModel.findOne({where: {mobileNumber: req.body.mobileNumber}})

    if (mobileNumber) {
      return res.status(900).json({error: "Users Phone is already exist"})
    }

    // const user = await UserModel.create(req.body);
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)

   const userData = {
  ...req.body,           // saari fields
  password: hashedPassword  // password replace
};

const user = await UserModel.create(userData);
    const token = jwt.sign(
      { id: user.id, email: user.email }, 
      "your_secret_key_123", // Use a long random string in a real project
      { expiresIn: "1h" }    // Token expires in 1 hour
    );

    console.debug(token);

    const userResponse = user.toJSON();
    delete userResponse.password;

    return res.status(201).json({ 
      message: "User Created Successfully", 
      user: userResponse,
      token 
    });

    // return res.status(200).json({ message: "User Created Successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Get all users
const getUser = async (req, res) => {
  try {
    const users = await UserModel.findAll();
    return res.status(200).json({ message: "All User Data", users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const users = await UserModel.findByPk(req.params.id);

    // 1. Check if user was found
    if (!users) {
      return res.status(404).json({
       message:"User is not fond" 
      })
    };

    return res.status(200).json({ message: "User data successfully", users });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.update(req.body);
    return res.status(200).json({
      message: "User Updated Successfully",
      user,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


// Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByPk(req.params.id)

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.destroy()
    return res.status(200).json({ message: "User Deleted Successfully" });

  } catch (error) {
        return res.status(500).json({ error: err.message });
  }
};

// login users  
const loginUsers = async (req, res)=> {
  try {
    const {email, password} = req.body

    const user = await UserModel.findOne({where: {email}})

    if (!user) {
      return res.status(500).json({error: "Users is not found"})
    }
  if (user.password !== password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
      const token = jwt.sign(
      { id: user.id, email: user.email }, 
      "your_secret_key_123", 
      { expiresIn: "1h" }
    );

    const userResponse = user.toJSON()
    delete userResponse.password
    return res.status(201).json ({
    message: "Users Login successfully",
    user: userResponse,
    token
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
  loginUsers,
};
