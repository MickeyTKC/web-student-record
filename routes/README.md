# S350F-Project-Web-Student-Record Restful API

## Authentication 
### Login
- Method: POST
- Path: /login
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
- Path: /logout
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

**Information**

**Details**

**Student Records**

## Program