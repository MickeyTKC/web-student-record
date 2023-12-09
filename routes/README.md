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

## Course

**-Information-**
### Create a Course
- Method: POST
- Path: /api/course/
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
- Path: /api/crourse
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
- Path: /api/course/:id
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
- Path: /api/course/:id
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

**-Details-**
### Create a Course Detail
- Method: POST
- Path: /api/course/detail
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
- Path: /api/course/detail
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
- Path: /api/course/detail/:id/:year/:sem
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
- Path: /api/course/detail/:id/:year/:sem
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

**Student Records**

## Program