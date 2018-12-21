'use strict';
const config = require('../config/secret');
let jwt = require('jsonwebtoken');
module.exports = (UserModel, bcrypt, compose) => {
  return new class AuthService {

    constructor() {

    }


    async login(req, res) {
      let username = req.body.username;
      let password = req.body.password;
      
      if (username && password) {
        try {
          let passwordMatch = await AuthService.verifyPassword(req);
          if (passwordMatch) {

            let token = AuthService.createToken(username, config);
            // return the JWT token for the future API calls
            res.json({
              success: true,
              message: 'Authentication successful!',
              token: token
            });
          } else {
            return res.status(403).json({
              success: false,
              message: 'Incorrect username or password'
            });
          }
        } catch (err) {
          return res.status(400).json({
            success: false,
            message: err.message
          });
        }

      } else {
        return res.status(400).json({
          success: false,
          message: 'Authentication failed! Please pass the correct input'
        });
      }

    }

    async createUser(req, res) {
      try {
        let password = req.body.password;
        let username = req.body.username;
        let hash = await bcrypt.hash(password, config.saltRounds)
        // Store hash in your password DB.

        //check for the existing user
        let user = await UserModel.findOne({
          username: username
        }).lean().exec()

        if (!user) {
          let totalUsers = await UserModel.find({}).count().lean().exec();
          await UserModel.createOne({
            username: username,
            id: totalUsers + 1,
            password: hash
          })
          // await user.save()
          let token = AuthService.createToken(username, config)
          return res.status(200).send({
            token: token
          })
        }
        throw new Error("user already exist in the system");
      } catch (err) {
        res.status(400).send(err.message)
      }
    }

    static createToken(username, config) {
      return jwt.sign({
        username: username
      }, config.secret);
    }

    static async verifyPassword(req) {
      try {
        let password = req.body.password;
        let username = req.body.username;
        let user = await UserModel.findOne({
          username: username
        }).lean().exec()
        if (user) {
          let isMatch = await bcrypt.compare(password, user.password);
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

    isAuthenticated() {
      return compose()
        .use(function (req, res, next) {
        let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
        if (token) {
          if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
          }
          jwt.verify(token, config.secret, (err, user) => {
            if (err) {
              return res.json({
                success: false,
                message: 'Token is not valid'
              });
            } else {
              req.user = user;
              next();
            }
          });
        } else {
          return res.json({
            success: false,
            message: 'Auth token is not supplied'
          });
        }
      })

    }
  }
}
