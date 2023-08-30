import express from 'express';
import { getNumbers, getNumber, createNumber, deleteNumber, updateNumber } from '../controller/number.controller.js';

const numberRoutes = express.Router();

numberRoutes.route('/')
    .get(getNumbers)
    .post(createNumber);

numberRoutes.route('/:id')
    .get(getNumber)
    .put(updateNumber)
    .delete(deleteNumber);

export default numberRoutes;