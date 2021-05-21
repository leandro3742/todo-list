import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { Todo } from './entities/Todo'
import { Exception } from './utils'

export const createUser = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.first_name) throw new Exception("Please provide a first_name")
	if(!req.body.last_name) throw new Exception("Please provide a last_name")
	if(!req.body.email) throw new Exception("Please provide an email")
	if(!req.body.password) throw new Exception("Please provide a password")

	const userRepo = getRepository(Users)
	// fetch for any user with this email
	const user = await userRepo.findOne({ where: {email: req.body.email }})
	if(user) throw new Exception("Users already exists with this email")

	const newUser = getRepository(Users).create(req.body);  //Creo un usuario
	const results = await getRepository(Users).save(newUser); //Grabo el nuevo usuario 
	return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
    const users = await getRepository(Users).find(); // Funciona como un SELECT * FROM Users;
    return res.json(users);
}


export const addToDo = async (req: Request, res: Response): Promise<Response> =>{
    const newToDo = getRepository(Todo).create(req.body);  //Creo una tarea
    const toDo = await getRepository(Todo).findOne({ where: {id: req.body.id }}) //Reviso que no exista previamente
    if(toDo) throw new Exception("La tarea ya existe"); //No permito que cree la tarea si ya existe una
    const results = await getRepository(Todo).save(newToDo); //Grabo la nueva tarea 

    return res.json(results);
}

export const deleteToDo = async (req: Request, res: Response): Promise<Response> =>{
    // fetch for exist a toDo with this id
    const toDo = await getRepository(Todo).findOne(req.params.id)
    
    return res.json(toDo);
}

export const getToDo = async (req: Request, res: Response): Promise<Response> =>{
    const toDo = await getRepository(Todo).find();
    return res.json(toDo);
}
