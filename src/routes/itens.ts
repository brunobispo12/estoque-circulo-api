import express from 'express'
const router = express.Router()
import { Request, Response } from "express";
import itemController from '../controllers/itemController';

router.route('/items').post((req: Request, res: Response) => { itemController.create(req, res) })

router.route('/items').get((req: Request, res: Response) => { itemController.readAll(req, res) })

router.route('/items/:item_id').get((req: Request, res: Response) => { itemController.readOne(req, res) })

router.route('/items/:item_id').put((req: Request, res: Response) => { itemController.updateOne(req, res) })

export default router

