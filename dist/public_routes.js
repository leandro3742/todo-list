"use strict";
exports.__esModule = true;
/**
 * Public Routes are those API url's that anyone can request
 * whout having to be logged in, for example:
 *
 * POST /user is the endpoint to create a new user or "sign up".
 * POST /token can be the endpoint to "log in" (generate a token)
 */
var express_1 = require("express");
var utils_1 = require("./utils");
var actions_1 = require("./actions");
var router = express_1.Router();
// signup route, creates a new user in the DB
router.get('/todo/user/a', utils_1.safe(actions_1.getUsers));
// router.post('/todo/user', safe(createUser));
// router.delete('/todo/user/:id', safe(deleteUsers));
// 
router.post('/todo/user/', utils_1.safe(actions_1.addToDo));
router["delete"]('/todo/user/:id', utils_1.safe(actions_1.deleteToDo));
router.get('/todo/user', utils_1.safe(actions_1.getToDo));
exports["default"] = router;
