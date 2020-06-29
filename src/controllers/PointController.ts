import { Request, Response } from "express";
import knex from "../database/connection";
import Point from "../interfaces/Point";
import Item from "../interfaces/Item";
import PointItems from "../interfaces/PointItems";

class PointController {
  async index(req: Request, res: Response) {
    const { city, uf, items } = req.query;

    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    const points = await knex
      .select("points.*")
      .from("points")
      .join("point_items", "point_items.point_id", "=", "points.id")
      .whereIn("point_items.item_id", parsedItems)
      .where("points.city", String(city))
      .where("points.uf", String(uf))
      .distinct();

    return res.json(points);
  }

  async create(req: Request, res: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items_id,
    }: Point = req.body;

    if (!items_id) {
      return res
        .status(400)
        .json({ errors: "Necessário informar ao menos um item de coleta" });
    }

    const trx = await knex.transaction();

    const id = await trx("points").returning("id").insert({
      image: "image-fake",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    });

    const pointItems: PointItems[] = items_id.map((item: number) => {
      return {
        point_id: id[0],
        item_id: item,
      };
    });

    await trx("point_items").insert(pointItems);

    await trx.commit();

    return res.json();
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const point: Point = await knex("points").where("id", id).first();

    if (!point) {
      return res.status(400).json({ errors: "Ponto de coleta não encontrado" });
    }

    const items: Item[] = await knex("items")
      .join("point_items", "items.id", "=", "point_items.item_id")
      .where("point_items.point_id", id);

    point.items = items;

    return res.json(point);
  }
}

export default new PointController();
