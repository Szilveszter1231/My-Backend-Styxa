import { Router } from 'express'
import { citiesController } from '../controllers/cities.js'

export const citiesRouter = Router()

citiesRouter.get('/', citiesController.GetCities)
citiesRouter.get('/:cityid', citiesController.GetCityid)
citiesRouter.post('/', citiesController.AddCities)
citiesRouter.put('/', citiesController.UpdateCities)
citiesRouter.delete('/:cityid', citiesController.DeleteCities)
