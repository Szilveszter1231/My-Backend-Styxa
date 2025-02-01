import {
  addPoi,
  getPoi,
  getPoiId,
  updatePoi,
  deletePoi
} from '../db/pointofinterest.js'
import Joi from 'joi'

const addpoiRule = Joi.object({
  name: Joi.string().required().min(3),
  description: Joi.string().required().min(3),
  image: Joi.string().required().min(3),
  map: Joi.string().required().min(3),
  cityid: Joi.number().required()
})

const getRule = Joi.object({
  id: Joi.number().required()
})

async function GetPoi(req, res) {
  res.send(await getPoi())
}

async function GetPoiId(req, res) {
  const { id } = await getRule.validateAsync(req.params)
  res.send(await getPoiId(id))
}

async function AddPoi(req, res) {
  try {
    const { name, description, image, map, cityid } =
      await addpoiRule.validateAsync(req.body)
    await addPoi(name, description, image, map, cityid)
    res.send('Megerkezett a valasz')
  } catch (error) {
    res.status(400).send(error)
  }
}

async function UpdatePoi(req, res) {
  try {
    const { id } = req.params
    const { name, description, cityid } = await addpoiRule.validateAsync(
      req.body
    )
    res.send(await updatePoi(id, name, description, cityid))
  } catch (error) {
    res.status(400).send(error)
  }
}

async function DeletePoi(req, res) {
  const { id } = req.params
  res.send(await deletePoi(id))
}

export const poiController = {
  GetPoi,
  GetPoiId,
  AddPoi,
  UpdatePoi,
  DeletePoi
}
