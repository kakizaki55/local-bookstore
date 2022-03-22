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
    ('Hayao Miyazaki','1941-01-05','Tokyo, Japan'),
    ('George Orwell','1950-01-25','Motihari, India'),
    ('J.R.R Tolkien','1892-01-03','Bloemfontein, South Africa');
