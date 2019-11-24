'use strict';
const config = require('../config/secret');
let jwt = require('jsonwebtoken');
module.exports = (UserModel, bcrypt, compose) => {
  return new class AuthService {

    constructor() {

    }


    async login(req, res) {
      let userName = req.body.userName;
      let password = req.body.password;
      
      if (userName && password) {
        try {
          let passwordMatch = await AuthService.verifyPassword(req);
          if (passwordMatch) {

            let token = AuthService.createToken(userName, config);
            // return the JWT token for the future API calls
            res.status(200).send({
              status: true,
              data : {
                token: token,
                message: 'Authentication successful!',
              },
            });
          } else {
            return res.status(403).json({
              status: false,
              error : 'Incorrect userName or password' 
            });
          }
        } catch (err) {
          return res.status(400).json({
            status: false,
            error: err.message
          });
        }

      } else {
        return res.status(400).json({
          status: false,
          error : 'Authentication failed! Please pass the correct input' 
        });
      }

    }

    async createUser(req, res) {
      try {
        const {password, userName, userCode, userOrg}= req.body;
        
        let hash = await bcrypt.hash(password, config.saltRounds)
        // Store hash in your password DB.

        //check for the existing user
        let user = await UserModel.findOne({
          userCode
        }).lean().exec()

        if (!user) {
          let totalUsers = await UserModel.find({}).count().lean().exec();
          await UserModel.createOne({
            userName,
            id: totalUsers + 1,
            userCode,
            userOrg,
            password: hash
          })
          // await user.save()
          let token = AuthService.createToken(userName, config)
          return res.status(200).send({
            status : true,
            data : {
              token: token
            }
          })
        }
        throw new Error("user already exist in the system");
      } catch (err) {
        res.status(400).send({status : false, error : err.message })
      }
    }

    static createToken(userName, config) {
      return jwt.sign({
        userName: userName
      }, config.secret);
    }

    static async verifyPassword(req) {
      try {
        let password = req.body.password;
        let userName = req.body.userName;
        let user = await UserModel.findOne({
          userName: userName
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
                error: 'Token is not valid'
              });
            } else {
              req.user = user;
              next();
            }
          });
        } else {
          return res.json({
            success: false,
            error: 'Auth token is not supplied'
          });
        }
      })

    }
  }
}
