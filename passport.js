const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('./server/models/users');

//Create a passport middleware to handle user registration
passport.use('signup', new localStrategy({
  usernameField : 'email',
  passwordField : 'password'
}, async (email, password, done) => {
    try {
      console.log("i got username and password")
      console.log(email)
      console.log(password)
      //Save the information provided by the user to the the database
      const user = await UserModel.create({ email, password });
      console.log('after create')
      //Send the user information to the next middleware
      return done(null, user);
    } catch (error) {
      done(error);
    }
}));

//Create a passport middleware to handle User login
passport.use('login', new localStrategy({
  usernameField : 'email',
  passwordField : 'password'
}, async (email, password, done) => {
  console.log(email)
  console.log(password)

  try {
    //Find the user associated with the email provided by the user
    const user = await UserModel.findOne({ email });
    if( !user ){
      //If the user isn't found in the database, return a message
      return done(null, false, { message : 'User not found'});
    }
    //Validate password and make sure it matches with the corresponding hash stored in the database
    //If the passwords match, it returns a value of true.
    const validate = await user.isValidPassword(password);
    if( !validate ){
      return done(null, false, { message : 'Wrong Password'});
    }
    //Send the user information to the next middleware
    return done(null, user, { message : 'Logged in Successfully'});
  } catch (error) {
    return done(error);
  }
}));

const JWTstrategy = require('passport-jwt').Strategy;
//We use this to extract the JWT sent by the user
const ExtractJWT = require('passport-jwt').ExtractJwt;

//This verifies that the token sent by the user is valid
passport.use(new JWTstrategy({
  //secret we used to sign our JWT
  secretOrKey : 'top_secret',
  //we expect the user to send the token as a query paramater with the name 'secret_token'
  // jwtFromRequest : ExtractJWT.fromUrlQueryParameter('secret_token')
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (jwt_payload, done) => {
  try {
      //find the user in db if needed
      return UserModel.findOneById({id: jwt_payload._id})
      // return UserModel.findOneById(jwt_payload.id)
      .then(user => {
          return cb(null, user);
      })
      .catch(err => {
          return cb(err);
      });

  } catch (error) {
    done(error);
  }
}));