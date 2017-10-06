var mongoose=require('../mongoose.js');
var schemaUser = mongoose.Schema({
	email : {
		type : String,
		require:true,
		unique:true
	},
	username : { 
		type : String,
		require:true
	},
	token : {
		type : String,
		require:true
	},
	photos : {
		type : String,
		require:true
	},
	id : {
		type : Number,
		require:true,
		unique:true
	}

});

var User = mongoose.model('User',schemaUser);
module.exports=User;