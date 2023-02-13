/* eslint-disable no-mixed-spaces-and-tabs */
const router = require('express').Router();
const { validateRequest } = require('../middlewares/auth');
const {authenticateUser, refreshAccessToken} = require('../controllers/auth.js');

router.post('/', validateRequest, authenticateUser);
router.post('/refresh', refreshAccessToken);

module.exports = router;


// const bcrypt = require('bcrypt');
// const UserAuth = require('../models').userAuth;
// const _ = require('lodash');
// const jwt = require('jsonwebtoken');
// const config = require('config');
// router.post('/new', async (req, res)=>{
//   let user = await UserAuth.findOne({
// 	  where: {
// 		  username: req.body.username
// 	  }
//   });
//   if(user)
//     return res.status(200).send('username already exists'); 
	
//   user = _.pick(req.body, ['username', 'password']);
//   const salt = await bcrypt.genSalt(10);
//   user.password = await bcrypt.hash(user.password, salt);

//   await UserAuth.create(user);
  
//   res.status(201).send(_.pick(user, ['username']));
// });


