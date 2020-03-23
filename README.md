# Powder🏂🏅
* *Check it out:* **[powder.zone](https://limitless-beach-89648.herokuapp.com/")**
* *Coding log:* **`codelog.md`**
* *Develop setup:* `@node 12.16.1` `@npm 6.14.3`
* *Database* `MongoDB`
* *JS library* `React.js` `Node.js`...
* *Deployment* `Heroku`

<div align=center>
  <img src="https://github.com/Kaicheng1995/powder.zone/blob/master/img/captured (1).gif" width="700"> 
</div>


## Background
**"No friends on powder days!"** When the snow, especially for **powder** snow, is good to take care of all the needs as a snowboarder, or skier, there would be no time for dealing with friendship stuff.  
  
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
