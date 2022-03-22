-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS authors; 

CREATE TABLE authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    dob DATE NOT NULL,
    pob TEXT NOT NULL
);

INSERT INTO
    authors (name, dob, pob)
VALUES
    ('Hayao Miyazaki','1/5/1941','Tokyo, Japan'),
    ('George Orwell','1/25/1950','Motihari, India'),
    ('J.R.R Tolkien','1/3/1892','Bloemfontein, South Africa');
