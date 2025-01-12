import { Router } from 'express'
import { poiController } from '../controllers/pointofinterest.js'

export const poiRouter = Router()

poiRouter.get('/', poiController.GetPoi)
poiRouter.get('/:id', poiController.GetPoiId)
poiRouter.post('/', poiController.AddPoi)
poiRouter.put('/', poiController.UpdatePoi)
poiRouter.delete('/:id', poiController.DeletePoi)
