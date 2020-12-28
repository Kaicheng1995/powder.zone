# Powder🏂🏅☃️

```diff
! ATTENTION：If it's too slow to load the page, please just watch the Youtube video!
```


* *YouTube Video* https://www.youtube.com/watch?v=wZtKdY0-JHI&t=15s
* *Check it out:* *[powder.zone](http://www.powder.zone)* or *[herokuapp](https://limitless-beach-89648.herokuapp.com/)*
* *Develop setup:* `@node 12.16.1` `@npm 6.14.3`  
* *Database* `MongoDB`  
* *JS library* `React.js` `Node.js`...  
* *Deployment* `Heroku`  

<div align=center>
  <img src="https://github.com/Kaicheng1995/powder.zone/blob/master/img/captured (1).gif" width="700"> 
</div>

## Content
* Background
* Development setup
* Usage example
* Code log


## Background
**"No friends on powder days!"** ⛄️☀️⛄️  

The saying above means that the snow, especially for **powder** snow, is good to take care of all the needs as a snowboarder, or skier, so there would be no time for dealing with friendship stuff.  
  
As a snowboarding lover, I wrote this web app, and hope to establish a snowboards shopping website in China. Since China is going to host the 2022 Winter Olympic Games, and there isn't any direct sales channel for snowboards in China, I think it should be a good opportunity to start a business with the blooming market.

<div align=center>
  <img src="https://github.com/Kaicheng1995/powder.zone/blob/master/img/friends-powder-days_h_0.jpg" width="500"> 
</div>


## Development setup

on /client
```
npm install @fortawesome/fontawesome@1.1.8 @fortawesome/fontawesome-free-solid@5.0.13 @fortawesome/react-fontawesome@0.0.20 @material-ui/core@1.2.2 axios@0.18.0 react-images@0.5.17 react-redux@5.0.7 react-router-dom@4.3.1 react-slick@0.23.1 redux@4.0.0 redux-promise@0.6.0 redux-thunk@2.3.0 react-dropzone@4.2.12 react-moment@0.7.7 react-paypal-express-checkout@1.0.4 --save
```
on /server
```
npm install bcrypt@3.0.6 body-parser@1.18.3 cloudinary@1.11.0 concurrently@3.6.0 cookie-parser@1.4.3 dotenv@6.0.0 express@4.16.3 express-formidable@1.0.0 jsonwebtoken@8.3.0 moment@2.22.2 mongoose@5.1.6 multer@1.3.0 --save
```

on /powder
```
npm run dev
```


## Usage example

Create a new account, or login with below:
```diff
+ USER ACCOUNT:
  Email: kaicheng_jia@126.com
  Password: 123456
 
- ADMIN ACCOUNT:
  Email: ares.jia@hotmail.com
  Password: 123456
```
<div align=center>
<img src="https://github.com/Kaicheng1995/powder.zone/blob/master/img/login1.png" width="600"></div>  
  

  
Dashboard: you can modify some info here  
**(PLS DONT MODIFY IF YOU LOGIN AS ADMIN!!)**
```diff
DASHBOARD
+ Edit profile
+ Check Cart
+ Check transaction history
 
- Add product: as an admin, we can just add product data here instead of on back-end
- Manage Categories: as an admin, we can just manage category data here instead of on back-end
```
<div align=center>
<img src="https://github.com/Kaicheng1995/powder.zone/blob/master/img/dashboard.png" width="600"> 
</div>

Check Product: go to homepage, select one product and click "SHOP NOW", "VIEW PRODUCT"
```diff
! HOME PAGE
  Main slide
  Best selling products
  Promotion area
  New arrival products

! PRODUCT PAGE
  Product detail
```
<div align=center>
<img src="https://github.com/Kaicheng1995/powder.zone/blob/master/img/home.png" width="600"> 
  <img src="https://github.com/Kaicheng1995/powder.zone/blob/master/img/productpage.png" width="600"> 
</div>

Search product, Add to Cart:
```diff
! SHOP PAGE
  Filter box: you can select the products using filter
  Product layout: you can change the layout

! CART PAGE
  you can check the items you've added to the cart
```
<div align=center>
<img src="https://github.com/Kaicheng1995/powder.zone/blob/master/img/shop2.png" width="600"> 
  <img src="https://github.com/Kaicheng1995/powder.zone/blob/master/img/cart.png" width="600"> 
</div>



Payment: you can finish buying products with the test paypal account below
```diff
+ TEST PAYPAL ACCOUNT: 
   Account: sb-5yiaa1243914@personal.example.com
   Password: testing123
```
<div align=center>
<img src="https://github.com/Kaicheng1995/powder.zone/blob/master/img/pay1.png" width="800"><img src="https://github.com/Kaicheng1995/powder.zone/blob/master/img/pay2.png" width="600"> 
</div>



## Code log

* OS X
```
MongoDB: create a folder named mongo-data and execute ./mongod --dbpath ~/mongo-data 
Robo 3T: create a connection with default address localhost:27017
Postman: create a collection named the project
```

### Server
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

### Client
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

### Deploy
**`Heroku`**
