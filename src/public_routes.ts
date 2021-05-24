
/**
 * Public Routes are those API url's that anyone can request
 * whout having to be logged in, for example:
 * 
 * POST /user is the endpoint to create a new user or "sign up".
 * POST /token can be the endpoint to "log in" (generate a token)
 */
import { Router } from 'express';
import { safe } from './utils';
import { getUsers, createUser, deleteUsers, addToDo, deleteToDo, getToDo } from './actions';

const router = Router();

// signup route, creates a new user in the DB
router.get('/todo/user/a', safe(getUsers));
router.post('/todo/user', safe(createUser));
// router.delete('/todo/user/:id', safe(deleteUsers));
// 
router.post('/todo/user/', safe(addToDo));
router.delete('/todo/user/:id', safe(deleteToDo));
router.get('/todo/user', safe(getToDo));
export default router;
