
const dashService = require("../services/dashboard");

const getUsers = async (req, res) => {
  const users = await dashService.getUsers();
  res.status(200).json(users);
};

const createUsers = async (req, res) => {
  const { username,
    fmno,
    firstname,
    lastname,
    email,
    phoneno,
    role,
    password} = req.body;
  const newUser = await dashService.createUsers({ username,
    fmno,
    firstname,
    lastname,
    email,
    phoneno,
    role,
    password});
  res.status(201).json(newUser);
};

const checkAuth = async (req, res) => {
  const { username, password } = req.body;

  const user = await dashService.checkAuth(username, password);

  //   if(user){
  //     res.status(200).json({message: "Valid Credentials"});
  //   }
  //   else{
  //     res.status(401).json({message: "Invalid Credentials"});
  //   }
  if(!user) {
    res.status(400).json({message: "Bad Credentials. Check username or password"});
    return;
  }
  else {
    res.status(200).json({message: "Valid Credentials"});
    return;
  }
};

module.exports = {
  getUsers,
  createUsers,
  checkAuth
};
    