import express from 'express'
const router = express.Router()
import { Request, Response } from "express";
import itemController from '../controllers/itemController';

router.route('/item').post((req: Request, res: Response) => { itemController.create(req, res) })

router.route('/item').get((req: Request, res: Response) => { itemController.readAll(req, res) })

router.route('/item/:item_id').get((req: Request, res: Response) => { itemController.readOne(req, res) })


export default router