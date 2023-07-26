const path = require('path');
const jsonServer = require('json-server');
const {Authenticator, rolesEnum} = require("./auth");

const routesConfig = {
  "/items": {
      "POST": {
        'restricted_to_roles': [rolesEnum.ADMIN]
      },
      "GET": {
        'restricted_to_roles': [rolesEnum.ADMIN, rolesEnum.USER]
      },
      "PUT": {
        'restricted_to_roles': [rolesEnum.ADMIN]
      },
  },
  "/users": {
    "POST": {
      'restricted_to_roles': [rolesEnum.ADMIN, rolesEnum.USER]
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
// server.use('/api', auth.getRolesBasedAuthMiddleware('/api'), router);
server.use('/api', router);

server.post('/login', (req, res) => {
  const { email, password } = req.body;
  let user = auth.authenticateUser(email, password);
  if (user) {
    let token = auth.generateAccessToken(user);
    user.token = token;
    delete user.password;
    setTimeout(() => res.status(200).json(user), parseInt(Math.random()*3000+1000));

  } else {
    setTimeout(() => res.sendStatus(401), parseInt(Math.random()*3000+1000));

  }
});

server.post('/signup', (req, res) => {
  const user = DB.get('users').find({email: req.body.email}).value();
  if (!user) {
    const maxId = Math.max(...DB.get('users').value().map(o => o.id));
    DB.get('users').push({...req.body, id:  maxId + 1}).write();
    setTimeout(() => res.status(200).json({}), parseInt(Math.random()*3000+1000));
  } else {
    setTimeout(() => res.status(404).json({msg: 'user already exists.'}), parseInt(Math.random()*3000+1000));
  }
});


server.listen(3000, () => {
  console.log('JSON Server is running')
});
