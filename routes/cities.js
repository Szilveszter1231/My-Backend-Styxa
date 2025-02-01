import { Router } from 'express'
import { citiesController } from '../controllers/cities.js'

export const citiesRouter = Router()

citiesRouter.get('/', citiesController.GetCities)
citiesRouter.get('/:id', citiesController.GetCityid)
citiesRouter.post('/', citiesController.AddCities)
citiesRouter.put('/:id', citiesController.UpdateCities)
citiesRouter.delete('/:id', citiesController.DeleteCities)
