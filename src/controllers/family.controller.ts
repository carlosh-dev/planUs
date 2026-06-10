import type { Request, Response } from 'express';

import familyModel from '../models/family.model.js';
import type { createFamilyType } from '../schemas/family.schema.js';

async function create(
  req: Request<unknown, unknown, createFamilyType>,
  res: Response,
) {
  const { name, users } = req.body;

  const newFamily = await familyModel.create({
    name,
    users,
  });

  return res.status(201).json({ id: newFamily.id, name: newFamily.name });
}

async function list(
  req: Request<{ user_id: string }, unknown, unknown>,
  res: Response,
) {
  const userId = req.params.user_id;

  const families = await familyModel.list(userId);

  return res.status(200).json({ results: families });
}

const familyController = {
  create,
  list,
};

export default familyController;
