import express from "express";
import multer from 'multer';
import multerconfig from './config/multer';
import { celebrate, Joi } from 'celebrate';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const upload = multer(multerconfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();



routes.get ('/items', itemsController.index);

routes.get ('/points/:id', pointsController.show);
routes.get ('/points', pointsController.index);
routes.delete ('/points/:id', pointsController.delete);

routes.post (
    '/points',
     upload.single(''),
     pointsController.create,
     celebrate ({
        body: Joi.object().keys({
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            items: Joi.string().required(),
        })
     }, {
        abortEarly: false
     }) 
    );


export default routes;