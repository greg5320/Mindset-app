-- Add up migration script here
ALTER TABLE students
ALTER COLUMN rating SET DEFAULT 1000;