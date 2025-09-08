# Project Requirements

## Vision
To create a flexible, user-friendly, and scalable Learning Management System that empowers learners, instructors, and administrators by providing a structured yet adaptable environment for managing programming problems structured around courses, assignments, submissions, and feedback. The LMS will support diverse learning needs, streamline administrative processes, and foster meaningful engagement between all roles in the system. You'll also need to add some kind of cool feature for a unique submission type.

## Roles
### Student
Users who are in specific sections and courses who submit assignments to be graded, resubmit assignments for a better grade, and leave comments on submissions.
### TA
Teaching assistants who help grade assignments, comment on students' submissions, and help students.
### Professor
Teachers who design and run courses, publish assignments, grade submissions on assignments, and leave comments on students' submissions.
### Admin
Controls user management, courses, and overall system maintenance


## User Stories
### Students
- As a student, I want to be able to reply to comments on submissions to discuss the assignment with others who have completed it.
- As a student, I want to be able to submit files to receive grades on assignments so I know how well I am doing in a course.
- As a student, I want to submit assignments online so I can complete coursework digitally.
- As a student, I want to resubmit before the deadline so I can fix mistakes and improve my grade.
- As a student, I want to view my grades and instructor feedback so I understand my performance.

### Teaching Assistants
- As a TA, I want to grade students' submissions in my section so I can give them a grade on their work.
- As a TA, I want to leave comments on students' submissions in my section so I can give them feedback on their work.
- As a TA, I want to leave inline comments on student submissions so feedback is specific and useful.
- As a TA, I want to be able to regrade students' resubmissions so I can accurately update their grade for an assignment.

### Professors
- As a professor, I want to be able to create assignments for an entire course so that students know what they have to do.<br>
- As a professor, I want to be able to grade students' submissions so I can give them a grade on their work.
- As a professor, I want to be able to make changes to assignments in case something needs to be changed.
- As a professor, I want to be able to leave and reply to comments on students' submissions so I can give them feedback on their work.
- As a professor, I want to be able to control what type of file gets submitted on an assignment so I can reduce the difficulty in grading.

### Admin
- As an admin, I want to be able to assign professors, teaching assistants, and students to classes so that permissions are correct.
- As an admin, I want to be able to create and remove courses that are no longer being offered or newly being offered to have an accurate coursebook on the app.
- As an admin, I want to be able to create courses and assign sections so that if new classes get added, they can be implemented easily.

## Non-Function Requirements
- Security: Role-based access, password hashing, and OAuth authentication for users.
- Availability: 99% uptime for the server, with downtime between 2:00 AM and 4:00 AM local, if needed.
- Scalability: The LMS system should continue to work even as the user base grows.

## Unique Submission Type
Students will be able to view other students' submissions after they submit. Students can also leave comments on other students' submissions to discuss aspects of HW or projects. This will be intended to be used with programming problems (i.e., Python, Jupyter, JS/TS). Students, TAs, and Professors can all make public comments on students' submissions. This will be beneficial because it will allow students to discuss problems with their peers and compare answers to make better revisions. The comments will be refreshed on resubmission. Professors and TAs will have the ability to remove comments as seen fit.
