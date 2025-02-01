import { loginUser } from '../db/login.js'
import Joi from 'joi'
import bcrypt from 'bcrypt'

const loginRule = Joi.object({
  id: Joi.number().required(),
  password: Joi.string().required().min(6)
})

async function LoginUser(req, res) {
  try {
    console.log('Validating request body...')
    const { id, password } = await loginRule.validateAsync(req.body)
    console.log(`Validated ID: ${id}, Password: ${password}`)

    if (isNaN(id)) {
      console.log('Invalid ID')
      return res.status(400).send('Invalid ID')
    }

    console.log('Fetching user from database...')
    const user = await loginUser(id)
    if (!user) {
      console.log('User not found')
      return res.status(400).send('User not found')
    }
    console.log(`Fetched User: ${JSON.stringify(user)}`)

    console.log('Comparing passwords...')
    console.log(`Password: ${password}, User Password: ${user.password}`)
    const same = await bcrypt.compare(password, user.password)
    if (!same) {
      console.log('Invalid password')
      return res.status(400).send('Invalid password')
    }

    console.log('Login successful')
    res.send('Login successful')
  } catch (error) {
    console.error('Error:', error)
    res.status(400).send(error)
  }
}

export const loginController = {
  LoginUser
}
