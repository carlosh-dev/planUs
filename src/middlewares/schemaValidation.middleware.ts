import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z, ZodError, type ZodIssue } from 'zod';

import { ValidationError } from '../infra/errors.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error.message);
        const errorMessages = error.issues.map((issue: ZodIssue) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        }));

        throw new ValidationError({
          message: error?.issues[0]?.message ?? 'Erro de validação.',
          details: errorMessages,
        });
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: 'Internal Server Error' });
      }
    }
  };
}
