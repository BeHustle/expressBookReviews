const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
const env = require('./env');

const app = express();

app.use(express.json());

app.use("/customer", session({secret: "fingerprint_customer", resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(" ")[0] !== "Bearer") {
    return res.status(401).json({message: "Unauthorized"});
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    jwt.verify(token, env.JWT_AT_SECRET);
    req.user = jwt.decode(token);
    console.log(req.user);
    next();
  } catch (e) {
    return res.status(401).json({message: "Unauthorized"});
  }
});

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(env.PORT, env.HOST, () => console.log(`Server is running on ${env.HOST}:${env.PORT}`));
