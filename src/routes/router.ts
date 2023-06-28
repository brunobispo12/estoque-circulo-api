import express from 'express'
const router = express.Router()

import usersRouter from './users'

router.use("/", usersRouter)

export default router