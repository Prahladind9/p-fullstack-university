select * from know_lad.institute_details id ;
select * from know_lad.modules m;
select * from know_lad.users u ;

select * from know_lad.student_details sd ;
select * from know_lad.faculty_details sd ;
select * from know_lad.faculty_student_mapping fsm ;

select * from know_lad.attendance a ;
select * from know_lad.diary d ;
select * from know_lad.diary_student_mapping dsm ;

select * from know_lad.student_result sr ;


--Step1
INSERT INTO know_lad.institute_details
(institute_id, institute_name)
VALUES(1, 'KnowLad');
INSERT INTO know_lad.institute_details
(institute_id, institute_name)
VALUES(2, 'KnowLad2');

--Step2
INSERT INTO know_lad.student_details
(student_id, gender, institute_category, institute_sub_category, student_name, student_section, student_standard)
VALUES(1, 'M', 'SCHOOL', 'Primary', 'StudentOne', 'A', 1);
INSERT INTO know_lad.student_details
(student_id, gender, institute_category, institute_sub_category, student_name, student_section, student_standard)
VALUES(2, 'F', 'SCHOOL', 'Primary', 'StudentTwo', 'A', 1);

--Step3
INSERT INTO know_lad.faculty_details
(faculty_id, faculty_name, gender, institute_category, institute_sub_category, subject)
VALUES(1, 'TeacherOne', 'F', 'SCHOOL', 'Primary', 'English');
INSERT INTO know_lad.faculty_details
(faculty_id, faculty_name, gender, institute_category, institute_sub_category, subject)
VALUES(2, 'TeacherTwo', 'F', 'SCHOOL', 'Primary', 'Maths');

--Step4
INSERT INTO know_lad.users
(user_id, email, enabled, first_name, last_name, "password", phone, user_name, user_type, faculty_details_faculty_id, institute_id, student_details_student_id)
VALUES(1, 't@lad.com', true, 'Student', 'One', 's', '989888988', 's', 'STUDENT', NULL, 1, 1);
INSERT INTO know_lad.users
(user_id, email, enabled, first_name, last_name, "password", phone, user_name, user_type, faculty_details_faculty_id, institute_id, student_details_student_id)
VALUES(2, 't@lad.com', true, 'Teacher', 'One', 't', '989888988', 't', 'TEACHER', 1, 1, NULL);
INSERT INTO know_lad.users
(user_id, email, enabled, first_name, last_name, "password", phone, user_name, user_type, faculty_details_faculty_id, institute_id, student_details_student_id)
VALUES(3, 't@lad.com', true, 'Student', 'Two', 's', '989888988', 's2', 'STUDENT', NULL, 1, 2);
INSERT INTO know_lad.users
(user_id, email, enabled, first_name, last_name, "password", phone, user_name, user_type, faculty_details_faculty_id, institute_id, student_details_student_id)
VALUES(4, 't@lad.com', true, 'Teacher', 'Two', 't', '989888988', 't2', 'TEACHER', 2, 1, NULL);

--Step5
INSERT INTO know_lad.faculty_student_mapping
(faculty_student_mapping_id, faculty_id, student_section, student_standard)
VALUES(1, 1, 'A', 1);
INSERT INTO know_lad.faculty_student_mapping
(faculty_student_mapping_id, faculty_id, student_section, student_standard)
VALUES(2, 2, 'A', 1);

--Step6
INSERT INTO know_lad.attendance
(attendance_id, academic_year, attendance_date, attendance_status, day_of_week, faculty_id, "month", student_id)
VALUES(1, 2020, '2020-07-17', 'P', '17', 1, '6', 1);
INSERT INTO know_lad.attendance
(attendance_id, academic_year, attendance_date, attendance_status, day_of_week, faculty_id, "month", student_id)
VALUES(2, 2020, '2020-07-16', 'A', '16', 1, '6', 1);
INSERT INTO know_lad.attendance
(attendance_id, academic_year, attendance_date, attendance_status, day_of_week, faculty_id, "month", student_id)
VALUES(3, 2020, '2020-07-23', 'H', '23', 1, '6', 1);
INSERT INTO know_lad.attendance
(attendance_id, academic_year, attendance_date, attendance_status, day_of_week, faculty_id, "month", student_id)
VALUES(4, 2020, '2020-06-30', 'P', '30', 1, '5', 1);
INSERT INTO know_lad.attendance
(attendance_id, academic_year, attendance_date, attendance_status, day_of_week, faculty_id, "month", student_id)
VALUES(5, 2020, '2020-07-13', 'P', '13', 1, '6', 1);



--Step7
INSERT INTO know_lad.diary
(diary_id, diary_date, diary_time_stamp, faculty_id, for_all_students, home_work, student_section, student_standard, "version")
VALUES(1, '2020-07-17', '2020-07-17 00:00:00.000', 1, true, '1) Complete Alphabets', 'A', 1, 0);
INSERT INTO know_lad.diary
(diary_id, diary_date, diary_time_stamp, faculty_id, for_all_students, home_work, student_section, student_standard, "version")
VALUES(2, '2020-07-17', '2020-07-17 00:00:00.000', 2, true, '1) Complete 1-20 Numbers', 'A', 1, 0);
INSERT INTO know_lad.diary
(diary_id, diary_date, diary_time_stamp, faculty_id, for_all_students, home_work, student_section, student_standard, "version")
VALUES(3, '2020-07-18', '2020-07-18 00:00:00.000', 2, true, 'COVID - BE SAFE!', 'A', 1, 0);

--Step8
INSERT INTO know_lad.diary_student_mapping
(diary_student_mapping_id, diary_date, diary_id, faculty_id, for_all_students, student_id, student_section, student_standard)
VALUES(1, '2020-07-17', 1, 1, true, NULL, 'A', 1);
INSERT INTO know_lad.diary_student_mapping
(diary_student_mapping_id, diary_date, diary_id, faculty_id, for_all_students, student_id, student_section, student_standard)
VALUES(2, '2020-07-17', 2, 2, true, NULL, 'A', 1);
INSERT INTO know_lad.diary_student_mapping
(diary_student_mapping_id, diary_date, diary_id, faculty_id, for_all_students, student_id, student_section, student_standard)
VALUES(3, '2020-07-18', 3, 2, true, NULL, 'A', 1);

--Step9
INSERT INTO know_lad.student_result
(passed, student_result_id, academic_year, first_language, maths, overall_rank, science, second_language, social, student_id, test_type, third_language, total)
VALUES(true, 1, 2020, 80, 100, 1, 90, 90, 90, 1, 'F', 90, 540);

INSERT INTO know_lad.student_result
(passed, student_result_id, academic_year, first_language, maths, overall_rank, science, second_language, social, student_id, test_type, third_language, total)
VALUES(true, 2, 2020, 80, 100, 1, 90, 90, 90, 1, 'Q', 40, 500);

INSERT INTO know_lad.student_result
(passed, student_result_id, academic_year, first_language, maths, overall_rank, science, second_language, social, student_id, test_type, third_language, total)
VALUES(true, 3, 2020, 90, 100, 1, 90, 90, 90, 1, 'H', 90, 550);

INSERT INTO know_lad.student_result
(passed, student_result_id, academic_year, first_language, maths, overall_rank, science, second_language, social, student_id, test_type, third_language, total)
VALUES(false, 4, 2020, 90, 100, 1, 90, 90, 90, 1, 'U2', 30, 490);

INSERT INTO know_lad.student_result
(passed, student_result_id, academic_year, first_language, maths, overall_rank, science, second_language, social, student_id, test_type, third_language, total)
VALUES(true, 5, 2020, 90, 100, 1, 90, 90, 90, 1, 'U1', 90, 550);

INSERT INTO know_lad.student_result
(passed, student_result_id, academic_year, first_language, maths, overall_rank, science, second_language, social, student_id, test_type, third_language, total)
VALUES(true, 6, 2020, 80, 100, 2, 90, 90, 90, 2, 'F', 80, 530);

INSERT INTO know_lad.student_result
(passed, student_result_id, academic_year, first_language, maths, overall_rank, science, second_language, social, student_id, test_type, third_language, total)
VALUES(true, 7, 2020, 80, 100, 2, 90, 90, 90, 2, 'Q', 50, 510);