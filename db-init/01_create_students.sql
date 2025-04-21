CREATE DATABASE IF NOT EXISTS mindset_db;
CREATE TABLE IF NOT EXISTS students(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    patronymic VARCHAR(30) NOT NULL,
    age INT,
    grade INT,
    phone_number TEXT NOT NULL,
    rating INT NOT NULL DEFAULT 1000
);
