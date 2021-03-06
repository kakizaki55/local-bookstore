-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS publishers CASCADE;

DROP TABLE IF EXISTS books CASCADE;

DROP TABLE IF EXISTS reviewers CASCADE;

DROP TABLE IF EXISTS authors CASCADE;

DROP TABLE IF EXISTS authors_books CASCADE;

DROP TABLE IF EXISTS reviews CASCADE;

-- create a table for publishers
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

--creates a table for authors 
CREATE TABLE authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    dob DATE NOT NULL,
    pob TEXT NOT NULL
);

INSERT INTO
    authors (name, dob, pob)
VALUES
    ('Hayao Miyazaki', '1/5/1941', 'Tokyo, Japan'),
    ('George Orwell', '1/25/1950', 'Motihari, India'),
    (
        'J.R.R Tolkien',
        '1/3/1892',
        'Bloemfontein, South Africa'
    );

-- creates a table for reviewers
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
    ('Zachary', 'Grumpy Dude Magazine'),
    ('Zachary thats going to be deleted', 'GDM');

--creats a table for books
CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT UNIQUE NOT NULL,
    released INT NOT NULL,
    publisher_id BIGINT NOT NULL,
    FOREIGN KEY (publisher_id) REFERENCES publishers (id)
);

INSERT INTO
    books (title, publisher_id, released)
VALUES
    ('Zachary Mami', 1, 2003),
    ('Dog', 1, 2006),
    ('War and Piece', 1, 1960);

--creats a junction table for authors and books
CREATE TABLE authors_books (
    author_id BIGINT NOT NULL,
    book_id BIGINT NOT NULL,
    FOREIGN KEY (author_id) REFERENCES authors (id),
    FOREIGN KEY (book_id) REFERENCES books (id)
);

INSERT INTO
    authors_books (author_id, book_id)
VALUES
    (1, 1),
    (2, 2),
    (1, 3);

-- creats a table for reviews
CREATE TABLE reviews (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    rating INT NOT NULL,
    review TEXT NOT NULL,
    book_id BIGINT NOT NULL,
    reviewer_id BIGINT NOT NULL,
    FOREIGN KEY (reviewer_id) REFERENCES reviewers (id),
    FOREIGN KEY (book_id) REFERENCES books (id)
);

INSERT INTO
    reviews (rating, review, book_id, reviewer_id)
VALUES
    (5, 'super awesome movie jk its a book', 2, 1),
    (1, 'not a fan', 1, 2);