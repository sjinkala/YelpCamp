var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds")
    
//requiring routes
                     // = require("./routes/tobedetermined"),
                     // = require("./routes/tobedetermined"),
                     // = require("./routes/tobedetermined")
 
// var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_v10";
// mongoose.connect(url);

console.log("Hello World");
 app.use(bodyParser.urlencoded({extended: true}));
 app.set("view engine", "ejs");
 app.use(express.static(__dirname + "/public"));
 app.use(methodOverride("_method"));
 app.use(flash());
 // seedDB(); //seed the database

 // PASSPORT CONFIGURATION
 app.use(require("express-session")({
     secret: "Mira is really cute",
     resave: false,
     saveUninitialized: false
 }));
 app.use(passport.initialize());
 app.use(passport.session());
 passport.use(new LocalStrategy(User.authenticate()));
 passport.serializeUser(User.serializeUser());
 passport.deserializeUser(User.deserializeUser());

 app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
 });

 app.use("/", tbd);
 app.use("/tbd", tbd);
 app.use("/tbd/:id/tbd", tbd);


app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
})
