const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require('path');
const url = require('url');

dotenv.config({ path: path.join(__dirname, '.env') });
const ROLES = {'GUEST': 'guest', 'USER': 'user', 'WORKER': 'worker', 'ADMIN': 'admin'};

function getPosition(string, subString, index) {
  return string.split(subString, index).join(subString).length;
}

class Authenticator {

  constructor(routesConfig, db){
    this.config = routesConfig;
    this.db = db;
    this._secret = process.env.TOKEN_SECRET
  }

  static isRouteAllowedByRole(route, role, method, config){
    const routeKey  = route.substring(0, getPosition(route, '/', 2));
    if (config[routeKey] && config[routeKey][method]) {
      const restrictions = config[routeKey][method]['restricted_to_roles'];
      if (restrictions) {
        return restrictions.includes(role);
      }
      return true;
    }
    return false;
  }

  getRolesBasedAuthMiddleware() {
    let self = this;
    return function(req, res, next) {
      // Gather the jwt access token from the request header
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      if (token == null) {
        if (Authenticator.isRouteAllowedByRole(req.url, ROLES.GUEST, req.method, self.config)) {
          next()
        } else {
          return res.sendStatus(401); // if there isn't any token
        }
      } else {
        jwt.verify(token, self._secret, (err, user) => {
          console.log(err);
          if (err) return res.sendStatus(403);
          req.user = user;
          console.info('Token authenticated. User info:', user);
          if (Authenticator.isRouteAllowedByRole(req.url, user.role, req.method, self.config)) {
            next()
          } else {
            return res.sendStatus(401); // if there isn't any token
          }
        })
      }
    }
  }

  // getAuthMiddleware() {
  //   let self = this;
  //   return function(req, res, next) {
  //     // Gather the jwt access token from the request header
  //     const authHeader = req.headers['authorization'];
  //     const token = authHeader && authHeader.split(' ')[1];
  //     if (token == null) return res.sendStatus(401); // if there isn't any token
  //     console.log(self.db);
  //     jwt.verify(token, self._secret, (err, user) => {
  //       console.log(err);
  //       if (err) return res.sendStatus(403);
  //       req.user = user;
  //       console.info('Token authenticated. User info:', user);
  //       next() // pass the execution off to whatever request the client intended
  //     })
  //   }
  // }

  generateAccessToken(user, expiresIn='1d') {
    // expires after one day
    const {email, role, id} = user;
    return jwt.sign({email, role, id}, this._secret, {expiresIn, algorithm: "HS256"});
  }

  static generateSecret() {
    console.log(require('crypto').randomBytes(64).toString('hex'));
  }

  authenticateUser(username, password) {
    if (!username || !username.trim() || !password || !password.trim()) { // add your authorization logic here
      return false;
    }
    else {
      const user = this.db.get('users').find({email: username}).value();
      if (user && user.password === password){
        console.info(`User: ${username} authenticated!`);
        let copied_user = Object.assign({}, user);
        return copied_user;
      }
      console.info(`User: ${username} NOT authenticated!`);
      return null;
    }

  }
}



exports.Authenticator = Authenticator;
exports.rolesEnum = ROLES;
