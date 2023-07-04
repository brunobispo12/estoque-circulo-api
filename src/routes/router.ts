import express from 'express'
const router = express.Router()

import usersRouter from './users'
import itensRouter from './itens'

router.use("/", usersRouter)

router.use("/", itensRouter)

export default router