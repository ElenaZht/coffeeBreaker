const path = require('path');
const jsonServer = require('json-server');
const {Authenticator, rolesEnum} = require("./auth");

const routesConfig = {
  "/items": {
      "POST": {
        'restricted_to_roles': [rolesEnum.ADMIN, rolesEnum.WORKER]
      },
      "GET": {
        'restricted_to_roles': [rolesEnum.ADMIN, rolesEnum.USER]
      },
      "PUT": {
        'restricted_to_roles': [rolesEnum.ADMIN, rolesEnum.WORKER]
      },
  },
  "/users": {
    "POST": {
      'restricted_to_roles': [rolesEnum.ADMIN]
    },
    "GET": {
      'restricted_to_roles': [rolesEnum.ADMIN]
    },
    "PUT": {
      'restricted_to_roles': [rolesEnum.ADMIN]
    },
  }
};

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router(path.join(__dirname, 'db.json'));

const DB = router.db;
const auth = new Authenticator(routesConfig, DB);

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use('/api', auth.getRolesBasedAuthMiddleware('/api'), router);

server.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  let user = auth.authenticateUser(email, password);
  if (user) {
    let token = auth.generateAccessToken(user);
    user.token = token;
    delete user.password;
    res.status(200).json(user);
  } else {
    res.sendStatus(401)
  }
});

server.post('/signup', (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = DB.get('users').find({email: email}).value();
  if (!user) {
    DB.get('users').push({email, password, role: "user"}).write();
    res.sendStatus(200);
  } else {
    res.status(404).json({msg: 'user already exists.'})
  }
});

server.listen(3000, () => {
  console.log('JSON Server is running')
});
