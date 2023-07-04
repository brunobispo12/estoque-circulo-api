import express from 'express'
const router = express.Router()
import { Request, Response } from "express";
import userController from '../controllers/usersController';

router.route("/auth/register").post((req: Request, res: Response) => userController.create(req, res))

router.route("/auth/login").post((req: Request, res: Response) => userController.validate(req, res))

export default router