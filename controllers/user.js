import { getUser, addUser, updateUser, deleteUser } from '../db/user.js'
import bcrypt from 'bcrypt'
import Joi from 'joi'

const addRule = Joi.object({
  firstname: Joi.string().required().min(3),
  lastname: Joi.string().required().min(3),
  username: Joi.string().required().min(3),
  password: Joi.string().required().min(6),
  comfpassword: Joi.string().required().min(6)
})

const updateRule = Joi.object({
  firstname: Joi.string().required().min(3),
  lastname: Joi.string().required().min(3),
  username: Joi.string().required().min(3)
})

async function GetUser(req, res) {
  res.send(await getUser())
}

async function AddUser(req, res) {
  try {
    const { firstname, lastname, username, password, comfpassword } =
      await addRule.validateAsync(req.body)
    const encryptedPassword = await bcrypt.hash(password, 10)
    const samepassword = await bcrypt.compare(comfpassword, encryptedPassword)
    if (!samepassword) {
      res.status(400).send('different password')
      return
    }
    await addUser(firstname, lastname, username, encryptedPassword)
    res.send('User added successfully')
  } catch (error) {
    res.send(error.message)
  }
}
async function UpdateUser(req, res) {
  try {
    const { id } = req.params
    const { firstname, lastname, username } = await updateRule.validateAsync(
      req.body
    )
    res.send(await updateUser(firstname, lastname, username, id))
  } catch (error) {
    res.status(400).send(error)
  }
}

async function DeleteUser(req, res) {
  const { id } = req.params
  res.send(await deleteUser(id))
}

export const userController = {
  GetUser,
  AddUser,
  UpdateUser,
  DeleteUser
}
