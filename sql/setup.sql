-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS publishers, authors, reviewers, books;

CREATE TABLE publishers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    country TEXT NOT NULL
);

INSERT INTO
    publishers (name, city, state, country)
VALUES
    (
        'hitRecords',
        'Portland',
        'OR',
        'United States'
    );

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

CREATE TABLE reviewers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    company TEXT NOT NULL
);

INSERT INTO
    reviewers (name, company)
VALUES
    ('John Smith', 'Rude Reviews Inc.'),
    ('Ryssa Mami', 'Good Opinions Co.'),
    ('Zachary', 'Grumpy Dude Magazine');

CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    publisher_id BIGINT REFERENCES publishers (id),
    release INT NOT NULL
);

INSERT INTO 
    books (title, publisher_id, release)
VALUES 
    ('Zachary Mami', 1, 2003),
    ('Dog', 2, 2006),
    ('War and Piece', 3, 1960);