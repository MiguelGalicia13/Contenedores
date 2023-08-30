import database from '../config/mysql.config.js';
import Response from '../domain/response.js';
import logger from '../util/logger.js';
import QUERY from '../query/number.query.js';

const HttpStatus = {
    OK: {code:200, status:'OK'},
    CREATED: {code:201, status:'CREATED'},
    NO_CONTENT: {code:204, status:'NO CONTENT'},
    BAD_REQUEST: {code:400, status:'BAD REQUEST'},
    NOT_FOUND: {code:404, status:'NOT FOUND'},
    INTERNAL_SERVER_ERROR: {code:500, status:'INTERNAL SERVER ERROR'},
};

export const getNumbers = (req, res) => {
    logger.info('${req.method} ${req.originalUrl}, fetching all numbers');
    database.query(QUERY.SELECT_NUMBERS, (error, results) => {
        if(!results){
            res.status(HttpStatus.OK.code)
                .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'No numbers found'));
        } else{
            res.status(HttpStatus.OK.code)
                .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Numbers fetched', results));
        }
    });
};

export const createNumber = (req, res) => {
    logger.info('${req.method} ${req.originalUrl}, creating a number');
    database.query(QUERY.CREATE_NUMBER, Object.values(req.body), (error, results) => {
        if(!results){
            logger.error(error.message);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
                .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, 'Error occurred while creating a number'));
        } else{
            const number = {id: results.insertId, ...req.body, created_at: new Date()};
            res.status(HttpStatus.CREATED.code)
                .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, 'Number created', {number}));
        }
    });
};

export const getNumber = (req, res) => {
    logger.info('${req.method} ${req.originalUrl}, fetching a number');
    database.query(QUERY.SELECT_NUMBER, [req.params.id], (error, results) => {
        if(!results[0]){
            res.status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Number not found'));
        } else{
            res.status(HttpStatus.OK.code)
                .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Number fetched', results[0]));
        }
    });
};

export const updateNumber = (req, res) => {
    logger.info('${req.method} ${req.originalUrl}, fetching a number');
    database.query(QUERY.SELECT_NUMBER, [req.params.id], (error, results) => {
        if(!results[0]){
            res.status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Number not found'));
        } else{
            logger.info('${req.method} ${req.originalUrl}, updating a number');
            database.query(QUERY.UPDATE_NUMBER, [...Object.values(req.body), req.params.id], (error, results) => {
                if(!error){
                    res.status(HttpStatus.OK.code)
                        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Number updated', {id: req.params.id, ...req.body}));
                } else{
                    logger.error(error.message);
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
                        .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, 'Error occurred while updating a number'));
                }
            });
            }
    });
};

export const deleteNumber = (req, res) => {
    logger.info('${req.method} ${req.originalUrl}, deleting a number');
    database.query(QUERY.DELETE_NUMBER, [req.params.id], (error, results) => {
        if(results.affectedRows > 0){
            res.status(HttpStatus.OK.code)
                .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Number deleted', results[0]));
        } else{ 
            res.status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Number not found'));
        }
    });
};


export default HttpStatus;

