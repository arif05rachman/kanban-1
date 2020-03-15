# kanban
## .env
BASE_URL = 'http://localhost:3000'
DEPLOY FIREBASE
https://kanban-268212.firebaseapp.com/

JWT_SECRET=<SECRET>
CLIENT_ID=<YOURE ID CLIENT OAUTH GOOGLE>
## User Register
----
  Returns json data.

* **URL**

  /register

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
  None

* **Data Params**

    `name=[string]`

   `username=[string]`

   `email=[string]`

   `password=[string]`

* **Success Response:**

  * **Code:** 200 OK<br />
    **Content:** `{
  "id": 3,
  "name": "Arif Rachman husen",
  "username": "arif",
  "email": "arif1@gmail.com",
  "password": "$2b$10$8l13KvSs1Sq19Vzk60HQOu74qG4PDjSTMTvtmhBX4Ntd7j5.zN3KC",
  "updatedAt": "2020-02-14T15:37:46.848Z",
  "createdAt": "2020-02-14T15:37:46.848Z"
}`
 
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:** `{
  "message": [
    "User.password cannot be null",
    "Validation notEmpty on email failed",
    "Validation notEmpty on name failed",
    "Validation notEmpty on username failed"
  ]
}`

  OR

  * **Code:** 409 Conflict <br />
    **Content:** `{ "message": "Email already register"
}`

  OR

  * **Code:** 500  Server Error<br />
    **Content:** `{ "message": "Internal Server Error"
}`

* **Sample Call:**

  ```javascript
  axios
  .post(`${process.env.BASE_URL}/register`,{
      name:name ,username:username ,email:email ,password:password
  })
  ```
## User Login
----
  Returns json data.

* **URL**

  /login

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
  None

* **Data Params**

   `email=[string]`

   `password=[string]`

* **Success Response:**

  * **Code:** 200 OK<br />
    **Content:** `{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhcmlmIiwiaWF0IjoxNTgxNjY0NTgzfQ.mRMIr1EyfdKXrj86mPrQogjY5XQiL6VvWR-xi8UEYdw"
}`
 
* **Error Response:**

  * **Code:** 401 Unauthorize <br />
    **Content:** `{
  "message": "Email or Password wrong"
}`

  OR

  * **Code:** 404 Not Found <br />
    **Content:** `{
  "message": "User Not Found"
}`

  OR

  * **Code:** 500  Internal Server Error<br />
    **Content:** `{ "message": "Internal server Error"
}`

* **Sample Call:**

  ```javascript
  axios
  .post(`${process.env.BASE_URL}/login`,{
      email:email ,password:password
  })
  ```

## Get Categories
----
  Returns json data.

* **URL**

  /categories

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhcmlmIiwiaWF0IjoxNTgxNjY0NTgzfQ.mRMIr1EyfdKXrj86mPrQogjY5XQiL6VvWR-xi8UEYdw'

* **Data Params**
    
      None

* **Success Response:**

  * **Code:** 200 OK<br />
    **Content:** `[
  {
    "id": 1,
    "name": "backlog",
    "createdAt": "2020-02-12T08:48:44.998Z",
    "updatedAt": "2020-02-12T08:48:44.998Z",
    "Tasks": [
      {
        "id": 84,
        "title": "initial",
        "CategoryId": 1,
        "UserId": 1,
        "createdAt": "2020-02-12T19:19:06.402Z",
        "updatedAt": "2020-02-12T19:19:06.402Z"
      }
    ]
  },
]`
 
* **Error Response:**


  * **Code:** 404 Not Found <br />
    **Content:** `{
  "message": "Data Not Found"
}`

  OR

  * **Code:** 500  Internal Server Error<br />
    **Content:** `{ "message": "Iternal Server Error"
}`

* **Sample Call:**

  ```javascript
  axios
  .get(`${process.env.BASE_URL}/categories`)
  ```

## Get Tasks
----
  Returns json data.

* **URL**

  /tasks

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhcmlmIiwiaWF0IjoxNTgxNjY0NTgzfQ.mRMIr1EyfdKXrj86mPrQogjY5XQiL6VvWR-xi8UEYdw'

* **Data Params**
    
      None

* **Success Response:**

  * **Code:** 200 OK<br />
    **Content:** ` [
      {
        "id": 84,
        "title": "initial",
        "CategoryId": 1,
        "UserId": 1,
        "createdAt": "2020-02-12T19:19:06.402Z",
        "updatedAt": "2020-02-12T19:19:06.402Z"
      }
]`
 
* **Error Response:**


  * **Code:** 404 Not Found <br />
    **Content:** `{
  "message": "Data Not Found"
}`

  OR

  * **Code:** 500  Internal Server Error<br />
    **Content:** `{ "message": "Internal Server Error"
}`

* **Sample Call:**

  ```javascript
  axios
  .get(`${process.env.BASE_URL}/tasks`)
  ```

## Get Task
----
  Returns json data.

* **URL**

  /tasks

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhcmlmIiwiaWF0IjoxNTgxNjY0NTgzfQ.mRMIr1EyfdKXrj86mPrQogjY5XQiL6VvWR-xi8UEYdw'
      
      And

        `id=[integer]`

* **Data Params**
    
      None

* **Success Response:**

  * **Code:** 200 OK<br />
    **Content:** ` 
      {
        "id": 84,
        "title": "initial",
        "CategoryId": 1,
        "UserId": 1,
        "createdAt": "2020-02-12T19:19:06.402Z",
        "updatedAt": "2020-02-12T19:19:06.402Z"
      }`
 
* **Error Response:**


  * **Code:** 404 Not Found <br />
    **Content:** `{
  "message": "Data Not Found"
}`

  OR

  * **Code:** 500  Internal Server Error<br />
    **Content:** `{ "message": "Internal Server Error"
}`

* **Sample Call:**

  ```javascript
  axios
  .get(`${process.env.BASE_URL}/tasks/id`)
  ```


## Create Task
----
  Returns json data.

* **URL**

  /tasks

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhcmlmIiwiaWF0IjoxNTgxNjY0NTgzfQ.mRMIr1EyfdKXrj86mPrQogjY5XQiL6VvWR-xi8UEYdw'
      
      And
      `id=[integer]`

* **Data Params**
    
      `title=[string]`
      `CategoryId=[integer]`
      `UserId=[integer]`

* **Success Response:**

  * **Code:** 200 OK<br />
    **Content:** ` 
      {
        "id": 84,
        "title": "initial",
        "CategoryId": 1,
        "UserId": 1,
        "createdAt": "2020-02-12T19:19:06.402Z",
        "updatedAt": "2020-02-12T19:19:06.402Z"
      }`
 
* **Error Response:**

 * **Code:** 400 Bad Request <br />
    **Content:** `{
  "message": [
    "Validation notEmpty on title failed",
    "Validation notEmpty on CategoryId failed"
  ]
}`

  OR

  * **Code:** 500  Internal Server Error<br />
    **Content:** `{ "message": "Internal Server Error"
}`

* **Sample Call:**

  ```javascript
  axios
  .post(`${process.env.BASE_URL}/tasks`)
  ```

## Update Task
----
  Returns json data.

* **URL**

  /tasks/id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhcmlmIiwiaWF0IjoxNTgxNjY0NTgzfQ.mRMIr1EyfdKXrj86mPrQogjY5XQiL6VvWR-xi8UEYdw'
      
      And

        `id=[integer]`

* **Data Params**
    
      None

* **Success Response:**

  * **Code:** 200 OK<br />
    **Content:** ` 
      {
        "id": 84,
        "title": "initial",
        "CategoryId": 1,
        "UserId": 1,
        "createdAt": "2020-02-12T19:19:06.402Z",
        "updatedAt": "2020-02-12T19:19:06.402Z"
      }`
 
* **Error Response:**


  * **Code:** 404 Not Found <br />
    **Content:** `{
  "message": "Data Not Found"
}`

  OR


  * **Code:** 401 Unauthorize <br />
    **Content:** `{
  "message": "Not aceppted"
}`

  OR

  * **Code:** 500  Internal Server Error<br />
    **Content:** `{ "message": "Internal Server Error"
}`

* **Sample Call:**

  ```javascript
  axios
  .put(`${process.env.BASE_URL}/tasks/id`)
  ```


  ## Update Task
----
  Returns json data.

* **URL**

  /tasks/id

* **Method:**

  `Delete`
  
*  **URL Params**

   **Required:**
 
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhcmlmIiwiaWF0IjoxNTgxNjY0NTgzfQ.mRMIr1EyfdKXrj86mPrQogjY5XQiL6VvWR-xi8UEYdw'
      
      And

        `id=[integer]`

* **Data Params**
    
      None

* **Success Response:**

  * **Code:** 200 OK<br />
    **Content:** ` 
      {
        "id": 84,
        "title": "initial",
        "CategoryId": 1,
        "UserId": 1,
        "createdAt": "2020-02-12T19:19:06.402Z",
        "updatedAt": "2020-02-12T19:19:06.402Z"
      }`
 
* **Error Response:**


  * **Code:** 404 Not Found <br />
    **Content:** `{
  "message": "Data Not Found"
}`

  OR


  * **Code:** 401 Unauthorize <br />
    **Content:** `{
  "message": "Not aceppted"
}`

  OR

  * **Code:** 500  Internal Server Error<br />
    **Content:** `{ "message": "Internal Server Error"
}`

* **Sample Call:**

  ```javascript
  axios
  .delete(`${process.env.BASE_URL}/tasks/id`)
  ```
