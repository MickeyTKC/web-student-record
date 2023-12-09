# S350F-Project-Web-Student-Record
## Group Info
### Group 11
- Tse Kai Chun 12755669
- Mak Ho Ying 12755670
- Chow Hong Nin 13032510
- Lo Pak Sum 13091902
- Wong Ka Ho 13251975

**Description**

The School of Science and Technology is a part of HKMU that aims to advance learning and knowledge through teaching and research. Now they require a system to manage student records. The main purpose of this system is to manage and record student academic records and student personal information. 

**Installation**

1.User should have node.js before  boot up the system.
2.Create an .env file(no name) with following code:
    db_name = SE_Project
    db_url = mongodb+srv://seprojectCollect:thisISpassword@cluster0.eknv0ni.mongodb.net/
    secret = login
3. Install Enironment by using "npm install" in Terminal
4. Wait for download completed.

**How to use**
1. Start the System by using "npm start"
2. Terminal will show the following message:
    server is runing on 3000
    MongoDB connected successfully
3. Use a Web Broswer and go to the page "http://localhost:3000/"

**Roles and Sample Account**
- Student
  login id: s123456
  password: pT3kD1Ri
- Teacher
  login id: teacher1
  password: TeacherPass!123
- Admin
  login id: admin1
  password: admin123

**Features**
1. Student Allow:
a. Edit/View Personal Profile
b. View Course are registed
c. View their academic Record

2. Teachers Allow:
a. Edit/View Personal Profile
b. Edit/View Course's Information they are teaching
c. Edit/View Course's Details they are teaching
d. Edit/View Students Record they are teaching

3. Administrators Allow:
a. Edit/View Personal Profile
b. Add/Edit/View ALL Course's Information
c. Add/Edit/View ALL Course's Details they are teaching
d. Edit/View ALL Students Record
e. Add/Edit/View Program Information and details
f. Add/Edit/View User Information

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

	- Profile <p> ↪ View Profile
		- Edit Profile

	- Course <p> ↪ View Course Information
		- Add Course `Admin`
		- Course Information _(hyper-link)_
			- Edit Course Information `Teacher/Admin`
			- Add Course Details `Admin`

	- Academic Records `Student` <p> ↪ View Course Details and Grade
		-  Course Information _(hyper-link)_

	- Dashboard `Teacher/Admin` <p> ↪ View Course Details
		- Program Management `Admin` <p> ↪ View Program Details
			- Add Program 
			- Program Details _(hyper-link)_
				- Edit Program Details
				- Teacher(Leaders) Information _(hyper-link)_
					- Edit Teacher(Leaders) Information 
				- Program Course Information _(hyper-link)_
					- Edit Course Information 
					- Add Course Details
			
		- User Management `Admin` <p> ↪ View User Information
			- Add User
			- User Details _(hyper-link)_
				- Edit User Information 

		- Course Management `Teacher/Admin` <p> ↪ View Course Details
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
