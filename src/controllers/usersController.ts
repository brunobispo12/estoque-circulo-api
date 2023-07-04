import User from "../schemas/users_schema";
import { Request, Response } from "express";
import bcrypt from 'bcrypt'

interface UserRequest extends Request {
    body: {
        name: string
        user: string
        password: string
    }
}

interface PassowordRequest extends Request {
    body: {
        user: string
        password: string
    }
}

const userController = {

    create: async (req: UserRequest, res: Response) => {
        try {

            const encryptedPassword = await bcrypt.hash(req.body.password, 5)

            const user = {
                name: req.body.name,
                user: req.body.user,
                password: encryptedPassword,
            }

            const response = await User.create(user)

            res.status(201).json({ response, msg: "Usuário adicionado com sucesso" })

        } catch (err: any) {
            console.log(err)
            res.status(500).json({ msg: 'Erro ao criar usuário' })
        }
    },

    validate: async (req: PassowordRequest, res: Response) => {
        try {

            const user = req.body.user
            const userFind = await User.findOne({ user: user })

            if (!user) return res.status(404).json({ msg: 'Usuário não encontrado' })

            




        } catch (err: any) {
            console.log(err)
            res.status(500).json({ msg: 'Erro ao logar' })
        }

    }
}

export default userController

