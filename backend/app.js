var express 			= require("express"),
    app     			= express(),
    mongoose			= require('mongoose'),
    passport			= require('passport'),
    LocalStrategy		= require('passport-local'),
    bodyParser			= require('body-parser'),
    methodOverride  	= require('method-override'),
    flash				= require('connect-flash'),
    multer				= require('multer'),
    aws                 = require('aws-sdk');

    if (process.env.NODE_ENV !== 'production') {
        require('dotenv').config();
        console.log('configured');
    }

    const {Client, Status} = require("@googlemaps/google-maps-services-js");

var indexRoutes			= require('./routes/index');

var User = require("./models/user");

//aws region
aws.config.region = 'us-east-2';

//Mongoose random things
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

let mongoUrl = process.env.HYVE_MONGO_DB;

mongoose.connect(mongoUrl);

//passport configuration
app.use(require("express-session")({
	secret: "I want a cat",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});


app.set("view engine", "ejs");
const path = require("path");
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static(__dirname + '/public')); //for js scripts
app.use(methodOverride("_method"));

app.use(indexRoutes);


// app.get('/googleapi/:term', function(req, res){
//     var options = {
//       types: ['(cities)'],
//       componentRestrictions: {country: "us"}
//      };
//      var autocomplete = new google.maps.places.Autocomplete('aust', options);
//      console.log(autocomplete);
//      res.send('autocomplete');
// })

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3001;
}
app.listen(port);