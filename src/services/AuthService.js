'use strict';
const config = require('./../config/secret');
module.exports = (UserModel, bcrypt) => {
  return new class AuthService {

    constructor() {

    }


    async login(req, res) {
      let username = req.body.username;
      let password = req.body.password;
      // For the given username fetch user from DB

      // let mockedUsername = 'admin';
      // let mockedPassword = 'password';
      if (username && password) {
        let passwordMatch = await this.verifyPassword(req);
        if (passwordMatch) {
          let token = jwt.sign({username: username}, config.secret);
          // return the JWT token for the future API calls
          res.json({
            success: true,
            message: 'Authentication successful!',
            token: token
          });
        } else {
          res.send(403).json({
            success: false,
            message: 'Incorrect username or password'
          });
        }
      } else {
        res.send(400).json({
          success: false,
          message: 'Authentication failed! Please pass the correct input'
        });
      }
    }

    async createUser(req) {
      try {
        let password = req.body.password;
        let username = req.body.username;
        return bcrypt.hash(password, config.saltRounds, async function (err, hash) {
          // Store hash in your password DB.
          if (err)
            throw new Error("Error in encrypting the password")
          await UserModel.saveOne({
            username: username,
            password: hash
          })
          return hash

        });
      } catch (err) {
        throw err
      }
    }

    async verifyPassword(req) {
      try {
        let password = req.body.password;
        let username = req.body.username;
        let user = await UserModel.findOne({
          username: username
        }).lean().exec()
        if (user) {
          let isMatch = bcrypt.compare(password, user.password);
          if (isMatch) {
            return true
          } else {
            return false
          }
        } else {
          throw new Error("user does not exists")
        }
      } catch (err) {
        throw err
      }
    }

  }
}
