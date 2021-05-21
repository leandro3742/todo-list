import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { Todo } from './entities/Todo'
import { Exception } from './utils'

export const createUser = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.name) throw new Exception("Ingrese un nombre")

	const userRepo = getRepository(Users)
	// fetch for any user with this email
	const user = await userRepo.findOne({ where: {name: req.body.name }})
	if(user) throw new Exception("El usuario ya existe")

	const newUser = getRepository(Users).create(req.body);  //Creo un usuario
	const results = await getRepository(Users).save(newUser); //Grabo el nuevo usuario 
	return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
    const users = await getRepository(Users).find(); // Funciona como un SELECT * FROM Users;
    return res.json(users);
}

export const deleteUsers = async (req: Request, res: Response): Promise<Response> =>{
    const users = await getRepository(Users).delete(req.params.id); // Funciona como un SELECT * FROM Users;
    return res.json(users);
}


export const addToDo = async (req: Request, res: Response): Promise<Response> =>{
    const newToDo = getRepository(Todo).create(req.body);  //Creo una tarea
    console.log(req.body);
    const toDo = await getRepository(Todo).findOne({ where: {description: req.body.description }}) //Reviso que no exista previamente
    if(toDo) throw new Exception("La tarea ya existe"); //No permito que cree la tarea si ya existe una
    const results = await getRepository(Todo).save(newToDo); //Grabo la nueva tarea 

    return res.json(results);
}

export const deleteToDo = async (req: Request, res: Response): Promise<Response> =>{
    // fetch for exist a toDo with this id
    const probar = await getRepository(Todo).findOne(req.params.id)
    if(!probar) throw new Exception("La tarea no existe");
    const toDo = await getRepository(Todo).delete(req.params.id)
    return res.json(toDo);
}

export const getToDo = async (req: Request, res: Response): Promise<Response> =>{
    const toDo = await getRepository(Todo).find();
    return res.json(toDo);
}
