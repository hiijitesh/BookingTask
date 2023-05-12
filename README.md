
### How to run the code?

First fill neccessary variable names in .env files according to your system such as
db user, db password, db name(db should be first created in MySQL before running the code)

now open new terminal in the project folder and run command:
npm install

now run command:
node app.js

now sequelize connection with DB will get established and express web server will also start on port 3000

now open postman and start sending request.

->
/signup POST Request
send name,phone,password,email(optional) as JSON data with body

->
/login POST Request
send phone,password as JSON data with body

->
/access-token POST request
send refreshToken as JSON data with body

->
/logout POST request
send refreshToken as JSON data with body

->
/add-email
send email as JSON data with body as well as accessToken as bearer in POSTMAN
