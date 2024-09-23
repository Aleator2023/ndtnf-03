import 'reflect-metadata';
import { Container } from 'inversify';
import { BooksRepository } from './books.repository';

// Создание IoC контейнера
const container = new Container();

// Регистрация сервиса BooksRepository
container.bind(BooksRepository).toSelf();

export { container };