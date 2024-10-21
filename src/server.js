/**ES6*/ 
import express from 'express';
const app = express()
import bodyParser from 'body-parser';
//External files imported to server backend
import configViewEngine from './config/viewEngine.js'
import initWebRoutes from './route/web.js'
import initApiRoutes from './route/api.js'
import {configCors} from './config/cors.js'
import {poolsql} from './config/db.js'
import connection from './config/connectDbSequelize.js'
import cookieParser from 'cookie-parser'
require('dotenv').config()
// require('dotenv').config({ path: '../.env' })
// dotenv.config()
// console.log('check dotenv>>>>>>>', process.env)

//Initializing CORS
configCors(app)
//Initializing config
configViewEngine(app);

//Initializing body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Config CookieParser
app.use(cookieParser())

//Initializing route
initWebRoutes(app)
initApiRoutes(app)

//Database connection
poolsql.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("MySQL connected!");
  }
});
connection()
const port = process.env.PORT_SERVER || 1176
app.listen(port, () => {
  console.log(`>>>SERVER BACKEND JWT IS LISTENING PORT: ${port}`)
})


