DROP TABLE IF EXISTS artists CASCADE;

CREATE TABLE artists(
  id SERIAL PRIMARY KEY NOT NULL,
  artistid VARCHAR(255) NOT NULL,
  artistname VARCHAR(255) NOT NULL,
  artistimage VARCHAR(255) NOT NULL
);

-- Run this command in psql once you are inside the server folder
-- \i ./db/artists.sql
