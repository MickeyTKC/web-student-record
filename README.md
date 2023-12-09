# S350F-Project-Web-Student-Record
## Group Info
### Group 11
- Tse Kai Chun 12755669
- Mak Ho Ying 12755670
- Chow Hong Nin 13032510
- Lo Pak Sum 13091902
- Wong Ka Ho 13251975

**Roles**
- Student
- Teacher
- Admin

**Core Functions**
- Login
- Logout
- View Personal Informaion
- Edit Personal Informaion
- View Academic Record
- Edit Student Academic Record by Teacher

**Function of Roles**
- Student
	1. Logout
	2. View Personal Informaion
	3. Edit Personal Informaion
	4. View Academic Record
	5. View Studying Course
- Teacher
	1. Logout
	2. View Personal Informaion
	3. Edit Personal Informaion
	4. View Teaching Courses
	5. View Course Detail of Semester
	6. Edit Course Detail of Semester
	7. View Student Academic Record of Teaching Course
	8. Edit Student Academic Record of Teaching Course
	9. View Programe Informaion
	10. Edit Programe Informaion
- Admin
	1. Logout
	2. View Personal Informaion
	3. Edit Personal Informaion
	4. View Courses
	5. Add Course Detail of Semester
	6. View Course Detail of Semester
	7. Edit Course Detail of Semester
	8. Add Student Academic Record of Teaching Course
	9. Add Student Academic Record of Teaching Course
	10. View Student Academic Record of Teaching Course
	11. View Student Academic Record of Teaching Course
	12. Add Programe Informaion
	13. View Programe Informaion
	14. Edit Programe Informaion
	15. Add Users
	16. View Users
	17. Edit Users

## Navigation
**Route of Views**
   - `/`
   - `/login`
   - `/profile`
   - `/profile/edit`
   - `/academic`
   - `/dashboard`
   - `/course/`
   - `/course/add`
   - `/course/:id/edit`
   - `/course/:id/add`
   - `/course/:id/:year/:sem`
   - `/course/:id/:year/:sem/edit`
   - `/course/:id/:year/:sem/students/add`
   - `/course/:id/:year/:sem/students`
   - `/course/:id/:year/:sem/:student`
   - `/programs`
   - `/program/add`
   - `/program/:id`
   - `/program/:id/edit`

## User Interface Guides
- Login

	- Home

	- Profile <p> ↘ View Profile
		- Edit Profile

	- Course <p> ↘ View Course Information
		- Add Course `Admin`
		- Course Information _(hyper-link)_
			- Edit Course Information `Teacher/Admin`
			- Add Course Details `Admin`

	- Academic Records `Student` <p> ↘ View Course Details and Grade
		-  Course Information _(hyper-link)_

	- Dashboard `Teacher/Admin` <p> ↘ View Course Details
		- Program Management `Admin` <p> ↘ View Program Details
			- Add Program 
			- Program Details _(hyper-link)_
				- Edit Program Details
				- Teacher(Leaders) Information _(hyper-link)_
					- Edit Teacher(Leaders) Information 
				- Program Course Information _(hyper-link)_
					- Edit Course Information 
					- Add Course Details
			
		- User Management `Admin` <p> ↘ View User Information
			- Add User
			- User Details _(hyper-link)_
				- Edit User Information 

		- Course Management `Teacher/Admin` <p> ↘ View Course Details
			- Course Information _(hyper-link)_
				- Edit Course Information 
			- Course Details & Add Students _(Pre-registration)_
				- Student Records
					- Student Information _(hyper-link)_
						- Edit Student Information `Admin`
					- Edit Course Student Records _(Final Grade)_
				- Edit Course Details


## Restful APIs
[APIs](/routes/README.md)