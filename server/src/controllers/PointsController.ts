import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {

  async index(req: Request, res: Response) {
    const { city, uf, items } = req.query;

    const parsedItems = String(items)
      .split(',')
      .map((item) => Number(item.trim()));

    const points = await knex('points').join('point_items', 'point_items.point_id', '=', 'points.id')
      .whereIn('point_items.item_id', parsedItems)
      .where('points.city', String(city))
      .where('points.uf', String(uf))
      .distinct()
      .select('points.*');

    if (!points) {
      return res.status(400).json({message: 'Points not found'});
    }

    const serializedPoints = points.map((point) => ({
      ...point,
      image_url: `http://192.168.0.103:3333/uploads/${point.image}`
    }));

    return res.json(serializedPoints);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const point = await knex('points').where('id',id).first();

    if (!point) {
      return res.status(400).json({message: 'Point not found'});
    }

    const items = await knex('items')
      .join('point_items','items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');


    const serializedPoint = {
      ...point,
      image_url: `http://192.168.0.103:3333/uploads/${point.image}`
    };
    

    return res.json({serializedPoint, items});
  }

  async create(req: Request, res: Response) {
    const { items, image, ...rest } = req.body;
    const body = rest;
    body.image = req.file.filename;
    
    
    const trx = await knex.transaction();
    
    // console.log(body);
    const [pointId] = await trx('points').insert(body);
    console.log(pointId);
    
    if (items.length > 0) {
      const neItems = items.split(',').map((item: string) => Number(item.trim())).map((item_id: number) => {
        return { point_id: pointId, item_id}
      });

      console.log(neItems);
      await trx('point_items').insert(neItems);
    }
    
    
    await trx.commit();

    return res.json({id: pointId, ...body});
  }
}

export default new PointsController();