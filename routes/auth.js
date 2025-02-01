import { Router } from 'express'
import { loginController } from '../controllers/auth.js'

export const loginRouter = Router()

loginRouter.post('/', loginController.LoginUser)
