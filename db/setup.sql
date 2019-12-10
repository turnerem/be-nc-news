DROP DATABASE IF EXISTS nc_news_test;
DROP DATABASE IF EXISTS nc_news;

CREATE DATABASE nc_news_test;
CREATE DATABASE nc_news;

\c nc_news_test

CREATE TABLE topics (
  slug VARCHAR PRIMARY KEY,
  description VARCHAR
);

CREATE TABLE users (
  username VARCHAR PRIMARY KEY,
  avatar_URL VARCHAR,
  name VARCHAR
);

CREATE TABLE articles (
  article_id SERIAL PRIMARY KEY,
  TITLE VARCHAR,
  BODY VARCHAR
)

