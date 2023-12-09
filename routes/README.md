# S350F-Project-Web-Student-Record Restful API

## Authentication 
### Login
- Method: POST
- Path: /api/auth/login
- Description: Authenticates a user based on their ID and password.
**Request Body:**
    - id: User ID (string)
    - password: User password (string)
**Response:**

Success (200 OK):
```
Message: "Login successful"
```

User not found (404 Not Found):
```
Message: "User not found"
```
Invalid password (401 Unauthorized):
```
Message: "Invalid password"
```
Internal server error (500 Internal Server Error):
```
Message: "Internal server error"
```

### Logout
- Method: POST
- Path: /api/auth/logout
- Description: Logs out the authenticated user.
**Response:**
Success (200 OK):
```
Message: "Logout successful"
```
Unauthorized (401 Unauthorized):
```
Message: "Unauthorized"
```
Internal server error (500 Internal Server Error):
```
Message: "Internal server error"
```
## User
### Create a User

- Method: POST
- Path: `/`
- Required Role: Admin
- Description: Creates a new user with the provided details.
- Request Body:
id: User ID (string, required)
password: User password (string, required)
role: User role (string, required)
name: User name (string)
department: User department (string)
major: User major (string)
progYear: User program year (string)
dateFrom: User start date (string)
dateTo: User end date (string)
email: User email (string)
phoneNo: User phone number (string)
emergencyPhoneNo: User emergency phone number (string)
**Response:**
Success (201 Created): 
```
Body: Returns the created user object.
```
Bad Request (400 Bad Request):
```
Body: Error message if the ID, password, or role is missing.
```
Internal Server Error (500 Internal Server Error):
```
Body: Error message if an error occurs during user creation.
```

### Get All Users

- Method: GET
- Path: `/api/user`
- Required Role: Admin
- Description: Retrieves all users.
**Response:**
Success (200 OK): 
Body: Returns an array of user objects.
Internal Server Error (500 Internal Server Error):
Body: Error message if an error occurs during user retrieval.

### Get a Specific User

- Method: GET
- Path: `/api/user/:id`
- Required Role: Admin
- Description: Retrieves a user by their ID.
**Request Parameters:**
  - id: User ID (string)
**Response:**
Success (200 OK): 
```
Body: Returns the user object.
```
User Not Found (404 Not Found): 
```
Body: Error message if the user with the provided ID is not found.
```
Internal Server Error (500 Internal Server Error):
```
Body: Error message if an error occurs during user retrieval.
```

### Update User Profile

- Method: PATCH
- Path: `/api/user/profile/edit`
- Required Role: Login
- Description: Updates the profile of the currently logged-in user.
- Request Body: Contains the fields to be updated.
email: User email (string)
phoneNo: User phone number (string)
emergencyPhoneNo: User emergency phone number (string)
**Response:**
Success (200 OK):
```
Body: Returns the updated user object.
```
User Not Found (404 Not Found): 
```
Body: Error message if the user is not found.
```
Internal Server Error (500 Internal Server Error):
```
Body: Error message if an error occurs during user update.
```

### Update a User
- Method: PATCH
- Path: `/api/user/:id`
- Required Role: Login
- Description: Updates a user by their ID.
**Request Parameters:**
id: User ID (string)
**Request Body: Contains the fields to be updated.**
password: User password (string)
role: User role (string)
name: User name (string)
department: User department (string)
major: User major (string)
progYear: User program year (string)
dateFrom: User start date (string)
dateTo: User end date (string)
email: User email (string)
phoneNo: User phone number (string)
emergencyPhoneNo: User emergency phone number (string)
** Response:**
Success (200 OK): 
```
Body: Returns the updated user object.
```
User Not Found (404 Not Found): 
```
Body: Error message if the user with the provided ID is not found.
```
Bad Request (400 Bad Request): 
```
Body: Error message if the ID or role is missing.
```
Internal Server Error (500 Internal Server Error):
```
Body: Error message if an error occurs during user update.
```

### Update User Password

- Method: PATCH
- Path: `/api/user/:id/password`
- Required Role: Login
- Description: Updates the password of a user by their ID.
**Request Parameters:**
id: User ID (string)
**Request Body:**
password: User password (string)
**Response:**
Success (200 OK): 
```
Body: Returns the updated user object.
```
User Not Found (404 Not Found):
```
Body: Error message if the user with the provided ID is not found.
```
Bad Request (400 Bad Request): 
```
Body: Error message if the ID is missing.
```
Internal Server Error (500 Internal Server Error):
```
Body: Error message if an error occurs during password update.
```

## Course

### Create a Course
- Method: POST
- Path: `/api/course/`
- Description: Creates a new course.
- Required Role: Admin
**Request Body:**
- id: Course ID (string, required)
- name: Course name (string, required)
- dept: Course department (string)
- intro: Course introduction (string)
- credit: Course credit (number, required)
**Response:**
Success (201 Created):
```
Body: Created course object
```
Bad Request (400 Bad Request):
```
Body: Error message if any of the required fields are missing
```
Internal Server Error (500 Internal Server Error):
```
Body: Error message if an error occurs during course creation
```
### Get All Courses
- Method: GET
- Path: `/api/crourse`
- Description: Retrieves all courses.
- Required Role: Login
**Response:**
Success (200 OK):
```
Body: Array of course objects
```
Internal Server Error (500 Internal Server Error):
```
Body: Error message if an error occurs during course retrieval
```
### Get a Specific Course
- Method: GET
- Path: `/api/course/:id`
- Description: Retrieves a specific course by ID.
- Required Role: Login
**Request Parameters:**
id: Course ID (string)
**Response:**
Success (200 OK):
```
Body: Course object
```
Course Not Found (404 Not Found):
```
Body: Error message if the course with the provided ID is not found
```
Internal Server Error (500 Internal Server Error):
```
Body: Error message if an error occurs during course retrieval
```
### Update a Course
- Method: PATCH
- Path: `/api/course/:id`
- Description: Updates a specific course by ID.
- Required Role: Not Student
**Request Parameters:**
id: Course ID (string)
**Request Body:**
id: Course ID (string, required)
name: Course name (string, required)
intro: Course introduction (string)
credit: Course credit (number, required)
**Response:**
Success (200 OK):
```
Body: Updated course object
```
Course Not Found (404 Not Found):
```
Body: Error message if the course with the provided ID is not found
```
Bad Request (400 Bad Request):
```
Body: Error message if any of the required fields are missing
```
Internal Server Error (500 Internal Server Error):
```
Body: Error message if an error occurs during course update
```
### Create a Course Detail
- Method: POST
- Path: `/api/course/detail`
- Description: Creates a new course detail.
- Required Role: Admin
**Request Body:**
id: Course ID (string, required)
year: Year (string, required)
sem: Semester (string, required)
teacher: Teacher (string, required)
**Response:**
Success (201 Created):
```
Body: Created course detail object
```
Bad Request (400 Bad Request):
```
Body: Error message if the course detail already exists or the course does not exist
```
Internal Server Error (500 Internal Server Error):
```
Body: Error message if an error occurs during course detail creation
```
### Get All Course Details
- Method: GET
- Path: `/api/course/detail`
- Description: Retrieves all course details.
- Required Role: Login
**Response:**
Success (200 OK):
```
Body: Array of course detail objects
```
Internal Server Error (500 Internal Server Error):
```
Body: Error message if an error occurs during course detail retrieval
```
### Get a Single Course Detail
- Method: GET
- Path: `/api/course/detail/:id/:year/:sem`
- Description: Retrieves a single course detail by ID, semester, and year.
- Required Role: Login
**Request Parameters:**
id: Course ID (string)
year: Year (string)
sem: Semester (string)
**Response:**
Success (200 OK):
```
Body: Course detail object
```
Course Detail Not Found (404 Not Found):
```
Body: Error message if the course detail with the provided ID, semester, and year is not found
```
Internal Server Error (500 Internal Server Error):
```
Body: Error message if an error occurs during course detail retrieval
```
### Update a Course Detail
- Method: PUT
- Path: `/api/course/detail/:id/:year/:sem`
- Description: Updates a course detail by ID, semester, and year.
- Required Role: Not Student
**Request Parameters:**
id: Course ID (string)
year: Year (string)
sem: Semester (string)
**Request Body:**
teacher: Teacher (string, required)
**Response:**
Success (200 OK):
```
Body: Updated course detail object
```
Course Detail Not Found (404 Not Found):
```
Body: Error message if the course detail with the provided ID, semester, and year is not found
```
Bad Request (400 Bad Request):
```
Body: Error message if the year, semester, or teacher is empty
```
Internal Server Error (500 Internal Server Error):
```
Body: Error message if an error occurs during course detail update
```
## Course Student Records

### Create a Course Student
- Method: POST
- Path: `/api/course/student/`
- Description: Creates a new course student.
- Required Role: Admin
**Request Body:**
courseId: Course ID (string, required)
year: Year (string, required)
sem: Semester (string, required)
students: Array of student IDs (array, required)
**Response:**
Success (200 OK):
```
Body: Array of course student objects
```
Bad Request (400 Bad Request):
```
Body: Error message if the students or course does not exist
```
Internal Server Error (500 Internal Server Error):
```
Body: Error message if an error occurs during course student creation
```
### Get All Course Students
- Method: GET
- Path: `/api/course/student`
- Description: Retrieves all course students.
- Required Role: Not Student
**Response:**
Success (200 OK):
```
Body: Array of course student objects
```
Internal Server Error (500 Internal Server Error):
```
Body: Error message if an error occurs during course student retrieval
```
### Get a Single Course Student
- Method: GET
- Path: `/api/course/student/:studentId/:courseId/:year/:sem`
- Description: Retrieves a single course student by student ID, course ID, semester, and year.
- Required Role: Not Student
**Request Parameters:**
studentId: Student ID (string)
courseId: Course ID (string)
year: Year (string)
sem: Semester (string)
**Response:**
Success (200 OK):
```
Body: Course student object
```
Course Student Not Found (404 Not Found):
```
Body: Error message if the course student with the provided student ID, course ID, semester, and year is not found
```
Internal Server Error (500 Internal Server Error):
```
Body: Error message if an error occurs during course student retrieval
```
### Update a Course Student
- Method: PUT
- Path: `/api/course/student/:studentId/:courseId/:year/:sem`
- Description: Updates a course student by student ID, course ID, semester, and year.
- Required Role: Not Student
**Request Parameters:**
studentId: Student ID (string)
courseId: Course ID (string)
year: Year (string)
sem: Semester (string)
**Request Body:**
finalGrade: Final grade (string, required)
**Response:**
Success (200 OK):
```
Body: Updated course student object
```
Course Student Not Found (404 Not Found):
```
Body: Error message if the course student with the provided student ID, course ID, semester, and year is not found
```
Bad Request (400 Bad Request):
```
Body: Error message if the final grade is not one of the correct grades
```
Internal Server Error (500 Internal Server Error):
```
Body: Error message if an error occurs during course student update
```
### Delete a Course Student
- Method: DELETE
- Path: `/api/course/student/:studentId/:courseId/:year/:sem`
- Description: Deletes a course student by student ID, course ID, semester, and year.
- Required Role: Admin
**Request Parameters:**
studentId: Student ID (string)
courseId: Course ID (string)
year: Year (string)
sem: Semester (string)
**Response:**
Success (200 OK):
```
Body: Success message
```
Course Student Not Found (404 Not Found):
```
Body: Error message if the course student with the provided student ID, course ID, semester, and year is not found
```
Internal Server Error (500 Internal Server Error):
```
Body: Error message if an error occurs during course student deletion
```

## Program
### Create a Program:
- Method: POST
- Path: `/api/program`
- Required Role: Admin
- Description: Creates a new program with the provided details.
**Request Body:**
id: Program ID (string, required)
name: Program name (string, required)
dept: Department ID (string)
intro: Program introduction (string)
**Response:**
Success (201 Created): Returns the created program object.
```
Body: Program object
```
Bad Request (400 Bad Request):
```
Body: Error message if the ID or name is missing, or if the program ID already exists.
```
Internal Server Error (500 Internal Server Error):
```
Body: Error message if an error occurs during program creation.
```
### Get All Programs:
- Method: GET
- Path: `/api/program`
- Required Role: Login
- Description: Retrieves all programs.
**Response:**
Success (200 OK):
```
Body: Array of program objects
```
Internal Server Error (500 Internal Server Error):
```
Body: Error message if an error occurs during program retrieval.
```

### Get a Single Program:
- Method: GET
- Path: `/api/program/:id`
- Required Role: Login
- Description: Retrieves a program by its ID.
**Request Parameters:**
id: Program ID (string)
**Response:**
Success (200 OK):
```
Body: Returns the program object.
```
Program Not Found (404 Not Found): 
```
Body: Error message if the program with the provided ID is not found.
```
Internal Server Error (500 Internal Server Error):
```
Body: Error message if an error occurs during program retrieval.
```
### Update a Program:
- Method: PATCH
- Path: `/api/program/:id`
- Required Role: Not Student
- Description: Updates a program by its ID.
**Request Parameters:**
id: Program ID (string)
**Request Body: Contains the fields to be updated.**
name: Program name (string)
dept: Department ID (string)
intro: Program introduction (string)
credit: Program credit (number)
leaders: Program leaders (array)
course: Program courses (array)
status: Program status (string)
**Response:**
Success (200 OK): 
```
Body: Returns the updated program object.
```
Program Not Found (404 Not Found): 
```
Body: Error message if the program with the provided ID is not found.
```
Bad Request (400 Bad Request)
```
Body: Error message if the department ID is incorrect.
```
Internal Server Error (500 Internal Server Error):
```
Body: Error message if an error occurs during program update.
```