import {
  addCities,
  getCities,
  getCityid,
  updateCities,
  deleteCities
} from '../db/cities.js'
import Joi from 'joi'

const addRule = Joi.object({
  cityname: Joi.string().required().min(3),
  description: Joi.string().required().min(20),
  population: Joi.number().required(),
  image: Joi.string().required(),
  map: Joi.string().required()
})

async function GetCities(req, res) {
  res.send(await getCities())
}
async function GetCityid(req, res) {
  const { id } = req.params
  res.send(await getCityid(id))
}

async function AddCities(req, res) {
  try {
    const { cityname, description, population, image, map } =
      await addRule.validateAsync(req.body)
    await addCities(cityname, description, population, image, map)
    res.send('It`s done!')
  } catch (error) {
    res.status(400).send(error)
  }
}

async function UpdateCities(req, res) {
  const { id } = req.params
  const { cityname, description, population } = req.body
  await updateCities(id, cityname, description, population)
  res.send('It`s done!')
}

async function DeleteCities(req, res) {
  const { id } = req.params
  await deleteCities(id)
  res.send('It`s deleted')
}

export const citiesController = {
  GetCities,
  GetCityid,
  AddCities,
  UpdateCities,
  DeleteCities
}
