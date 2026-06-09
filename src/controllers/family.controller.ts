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

  console.log(newFamily);

  return res.status(201).json({ id: newFamily.id });
}

const familyController = {
  create,
};

export default familyController;
