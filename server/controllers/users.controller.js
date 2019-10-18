const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require('../models/user.model');

// module.exports.list = (req, res, next) => {
//   User.find()
//     .then(users => {
//       res.render('users/list', {
//         users: users
//       });
//     })
//     .catch(error => next(error));
// }

module.exports.create = (req, res, next) => {

  
  
  
  
  
  // // Check for non empty user or password
  // if (!username || !password){
    //   next(new Error('You must provide valid credentials'));
    // }
    
    // // Check if user exists in DB
    // User.findOne({ username })
    // .then( foundUser => {
      //   if (foundUser) throw new Error('Username already exists');
      
      //   const salt     = bcrypt.genSaltSync(10);
      //   const hashPass = bcrypt.hashSync(password, salt);
      
      //   return new User({
        //     username,
        //     password: hashPass
        //   }).save();
        // })
        // .then( savedUser => login(req, savedUser)) // Login the user using passport
        // .then( user => res.json({status: 'signup & login successfully', user})) // Answer JSON
        // .catch(e => next(e));
        
        
        
        
        ////////////
        
  const {username, password} = req.body;

  User.findOne({ username })
  .then(foundUser => {
    
    if (foundUser) next(new Error('Nombre de usuario en uso'));
      
      user = new User (req.body);
      return user.save()
        .then(user => {
          res.status(200).json(user);
        }).catch(error => {

          function getValidationErrors(errors) {

            let newErrors = {};

            for (fieldError in errors)
              newErrors = {...newErrors, [fieldError]: errors[fieldError].message}

            return JSON.stringify(newErrors);

          }

          if (error instanceof mongoose.Error.ValidationError)
            next(new Error(getValidationErrors(error.errors)));

        })
  })
  .catch(e => next(new Error('Se ha producido un error intentelo de nuevo más tarde o contacte con soporte')));
}


module.exports.currentUser = (req, res, next) => {
  if(req.user){
    res.status(200).json(req.user);
  }else{
    next(new Error('Not logged in'))
  }
}


// module.exports.doDelete = (req, res, next) => {
//   User.findByIdAndRemove(req.params.id)
//     .then(user => {
//       if (!user) {
//         next(createError(404, 'User not found'));
//       } else {
//         res.redirect('/users');
//       }
//     })
//     .catch(error => next(error));
// }
