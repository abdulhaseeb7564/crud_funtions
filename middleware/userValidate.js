const Jio = require("joi");

  // userSchema 
  // Matlab jab bhi koi user data bhejega (signup form ya API request me), 
  // toh yeh schema check karega ki data valid hai ya nahi
const userSchema = Jio.object({
  firstName: Jio.string().required(),
  lastName: Jio.string().required(),
  email: Jio.string().email().required(),
  password: Jio.string().min(6).required(),
  age: Jio.number().integer().min(0).required(),
  mobileNumber: Jio.number().required(),
  isActive: Jio.boolean().default(true),
});

module.exports = { userSchema };
