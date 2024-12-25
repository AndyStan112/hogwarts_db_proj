
DROP TABLE IF EXISTS student_course_grades CASCADE;
DROP TABLE IF EXISTS lab_assistants CASCADE;
DROP TABLE IF EXISTS student_courses CASCADE;
DROP TABLE IF EXISTS house_courses CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS dorms CASCADE;
DROP TABLE IF EXISTS houses CASCADE;
DROP TABLE IF EXISTS teachers CASCADE;

CREATE TABLE teachers (
    id             VARCHAR(255) PRIMARY KEY,
    first_name     VARCHAR(255) NOT NULL,
    last_name      VARCHAR(255) NOT NULL,
    email          VARCHAR(255) NOT NULL ,
    phone_number          VARCHAR(15) NOT NULL
);

CREATE TABLE houses (
    id              SERIAL PRIMARY KEY,
    house_name      VARCHAR(255) NOT NULL,
    head_teacher_id VARCHAR(255) REFERENCES teachers(id) ON DELETE SET NULL
);

CREATE TABLE dorms (
    id          SERIAL PRIMARY KEY,
    house_id    INT NOT NULL REFERENCES houses(id) ON DELETE CASCADE ON UPDATE CASCADE,
    dorm_name   VARCHAR(255) NOT NULL
);

CREATE TABLE students (
    id          VARCHAR(255) PRIMARY KEY,
    first_name  VARCHAR(255) NOT NULL,
    last_name   VARCHAR(255) NOT NULL,
    email       VARCHAR(255) NOT NULL ,
    phone_number          VARCHAR(15) NOT NULL,
    house_id    INT REFERENCES houses(id) ON DELETE SET NULL,
    dorm_id     INT REFERENCES dorms(id) ON DELETE SET NULL,
    pending_approval BOOLEAN NOT NULL DEFAULT TRUE
);


CREATE TABLE courses (
    id          SERIAL PRIMARY KEY,
    course_name VARCHAR(255) NOT NULL,
    teacher_id  VARCHAR(255) NOT NULL REFERENCES teachers(id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE house_courses (
    house_id       INT NOT NULL REFERENCES houses(id) ON DELETE CASCADE ON UPDATE CASCADE,
    course_id      INT NOT NULL REFERENCES courses(id) ON DELETE CASCADE ON UPDATE CASCADE,
    is_mandatory   BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (house_id, course_id)
);

CREATE TABLE student_courses (
    student_id VARCHAR(255) NOT NULL REFERENCES students(id) ON DELETE CASCADE ON UPDATE CASCADE,
    course_id  INT NOT NULL REFERENCES courses(id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (student_id, course_id)
);

CREATE TABLE lab_assistants (
    course_id  INT NOT NULL REFERENCES courses(id) ON DELETE CASCADE ON UPDATE CASCADE,
    teacher_id VARCHAR(255) NOT NULL REFERENCES teachers(id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (course_id, teacher_id)
);

CREATE TABLE student_course_grades (
    student_id   VARCHAR(255) NOT NULL REFERENCES students(id) ON DELETE CASCADE ON UPDATE CASCADE,
    course_id    INT NOT NULL REFERENCES courses(id) ON DELETE CASCADE ON UPDATE CASCADE,
    exam1_grade  NUMERIC(5,2),
    exam2_grade  NUMERIC(5,2),
    exam3_grade  NUMERIC(5,2),
    lab_grade    NUMERIC(5,2),
    overall_grade NUMERIC(5,2),
    PRIMARY KEY (student_id, course_id)
);
