TRUNCATE TABLE teachers RESTART IDENTITY CASCADE;
TRUNCATE TABLE houses RESTART IDENTITY CASCADE;
TRUNCATE TABLE dorms RESTART IDENTITY CASCADE;
TRUNCATE TABLE courses RESTART IDENTITY CASCADE;
TRUNCATE TABLE house_courses RESTART IDENTITY CASCADE;
TRUNCATE TABLE student_courses RESTART IDENTITY CASCADE;
TRUNCATE TABLE lab_assistants RESTART IDENTITY CASCADE;
TRUNCATE TABLE student_course_grades RESTART IDENTITY CASCADE;


INSERT INTO teachers (id, first_name, last_name, email, phone_number)
VALUES
    ('clerk_teacher_1', 'Minerva', 'McGonagall', 'mmcgonagall@hogwarts.ac.uk', '43324'),
        ('clerk_teacher_2', 'Severus', 'Snape', 'ssnape@hogwarts.ac.uk', '41331'),
            ('clerk_teacher_3', 'Filius', 'Flitwick', 'fflitwick@hogwarts.ac.uk', '64323');

INSERT INTO houses (house_name, head_teacher_id)
VALUES
    ('Gryffindor', 'clerk_teacher_1'),
    ('Slytherin', 'clerk_teacher_2'),
    ('Ravenclaw', 'clerk_teacher_1'),
    ('Hufflepuff', 'clerk_teacher_2');

INSERT INTO dorms (house_id, dorm_name)
VALUES
    -- Gryffindor dorms
    (1, 'Gryffindor Tower A'),
    (1, 'Gryffindor Tower B'),
    -- Slytherin dorms
    (2, 'Slytherin Dungeon A'),
    (2, 'Slytherin Dungeon B'),
    -- Ravenclaw dorms
    (3, 'Ravenclaw Tower A'),
    (3, 'Ravenclaw Tower B'),
    -- Hufflepuff dorms
    (4, 'Hufflepuff Basement A'),
    (4, 'Hufflepuff Basement B');


INSERT INTO students (id, first_name, last_name, email, house_id, dorm_id, phone_number)
VALUES
    -- Gryffindor students
    ('user_2qiqaa3QPOXbOpIg7eTkgXGjACv', 'Harry', 'Potter', 'hpotter@hogwarts.ac.uk', 1, 1, '12344'),
    ('clerk_student_103', 'Hermione', 'Granger', 'hgranger@hogwarts.ac.uk', 1, 1, '56789'),
    ('clerk_student_104', 'Ron', 'Weasley', 'rweasley@hogwarts.ac.uk', 1, 2, '98765'),

    -- Slytherin students
    ('clerk_student_102', 'Draco', 'Malfoy', 'dmalfoy@hogwarts.ac.uk', 2, 3, '75332'),
    ('clerk_student_105', 'Pansy', 'Parkinson', 'pparkinson@hogwarts.ac.uk', 2, 3, '22334'),
    ('clerk_student_106', 'Blaise', 'Zabini', 'bzabini@hogwarts.ac.uk', 2, 4, '33445'),

    -- Ravenclaw students
    ('clerk_student_107', 'Luna', 'Lovegood', 'llovegood@hogwarts.ac.uk', 3, 5, '44556'),
    ('clerk_student_108', 'Cho', 'Chang', 'cchang@hogwarts.ac.uk', 3, 5, '55667'),
    ('clerk_student_109', 'Padma', 'Patil', 'ppatil@hogwarts.ac.uk', 3, 6, '66778'),

    -- Hufflepuff students
    ('clerk_student_110', 'Cedric', 'Diggory', 'cdiggory@hogwarts.ac.uk', 4, 7, '77889'),
    ('clerk_student_111', 'Hannah', 'Abbott', 'habbott@hogwarts.ac.uk', 4, 7, '88990'),
    ('clerk_student_112', 'Ernie', 'Macmillan', 'emacmillan@hogwarts.ac.uk', 4, 8, '99001');

INSERT INTO courses (course_name, teacher_id)
VALUES
    ('Transfiguration', 'clerk_teacher_1'),
    ('Potions', 'clerk_teacher_2'),
    ('Charms', 'clerk_teacher_3'),
    ( 'Defense Against the Dark Arts','clerk_teacher_2'),
    ( 'Herbology','clerk_teacher_1'),
    ( 'Astronomy','clerk_teacher_1'),
    ( 'History of Magic','clerk_teacher_1'),
    ( 'Flying Lessons','clerk_teacher_1');

INSERT INTO house_courses (house_id, course_id, is_mandatory)
VALUES
    -- Gryffindor courses
    (1, 1, TRUE),  -- Transfiguration (mandatory)
    (1, 2, TRUE),  -- Potions (mandatory)
    (1, 4, FALSE), -- Defense Against the Dark Arts (optional)
    (1, 6, FALSE), -- Astronomy (optional)
    (1, 7, FALSE), -- History of Magic (optional)
    (1, 8, FALSE), -- Flying Lessons (optional)

    -- Slytherin courses
    (2, 2, TRUE),  -- Potions (mandatory)
    (2, 3, TRUE),  -- Charms (mandatory)
    (2, 5, FALSE), -- Herbology (optional)
    (2, 6, FALSE), -- Astronomy (optional)
    (2, 8, FALSE), -- Flying Lessons (optional)

    -- Ravenclaw courses
    (3, 1, TRUE),  -- Transfiguration (mandatory)
    (3, 3, TRUE),  -- Charms (mandatory)
    (3, 4, FALSE), -- Defense Against the Dark Arts (optional)
    (3, 5, FALSE), -- Herbology (optional)
    (3, 7, FALSE), -- History of Magic (optional)

    -- Hufflepuff courses
    (4, 5, TRUE),  -- Herbology (mandatory)
    (4, 8, TRUE),  -- Flying Lessons (mandatory)
    (4, 2, FALSE), -- Potions (optional)
    (4, 4, FALSE), -- Defense Against the Dark Arts (optional)
    (4, 6, FALSE); -- Astronomy (optional)


INSERT INTO student_courses (student_id, course_id)
VALUES
    -- Gryffindor
    ('user_2qiqaa3QPOXbOpIg7eTkgXGjACv', 1), -- Harry Potter: Transfiguration
    ('user_2qiqaa3QPOXbOpIg7eTkgXGjACv', 2), -- Harry Potter: Potions
    ('user_2qiqaa3QPOXbOpIg7eTkgXGjACv', 4), -- Defense Against the Dark Arts (optional)
    ('user_2qiqaa3QPOXbOpIg7eTkgXGjACv', 6), -- Astronomy (optional)
    ('user_2qiqaa3QPOXbOpIg7eTkgXGjACv', 7), -- History of Magic (optional)

    ('clerk_student_103', 1), -- Hermione Granger: Transfiguration
    ('clerk_student_103', 2), -- Hermione Granger: Potions
    ('clerk_student_103', 4), -- Defense Against the Dark Arts (optional)
    ('clerk_student_103', 6), -- Astronomy (optional)
    ('clerk_student_103', 7), -- History of Magic (optional)

    ('clerk_student_104', 1), -- Ron Weasley: Transfiguration
    ('clerk_student_104', 2), -- Ron Weasley: Potions
    ('clerk_student_104', 4), -- Defense Against the Dark Arts (optional)
    ('clerk_student_104', 6), -- Astronomy (optional)
    ('clerk_student_104', 7), -- History of Magic (optional)

    -- Slytherin
    ('clerk_student_102', 2), -- Draco Malfoy: Potions
    ('clerk_student_102', 3), -- Charms
    ('clerk_student_102', 5), -- Herbology (optional)
    ('clerk_student_102', 6), -- Astronomy (optional)
    ('clerk_student_102', 8), -- Flying Lessons (optional)

    ('clerk_student_105', 2), -- Pansy Parkinson: Potions
    ('clerk_student_105', 3), -- Charms
    ('clerk_student_105', 5), -- Herbology (optional)
    ('clerk_student_105', 6), -- Astronomy (optional)
    ('clerk_student_105', 8), -- Flying Lessons (optional)

    ('clerk_student_106', 2), -- Blaise Zabini: Potions
    ('clerk_student_106', 3), -- Charms
    ('clerk_student_106', 5), -- Herbology (optional)
    ('clerk_student_106', 6), -- Astronomy (optional)
    ('clerk_student_106', 8), -- Flying Lessons (optional)

    -- Ravenclaw
    ('clerk_student_107', 1), -- Luna Lovegood: Transfiguration
    ('clerk_student_107', 3), -- Charms
    ('clerk_student_107', 4), -- Defense Against the Dark Arts (optional)
    ('clerk_student_107', 5), -- Herbology (optional)
    ('clerk_student_107', 7), -- History of Magic (optional)

    ('clerk_student_108', 1), -- Cho Chang: Transfiguration
    ('clerk_student_108', 3), -- Charms
    ('clerk_student_108', 4), -- Defense Against the Dark Arts (optional)
    ('clerk_student_108', 5), -- Herbology (optional)
    ('clerk_student_108', 6), -- Astronomy (optional)

    ('clerk_student_109', 1), -- Padma Patil: Transfiguration
    ('clerk_student_109', 3), -- Charms
    ('clerk_student_109', 4), -- Defense Against the Dark Arts (optional)
    ('clerk_student_109', 6), -- Astronomy (optional)
    ('clerk_student_109', 7), -- History of Magic (optional)

    -- Hufflepuff
    ('clerk_student_110', 5), -- Cedric Diggory: Herbology
    ('clerk_student_110', 8), -- Flying Lessons
    ('clerk_student_110', 2), -- Potions (optional)
    ('clerk_student_110', 4), -- Defense Against the Dark Arts (optional)
    ('clerk_student_110', 6), -- Astronomy (optional)

    ('clerk_student_111', 5), -- Hannah Abbott: Herbology
    ('clerk_student_111', 8), -- Flying Lessons
    ('clerk_student_111', 2), -- Potions (optional)
    ('clerk_student_111', 4), -- Defense Against the Dark Arts (optional)
    ('clerk_student_111', 6), -- Astronomy (optional)

    ('clerk_student_112', 5), -- Ernie Macmillan: Herbology
    ('clerk_student_112', 8), -- Flying Lessons
    ('clerk_student_112', 2), -- Potions (optional)
    ('clerk_student_112', 4), -- Defense Against the Dark Arts (optional)
    ('clerk_student_112', 6); -- Astronomy (optional)

INSERT INTO lab_assistants (course_id, teacher_id)
VALUES
    (2, 'clerk_teacher_3'),  
    (1, 'clerk_teacher_2'); 

INSERT INTO student_course_grades (
    student_id, 
    course_id, 
    exam1_grade, 
    exam2_grade, 
    exam3_grade, 
    lab_grade, 
    overall_grade
)
VALUES
    -- Harry: Gryffindor
    ('user_2qiqaa3QPOXbOpIg7eTkgXGjACv', 1, 85.0, 88.0, 92.0, 90.0), -- Transfiguration
    ('user_2qiqaa3QPOXbOpIg7eTkgXGjACv', 2, 70.0, 75.0, NULL, 68.0), -- Potions
    ('user_2qiqaa3QPOXbOpIg7eTkgXGjACv', 3, 100.0, 95.0, 95.0, 93.0), -- Charms

    -- Draco: Slytherin
    ('clerk_student_102', 2, 85.0, 88.0, 93.0, 90.0), -- Potions
    ('clerk_student_102', 3, 60.0, 65.0, NULL, 75.0), -- Charms
    ('clerk_student_102', 8, 85.0, 80.0, NULL, 82.0), -- Flying Lessons

    -- Hermione: Gryffindor
    ('clerk_student_103', 1, 98.0, 96.0, 100.0, 99.0), -- Transfiguration
    ('clerk_student_103', 2, 95.0, 93.0, NULL, 97.0), -- Potions
    ('clerk_student_103', 4, 100.0, 98.0, 99.0, 98.0), -- Defense Against the Dark Arts

    -- Ron: Gryffindor
    ('clerk_student_104', 1, 75.0, 78.0, 80.0, 76.0), -- Transfiguration
    ('clerk_student_104', 2, 68.0, 70.0, NULL, 72.0,), -- Potions
    ('clerk_student_104', 6, 80.0, 85.0, NULL, 78.0,), -- Astronomy

    -- Pansy: Slytherin
    ('clerk_student_105', 2, 88.0, 85.0, NULL, 87.0), -- Potions
    ('clerk_student_105', 3, 75.0, 78.0, 80.0, 76.0), -- Charms
    ('clerk_student_105', 5, 70.0, 73.0, NULL, 72.0), -- Herbology

    -- Blaise: Slytherin
    ('clerk_student_106', 2, 82.0, 85.0, 88.0, 84.0), -- Potions
    ('clerk_student_106', 3, 70.0, 72.0, NULL, 74.0), -- Charms
    ('clerk_student_106', 8, 90.0, 88.0, NULL, 89.0), -- Flying Lessons

    -- Luna: Ravenclaw
    ('clerk_student_107', 1, 95.0, 92.0, 90.0, 93.0), -- Transfiguration
    ('clerk_student_107', 3, 85.0, 88.0, 87.0, 89.0), -- Charms
    ('clerk_student_107', 7, 90.0, 88.0, NULL, 91.0), -- History of Magic

    -- Cedric: Hufflepuff
    ('clerk_student_110', 5, 88.0, 90.0, NULL, 89.0), -- Herbology
    ('clerk_student_110', 8, 85.0, 87.0, 88.0, 86.0), -- Flying Lessons
    ('clerk_student_110', 4, 78.0, 80.0, NULL, 79.0); -- Defense Against the Dark Arts