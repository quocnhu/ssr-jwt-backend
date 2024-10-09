const configCors = (app) => {
    //Add headers before the routes are defined
  app.use(function (req,res,next) {
    //Website you wish to allow to connect (the url is for frontend)
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    //Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH')
    //Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers','X-Request-With,content-type');
    //Set to true if you need the website to include cookies in the request sent
    //to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials',true)
    //Pass to next layer of middleware
    next();
  });

}
export {configCors}