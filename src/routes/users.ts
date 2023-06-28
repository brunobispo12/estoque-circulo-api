import express from 'express'
const router = express.Router()
import { Request, Response } from "express";
import userController from '../controllers/usersController';

router.route("/users").post((req: Request, res: Response) => userController.create(req, res))

export default router