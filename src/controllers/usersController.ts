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

function isUserValid(user: UserRequest | null): user is UserRequest {
    return user !== null && 'name' in user && 'user' in user && 'password' in user;
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
            const user = req.body.user;
            const userFind = await User.findOne({ user: user });

            if (!userFind) {
                return res.status(404).json({ msg: 'Usuário não encontrado' });
            }

            if (!userFind && !isUserValid(userFind)) {
                return res.status(401).json({ msg: 'Credenciais inválidas' });
            }

            const correctPassword = userFind.password;

            const result = await bcrypt.compare(req.body.password, correctPassword);

            if (!result) {
                return res.status(401).json({ msg: 'Credenciais inválidas' });
            }

            const token = jwt.sign({ id: userFind.id }, jwtPass ?? '', { expiresIn: '8h' });

            const userFindObj = userFind.toObject();
            const { password, createdAt, updatedAt, ...userLogin } = userFindObj

            return res.status(200).json({ userLogged: userLogin, isAuth: true });

        } catch (err: any) {
            console.log(err);
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

