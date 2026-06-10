import type { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

import { ValidationError } from '../infra/errors.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      const errorMessage =
        error instanceof ZodError ? error?.issues[0]?.message : undefined;

      throw new ValidationError(errorMessage);
    }
  };
}
