/// підключаємо експрес і створюємо app 
var express=require('express');
var app=express();
/// підключаємо експрес і створюємо app 

//Встановлення папку--шляху для статичного контенту--каталогу
app.use(express.static(__dirname));


/// підключаємо боді-парсер і підєднюємо до експресу
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/// підключаємо кукі парсер і створюємо app  
var cookieParser=require('cookie-parser')();

app.use(cookieParser);

/// підключаємо кукі сешион і створюємо app  
var session=require('cookie-session')({
	keys:['secret'],
	maxAge: 2*60 *60 *1000
});
app.use(session);

/// підключаємо passport і створюємо app 
var passport=require('passport');
app.use(passport.initialize());
app.use(passport.session());

/// підключаємо passport  стратегією для фейсбук
var FacebookStrategy=require('passport-facebook').Strategy; 


//// підключаємо локальну стратегію для аунтифікації для адміна
var LocalStrategy=require('passport-local').Strategy;

//// підключаємо ще одну локальну стратегію для аунтифікації для юзерів
var LocalStrategy1=require('passport-local').Strategy;

////створюємо екземпляр паспорт локал приєднюємо до паспорт і реалізуємо логіку автентифікації
passport.use(new LocalStrategy(
	function(username,password,done){
		Admin.find({username:username,password:password},function(err,data){
			console.log(data);
			if(data.length==1)
				return done(null,{id:data[0]._id,username:data[0].username});
			return done(null,false);

		})
	}
	))

/*passport.use(new LocalStrategy1(
	function(username,password,done){
		User.find({username:username,password:token},function(err,data){
			console.log(data);
			if(data.length==1)
				return done(null,{id:data[0]._id,username:data[0].username});
			return done(null,false);

		})
	}
	))*/

////створюємо екземпляр паспорт для фейсбук стратегії реалізуємо логіку автентифікації
var authFacebook = {
	clientID:'138096943475531',
	clientSecret : '23beec581a39f3c6f6d4395d17f28ea6',
	calbackURL : 'http://localhost:8080/auth/facebook/callback'
}
passport.use(new FacebookStrategy({
    clientID: authFacebook.clientID,
    clientSecret: authFacebook.clientSecret,
    callbackURL: authFacebook.calbackURL,
    profileFields : ['id','displayName','photos','email']
  },
  function(token, refreshToken, profile, done) {
  	console.log(profile);
    User.find({id:profile.id}, function(err, data) {
      if (data.length==1) { 
      	return done(null,{id:data[0]._id}); 
      }
      else{
      	var newUser = new User({
      		id:profile.id,
      		username:profile.displayName,
      		token:token,
      		photos:profile.photos[0].value||"",
      		email:profile.emails[0].value||""
      	})
      	console.log("newUser:");
      	console.log(newUser);
      	newUser.save(function(err,user){
      		return done(null,{id:user[0]._id}); 
      	})
      }
    });

  }
));

///////підключаємо модель юзерів
var User = require('./models/model_users.js')
/// підєднання моделі адміна
var Admin = require('./models/model_admin.js');

///// записуємо дані обєкти який повертає локал стратегія після автинтифікації сесії
/////доступний через req.session
passport.serializeUser(function(user,done){
	console.log("serialise user:");
	console.log(user);
	done(null,user);
}) 

/////при всіх наступних зверненнях авторизованого користувача до сервера відбувається десеріалізація
//// використання данних сесії з пошуком в базі данних
/////доступний через req.user
passport.deserializeUser(function(obj,done){
	console.log("deserialize user:");
	console.log(obj);
	Admin.find({_id:obj.id},function(err,data){
		//console.log(data);
		if(data.length==1){
			//console.log("data:");
			/*for(var key in data[0]){
				console.log(key);
			}*/
			console.log(data[0]);
			done(null,{username:data[0].username})
		}

	})
	User.find({_id:obj.id},function(err,data){
		if(data.length==1){
			//console.log("data:");
			for(var key in data[0]){
				console.log(key);
			}
			console.log(data[0]);
			done(null,data[0]);
		}
	})
})

//////запуск автинтифікації на основі локал стратегії з відповідним редіректом
var auth = passport.authenticate('local',{
	successRedirect:'/admin',
	failureRedirect:'/login'
})

//////запуск автинтифікації на основі локал стратегії 1 з новим редіректом
var authNew = passport.authenticate('local',{
	successRedirect:'/',
	failureRedirect:'/'
})


/////// middleware ---> перевіряє чи користувач авторизований
var myAuth=function(req,res,next){
	if(req.isAuthenticated()){
		next();
	}
	else{
		res.redirect('/login');
	}
}

/////автентифікація по фейсбуку
app.get('/auth/facebook',passport.authenticate('facebook',{scope:'email'}));

/////редірект по фейсбуку
app.get('/auth/facebook/callback',passport.authenticate('facebook',{
	successRedirect:'/',
	failureRedirect:'/'
}))

///////робить редірект або по шляху або на auth
app.post('/login',auth);
app.get('/login',function(req,res){
	res.sendFile(__dirname+'/viewsadmin/login.html');
})

////
app.get('/admin',myAuth);
app.get('/admin',function(req,res){
	res.sendFile(__dirname+'/viewsadmin/admin.html');
})

////робить редірект або по шляху або на authNew
app.get('/loginnew',authNew);

///// обробник на контролер logincontrol
app.get('/logincontrol',function(req,res){
	res.send(req.user);
})


/////логаут
app.get('/logout', function(req, res) {
    req.logout();
    console.log('testing123');
    res.redirect('/');
})

////привязка модуля маршрутизації
var router = require('./router.js');
app.use('/',router);

////порт для прослуховування сервера
app.listen(process.env.PORT || 80);
console.log('Server is running...')