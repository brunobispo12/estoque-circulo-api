import User from "../schemas/users_schema";
import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()

const jwtPass = process.env.JWT_PASS

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

            const correctPassword = userFind?.password

            if (!user) return res.status(404).json({ msg: 'Usuário não encontrado' })

            const result = await bcrypt.compare(req.body.password, correctPassword?? '')

            if (!result) return res.status(401).json({ msg: 'Credenciais inválidas' })

            const token = jwt.sign({ id: userFind?.id }, jwtPass ?? '', { expiresIn: '8h' })

            console.log(token)


        } catch (err: any) {
            console.log(err)
            res.status(500).json({ msg: 'Erro ao logar' })
        }

    },

    update: async (req: UserRequest, res: Response) => {
        try {

            User.updateOne()


        } catch (err: any) {
            console.log(err)
            res.status(500).json({ msg: 'Erro ao atualizar' })
        }
    },


}

export default userController

