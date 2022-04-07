import { RequestHandler } from "express";

export const validateAdminRole: RequestHandler = (req, res, next) => {
  if (req.query.admin !== 'true') {
    return res.status(401).send({ error: 'You must be an admin to perform this action' });
  }
  next();
}