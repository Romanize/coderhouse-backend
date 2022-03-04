import { RequestHandler } from "express"
import Container from "../service/Container"
import ERRORS from "../utils/errors";

const container = new Container('public', 'products.txt')

export const getProducts: RequestHandler = async (_req, res) => {
  try {
    const data = await container.getAll();
    if(!data) return res.status(500).send(ERRORS.DOCUMENT_NOT_FOUND)

    res.json(data)
  } catch {
    res.status(500).send(ERRORS.SERVER_ERROR)
  }
}

export const getRandomProduct: RequestHandler = async (_req, res) => {
  try {
    const data = await container.getAll();

    if(!data) return res.status(500).send(ERRORS.DOCUMENT_NOT_FOUND)

    let randomIndex = Math.floor(Math.random() * data.length)

    // Just in case Math.random() returns 1
    if (randomIndex === data.length) {
      randomIndex = Math.floor(Math.random() * data.length)
    }

    return res.send(data[randomIndex])
  } catch {
    res.status(500).json(ERRORS.SERVER_ERROR)
  }
}