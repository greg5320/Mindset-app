CREATE TABLE IF NOT EXISTS courses(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS groups(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    grade INT,
    course_id INT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS student_groups(
    student_id INT NOT NULL,
    group_id INT NOT NULL,
    PRIMARY KEY (student_id, group_id),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
)