import { RequestHandler } from "express"
import Container from "../service/Container"
import ERRORS from "../utils/errors";
import RESPONSES from "../utils/responses";

const container = new Container('public', 'products.txt')

export const getProducts: RequestHandler = async (_req, res) => {
  try {
    const data = await container.getAll();
    if(!data) return res.status(404).send(ERRORS.DOCUMENT_NOT_FOUND)

    res.json(data)
  } catch {
    res.status(500).send(ERRORS.SERVER_ERROR)
  }
}

export const getRandomProduct: RequestHandler = async (_req, res) => {
  try {
    const data = await container.getAll();

    if(!data) return res.status(404).send(ERRORS.DOCUMENT_NOT_FOUND)

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

export const saveProduct: RequestHandler = async (req, res) => {
  try {
    const { body } = req;

    const data = await container.save(body)

    if (data === -1) return res.status(500).send(ERRORS.SERVER_ERROR);

    res.json(RESPONSES.SAVED)
  } catch {
    res.status(500).send(ERRORS.SERVER_ERROR)
  }
}

export const getSingleProduct: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params

    const data = await container.getById(+id)

    if(!data) return res.status(404).send(ERRORS.DOCUMENT_NOT_FOUND)

    res.json(data);
  } catch {
    res.status(500).json(ERRORS.SERVER_ERROR)
  }
}

export const deleteProduct: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params

    const data = await container.deleteById(+id)

    if(!data) return res.status(404).send(ERRORS.DOCUMENT_NOT_FOUND)

    res.json(RESPONSES.DELETED);
  } catch {
    res.status(500).json(ERRORS.SERVER_ERROR)
  }
}

export const updateProduct: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params
    const { body } = req

    const data = await container.updateById(+id, body)

    if(!data) return res.status(404).send(ERRORS.DOCUMENT_NOT_FOUND)

    res.json(data);
  } catch {
    res.status(500).json(ERRORS.SERVER_ERROR)
  }
}