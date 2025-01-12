import { loginUser } from '../db/login.js'
import Joi from 'joi'
import bcrypt from 'bcrypt'

const loginRule = Joi.object({
  id: Joi.number().required(),
  password: Joi.string().required().min(6)
})

async function LoginUser(req, res) {
  try {
    const { id, password } = await loginRule.validateAsync(req.body)

    const user = await loginUser(id)
    if (!user) {
      return res.status(400).send('User not found')
    }

    const same = await bcrypt.compare(password, user.password)
    if (!same) {
      return res.status(400).send('Invalid password')
    }

    res.send('Login successful')
  } catch (error) {
    res.status(400).send(error)
  }
}

export const loginController = {
  LoginUser
}
