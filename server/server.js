const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const formidable = require('express-formidable');
const cloudinary = require('cloudinary');

const app = express();
const mongoose = require('mongoose');
const async = require('async');
require('dotenv').config();


mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE)


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})


// Models
const { User } = require('./models/user');
const { Brand } = require('./models/brand');
const { Color } = require('./models/color');
const { ProductPage } = require('./models/productpage');
const { Payment } = require('./models/payment');

// Middlewares
const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');




//=================================
//            PRODUCT
//=================================


app.post('/api/product/shop',(req,res)=>{

    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
            if(key === 'price'){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }else{
                findArgs[key] = req.body.filters[key]
            }
        }
    }

    findArgs['publish'] = true;

    ProductPage.
    find(findArgs).
    populate('brand').
    populate('color').
    sort([[sortBy,order]]).
    skip(skip).
    limit(limit).
    exec((err,productpage)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: productpage.length,
            productpage
        })
    })
})













// BY ARRIVAL
// /productpage? sortBy=createdAt & order=desc & limit=4

// BY SOLD
// /productpage? sortBy=sold & order=desc & limit=4

app.get('/api/product/productpage', (req, res) => {

	//这些是默认设置，如果queryString里没有的话...
	let order = req.query.order ? req.query.order : 'asc';
	let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
	let limit = req.query.limit ? parseInt(req.query.limit) : 100;
	
	// 从model里找产品，productpage是自由命名的不重要
	ProductPage.
	find().
	populate('brand').
	populate('color').
	sort([[sortBy, order]]).
	limit(limit).
	exec((err, productpage) => {
		if(err) return res.status(400).send(err);
		res.send(productpage)
	})
})









/***** Productpage Route *****/

app.post('/api/product/productpage', auth, admin, (req, res) => {
	const productpage = new ProductPage(req.body);

	productpage.save((err, doc) => {
		if(err) return res.json({success: false, err});
		res.status(200).json({
			success: true,
			productpage: doc
		})
	})
})


// /productpage_by_id? id=5b2d3648ca6a03cd33af924c,5b2d38027d75e2cdcb31cf04 & type=array

app.get('/api/product/productpage_by_id', (req, res) => {
	// use query String
	let type = req.query.type;
	let items = req.query.id;

	// check if query String is an array
	if(type === 'array') {
		let ids = req.query.id.split(',');
		items = [];
		items = ids.map(item => {
			return mongoose.Types.ObjectId(item)
		})
	}

	// find out and execute the url
	ProductPage.
	find({ '_id': {$in: items}}).
	populate('brand').   //因为model里brand和color是有ref的
	populate('color').
	exec((err, docs) => {
		return res.status(200).send(docs)
	})

})











/***** Color Route *****/

app.post('/api/product/color', auth, admin, (req, res) => {
	const color = new Color(req.body);

	color.save((err, doc) => {
		if(err) return res.json({success: false, err});
		res.status(200).json({
			success: true,
			color: doc
		})
	})
})


app.get('/api/product/colors', (req, res)=> {
	Color.find({}, (err, colors)=> {
		if(err) return res.status(400).send(err);
		res.status(200).send(colors)
	})
})










/***** Brand Route *****/

app.post('/api/product/brand', auth, admin, (req,res) => {
	const brand = new Brand(req.body);

	brand.save((err, doc) => {
		if(err) return res.json({success: false, err});
		res.status(200).json({
			success: true,
			brand: doc
		})
	})
})


app.get('/api/product/brands', (req, res)=> {
	Brand.find({}, (err, brands)=> {
		if(err) return res.status(400).send(err);
		res.status(200).send(brands)
	})
})



















//=================================
//            USERS
//=================================


/***** Auth Route *****/

app.get('/api/users/auth', auth, (req, res) => {

	res.status(200).json({
		isAdmin: req.user.role === 0 ? false : true,
		isAuth: true,
		email: req.user.email,
		name: req.user.name,
		lastname: req.user.lastname,
		role: req.user.role,
		cart: req.user.cart,
		history: req.user.history

	})

})



/***** Register *****/

app.post('/api/users/register', (req, res) => {
	const user = new User(req.body);  				 /*use new data from user to create new model*/

	user.save((err, doc) => {
		if(err) return res.json({success: false, err});
		res.status(200).json({
			success: true,
			// userdata: doc
		})                                             /*save to doc and check if any errors, doc represent data itself*/

	})
})

/***** Login *****/

app.post('/api/users/login', (req, res) => {

	// find the email
	User.findOne({'email': req.body.email}, (err, user) => {     
		if(!user) return res.json({loginSuccess: false, message: 'Auth failed, email not found'});

		// check password
		user.comparePassword(req.body.password, (err,isMatch) => {
			if(!isMatch) return res.json({loginSuccess: false, message: 'Wrong password'});

			// generate a token
			user.generateToken((err, user) => {
				if(err) return res.status(400).send(err);
				res.cookie('j_auth', user.token).status(200).json({
					loginSuccess:true
				})
			})
		})

	})
})



/***** Logout *****/

app.get('/api/users/logout', auth, (req, res) => {

	User.findOneAndUpdate(
		{ _id: req.user._id },      //find this id
		{ token: '' },              //update token, remove token
		(err, doc) => {
			if(err) return res.json({success: false, err});
			return res.status(200).send({
				success: true
			})
		}
	)
})






app.post('/api/users/uploadimage',auth,admin,formidable(),(req,res)=>{
    cloudinary.uploader.upload(req.files.file.path,(result)=>{
        console.log(result);
        res.status(200).send({
            public_id: result.public_id,
            url: result.url
        })
    },{
        public_id: `${Date.now()}`,
        resource_type: 'auto'
    })
})





app.get('/api/users/removeimage',auth,admin,(req,res)=>{
    let image_id = req.query.public_id;

    cloudinary.uploader.destroy(image_id,(error,result)=>{
        if(error) return res.json({succes:false,error});
        res.status(200).send('ok');
    })
})




app.post('/api/users/addToCart',auth,(req,res)=>{

    User.findOne({_id: req.user._id},(err,doc)=>{
        let duplicate = false;

        doc.cart.forEach((item)=>{
            if(item.id == req.query.productId){
                  duplicate = true;  
            }
        })

        if(duplicate){
            User.findOneAndUpdate(
                {_id: req.user._id, "cart.id":mongoose.Types.ObjectId(req.query.productId)},
                { $inc: { "cart.$.quantity":1 } },
                { new:true },
                ()=>{
                    if(err) return res.json({success:false,err});
                    res.status(200).json(doc.cart)
                }
            )
        } else {
            User.findOneAndUpdate(
                {_id: req.user._id},
                { $push:{ cart:{
                    id: mongoose.Types.ObjectId(req.query.productId),
                    quantity:1,
                    date: Date.now()
                } }},
                { new: true },
                (err,doc)=>{
                    if(err) return res.json({success:false,err});
                    res.status(200).json(doc.cart)
                }
            )
        }
    })
})



app.get('/api/users/removeFromCart',auth,(req,res)=>{

    User.findOneAndUpdate(
        {_id: req.user._id },
        { "$pull":
            { "cart": {"id":mongoose.Types.ObjectId(req.query._id)} }
        },
        { new: true },
        (err,doc)=>{
            let cart = doc.cart;
            let array = cart.map(item=>{
                return mongoose.Types.ObjectId(item.id)
            });

            ProductPage.
            find({'_id':{ $in: array }}).
            populate('brand').
            populate('color').
            exec((err,cartDetail)=>{
                return res.status(200).json({
                    cartDetail,
                    cart
                })
            })
        }
    );
})




app.post('/api/users/successBuy',auth,(req,res)=>{
    let history = [];
    let transactionData = {}

    // user history
    req.body.cartDetail.forEach((item)=>{
        history.push({
            dateOfPurchase: Date.now(),
            name: item.name,
            brand: item.brand.name,
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            paymentId: req.body.paymentData.paymentID
        })
    })

    // PAYMENTS DASH
    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        lastname: req.user.lastname,
        email: req.user.email
    }
    transactionData.data = req.body.paymentData;
    transactionData.product = history;
        
    User.findOneAndUpdate(
        { _id: req.user._id },
        { $push:{ history:history }, $set:{ cart:[] } },
        { new: true },
        (err,user)=>{
            if(err) return res.json({success:false,err});

            const payment = new Payment(transactionData);
            payment.save((err,doc)=>{
                if(err) return res.json({success:false,err});
                let products = [];
                doc.product.forEach(item=>{
                    products.push({id:item.id,quantity:item.quantity})
                 })
              
                async.eachSeries(products,(item,callback)=>{ 
                    ProductPage.update(
                        {_id: item.id},
                        { $inc:{
                            "sold": item.quantity
                        }},
                        {new:false},
                        callback
                    )
                },(err)=>{
                    if(err) return res.json({success:false,err})
                    res.status(200).json({
                        success:true,
                        cart: user.cart,
                        cartDetail:[]
                    })
                })
            });
        }
    )
})




app.post('/api/users/update_profile',auth,(req,res)=>{

    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            "$set": req.body
        },
        { new: true },
        (err,doc)=>{
            if(err) return res.json({success:false,err});
            return res.status(200).send({
                success:true
            })
        }
    );
})












const port = process.env.PORT || 3002;

app.listen(port, () => {
	console.log(`Server Runing at ${port}`)
})








