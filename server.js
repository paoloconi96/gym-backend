"use strict";

var Express = require("express"),
    App = Express(),
    Http = require("http"),
    BodyParser = require("body-parser"),
    Router = Express.Router(),
    MethodOverride = require("method-override"),
    Multer = require("multer"),
    Db = require("./database.js"),
    AuthController = require("./routes/auth.js"),
    UserController = require("./routes/user.js");

App.use(Multer());
App.use(MethodOverride());
App.use(BodyParser.json());
App.use(BodyParser.urlencoded({extended: true}));

App.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
})

Db.initialisation();

Http.createServer(App).listen(3000);

App.get("/users", AuthController.requireUser(), UserController.getAll);
App.get("/users/:id", AuthController.requireUser(), UserController.getUser);
App.post("/users", UserController.create);
App.post("/users/login", UserController.login);
App.post("/users/logout", AuthController.requireUser(), UserController.logout);
App.put("/users/:id", AuthController.requireUser(), UserController.update);
App.delete("/users/:id", UserController.destroy);

// App.get("/categories", CategoryController.getAll);
// App.get("/categories/:id", CategoryController.getCategory);
// App.post("/categories", AuthController.requireUser(), CategoryController.create);
// App.put("/categories/:id", AuthController.requireUser(), CategoryController.update);
// App.delete("/categories/:id", AuthController.requireUser(), CategoryController.destroy);

// App.get("/blogpost", BlogpostController.getAll);
// App.get("/blogpost/:id", AuthController.requireUser(), BlogpostController.getPost);
// App.post("/blogpost", AuthController.requireUser(), BlogpostController.create);
// App.put("/blogpost/:id", AuthController.requireUser(), BlogpostController.update);
// App.delete("/blogpost/:id", AuthController.requireUser(), BlogpostController.destroy);

// App.get("/tag", TagController.get);
// App.post("/tag", TagController.create);