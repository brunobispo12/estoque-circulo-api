import User from "../schemas/users_schema";
import { Request, Response } from "express";

interface CreateUserRequest extends Request {
    body: {
        name: string;
        user: string;
        password: string;
    }
}

const userController = {
    
    create: async (req: CreateUserRequest, res: Response) => {
        try {

            const user = {
                name: req.body.name,
                user: req.body.user,
                password: req.body.password,
            }

            const response = await User.create(user)

            res.status(201).json({response, msg: "Usuário adicionado com sucesso"})

        } catch (error: any) {
            console.log(error)
        }
    }
}

export default userController