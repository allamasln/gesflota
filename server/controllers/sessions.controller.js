const passport = require('passport');

const login = (req, user) => {
  return new Promise((resolve,reject) => {
    req.login(user, err => {
      console.log('req.login ')
      console.log(user)

      
      if(err) {
        reject(new Error('Something went wrong'))
      }else{
        resolve(user);
      }
    })
  })
}

module.exports.create = (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    
        // Check for errors
        if (err) next(new Error('Something went wrong')); 
        if (!theUser) next(failureDetails)
    
        // Return user and logged in
        login(req, theUser).then(user => res.status(200).json(req.user));
    
      })(req, res, next);
}
module.exports.delete = (req, res) => {
  
  req.logout();
  res.status(200).json({message:'logged out'})
}


// router.post('/login', (req, res, next) => {
//   passport.authenticate('local', (err, theUser, failureDetails) => {
    
//     // Check for errors
//     if (err) next(new Error('Something went wrong')); 
//     if (!theUser) next(failureDetails)

//     // Return user and logged in
//     login(req, theUser).then(user => res.status(200).json(req.user));

//   })(req, res, next);
// });