import { RequestHandler } from "express";

export const renderForm: RequestHandler = (req, res) => {
  res.render('home')
}