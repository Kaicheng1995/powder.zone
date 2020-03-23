## Installation

* OS X
```
MongoDB: create a folder named mongo-data and execute ./mongod --dbpath ~/mongo-data 
Robo 3T: create a connection with default address localhost:27017
Postman: create a collection named the project
```

## Server
***Initial Setup***
* denpendency
```diff
+ Server Dependencies
npm install bcrypt@2.0.1 body-parser@1.18.3 cloudinary@1.11.0 concurrently@3.6.0 cookie-parser@1.4.3 dotenv@6.0.0 express@4.16.3 express-formidable@1.0.0 jsonwebtoken@8.3.0 moment@2.22.2 mongoose@5.1.6 multer@1.3.0 --save

+ Client Dependencies
npm install @fortawesome/fontawesome@1.1.8 @fortawesome/fontawesome-free-solid@5.0.13 @fortawesome/react-fontawesome@0.0.20 @material-ui/core@1.2.2 axios@0.18.0 react-images@0.5.17 react-redux@5.0.7 react-router-dom@4.3.1 react-slick@0.23.1 redux@4.0.0 redux-promise@0.6.0 redux-thunk@2.3.0 react-dropzone@4.2.12 react-moment@0.7.7 react-paypal-express-checkout@1.0.4 --save
```
* revised json on server
```json
    "start": "node server/server.js",
    "server": "nodemon server/server.js",
    "client": "npm run start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\""
```
* revised json on client
```json
  "proxy": {
    "/api/": {
      "target": "http://localhost:3002"
    }
  }
```
* .env and middleware
```
.gitignore : hide doc
.env : connect to database
server.js : create server
```

***User***
```diff
! Register Route
1/ User Model/: require mongoose to create userSchema
2/ Register User/: create new user info and save it
3/ Hash Password/: require bcrypt to hash password before saving it (not repeatedly)

! Login Route
1/ Fine the email - Compare password - Gernerate token
2/ Use bcrypt to compare password
3/ Use jsonwebtoken to generate token

! Auth Route
1/ Auth Middleware: create a middleware to check token before request
2/ FindByToken: use bcrypt to help write FindByToken function
3/ Auth Route: create auth route if middleware succeeds and get some responses

! Logout Route
1/ Find token and delete it
```

***Product***
```diff
! Brand Route
1/ Brand Model/: create a new model
2/ Admin Middleware/: create a middleware to check user's role
3/ POST Brand Route/: save request if it's auth and admin
4/ GET Brands Route/: get all brands
5/ Insert brands in Robo 3T

! Color Route
1/ Color Model/
2/ POST Color Route/
3/ GET Colors Route/

! ProductPage Route
1/ ProductPage Model/
2/ POST ProductPage Route/
3/ GET ProductPage Route/ - use query String, get by id
4/ GET ProductPage Route/ - use query String, get by order(sold and arrival)
```

## Client
***Header and Footer component***
```
1/ create header and footer
2/ import in layout
3/ import in routes
```
***Redux setup***
```
-
```
***Register login component***
```
! Register login page
1/ create register and login -index page
2/ create utils button for general use later

! Create login
1/ create state and form
2/ ......

! Create register
```
***Dashboard***
***Homepage***
```
1/ Cards
2/ Slide
```

***Shoppage***
```
1/ Checkbox
2/ Radio option
3/ Shop grid
```

***Admin***
```
1/ Add product
2/ File upload
3/ Manage category
```

***Product detail***
```
1/ product info, image..
2/ Add cart
```

***Cart***
```
1/ Add product
2/ Card block
3/ Calculate total
4/ Remove item
5/ Paypal button
6/ Buy success
7/ History
```

## Deploy
**`Heroku`**
