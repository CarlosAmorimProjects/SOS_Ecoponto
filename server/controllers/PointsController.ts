import { Request, Response } from 'express';
import knex from '../database/connection';


class PointsController {

    async index (request: Request, response: Response) {
        const {items} = request.query;

        const parsedItems = String(items)
        .split(',')
        .map(item => Number(item.trim()));

        const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id', parsedItems)
        .distinct()
        .select('points.*');

        return response.json (points);
    }

    async show (request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex ('points').where('id', id).first();

        if(!point) {
            return response.status(400).json({ message: 'Point was not found'});
        }

        const serializedPoint = {
                ...point,
        };

        const items = await knex ('items')
            .join ('point_items', 'items.id', '=', 'point_items.item_id')
            .where ('point_items.point_id', id)
            .select ('items.title');
        
        return response.json({point: serializedPoint, items});

    }
    async create (request: Request, response: Response) {
        const {
            latitude,
            longitude,
            items
        } = request.body;
    
        const trx = await knex.transaction();

        const point = {
                latitude,
                longitude,
        };
    
        const insertedIds = await trx('points').insert(point);
        
        const point_id = insertedIds[0];
        
        const pointItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: number) => {
                return {
                    item_id,
                    point_id,
                };
        })
    
        await trx('point_items').insert(pointItems);

        await trx.commit();
    
        return response.json ({
            id: point_id,
            ... point,
        });
    
    }

    async delete (request: Request, response: Response) {

        const id = Number(request.params.id);

        const trx = await knex.transaction();
        
        await trx('points').first().where({'id': id}).delete();

        await trx.commit();
        
        console.log('delete2');

        return response.json('Ponto apagado');
    }
}

export default PointsController;