CREATE DATABASE IF NOT EXISTS phonebookdb;

USE phonebookdb;

DROP TABLE IF EXISTS numbers;

CREATE TABLE numbers (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    number VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT UQ_numbers_number UNIQUE (number)
);
