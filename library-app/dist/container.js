"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
const books_repository_1 = require("./books.repository");
// Создание IoC контейнера
const container = new inversify_1.Container();
exports.container = container;
// Регистрация сервиса BooksRepository
container.bind(books_repository_1.BooksRepository).toSelf();
