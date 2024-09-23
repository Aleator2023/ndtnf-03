import express from 'express';
import { container } from './container';
import { BooksRepository } from './books.repository';

const router = express.Router();

// Пример использования BooksRepository в маршрутах Express.js
router.get('/:id', async (req, res, next) => {
  try {
    const repo = container.get(BooksRepository);
    const book = await repo.getBook(req.params.id);
    res.json(book);
  } catch (error) {
    next(error);
  }
});

export { router };