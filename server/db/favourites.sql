CREATE TABLE favourites(
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) on DELETE CASCADE
);

-- Run this command in psql once you are inside the server folder
-- \i ./db/favourites.sql
