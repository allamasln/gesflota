const constants = require('../constants');
const express = require('express');
const router = express.Router();
const sessionsController = require('../controllers/sessions.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// router.get('/', authMiddleware.isAuthenticated, usersController.list);

router.post('/create', sessionsController.create);
router.delete('/delete', sessionsController.delete);



// router.post('/create', usersController.doCreate);
// router.post('/:id/delete', 
//   authMiddleware.isAuthenticated, 
//   authMiddleware.checkRole(constants.ROLE_ADMIN), 
//   usersController.doDelete);

module.exports = router;





// const express = require('express');
// const router  = express.Router();
// const bcrypt = require('bcrypt');
// const User = require('../models/user.model');
// const passport = require('passport');


// const login = (req, user) => {
//   return new Promise((resolve,reject) => {
//     req.login(user, err => {
//       console.log('req.login ')
//       console.log(user)

      
//       if(err) {
//         reject(new Error('Something went wrong'))
//       }else{
//         resolve(user);
//       }
//     })
//   })
// }


// // SIGNUP
// router.post('/signup', (req, res, next) => {

//   const {username, password} = req.body;

//   console.log('username', username)
//   console.log('password', password)

//   // Check for non empty user or password
//   if (!username || !password){
//     next(new Error('You must provide valid credentials'));
//   }

//   // Check if user exists in DB
//   User.findOne({ username })
//   .then( foundUser => {
//     if (foundUser) throw new Error('Username already exists');

//     const salt     = bcrypt.genSaltSync(10);
//     const hashPass = bcrypt.hashSync(password, salt);

//     return new User({
//       username,
//       password: hashPass
//     }).save();
//   })
//   .then( savedUser => login(req, savedUser)) // Login the user using passport
//   .then( user => res.json({status: 'signup & login successfully', user})) // Answer JSON
//   .catch(e => next(e));
// });

// router.post('/login', (req, res, next) => {
//   passport.authenticate('local', (err, theUser, failureDetails) => {
    
//     // Check for errors
//     if (err) next(new Error('Something went wrong')); 
//     if (!theUser) next(failureDetails)

//     // Return user and logged in
//     login(req, theUser).then(user => res.status(200).json(req.user));

//   })(req, res, next);
// });


// router.get('/currentuser', (req,res,next) => {
//   if(req.user){
//     res.status(200).json(req.user);
//   }else{
//     next(new Error('Not logged in'))
//   }
// })


// router.get('/logout', (req,res) => {
//   req.logout();
//   res.status(200).json({message:'logged out'})
// });


// router.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message });
// })

// module.exports = router;
