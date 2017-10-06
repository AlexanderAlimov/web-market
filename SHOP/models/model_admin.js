var mongoose=require('../mongoose.js');
var schemaAdmin = mongoose.Schema({
	username : { 
		type : String,
		require:true,
		unique:true
	},
	password : {
		type : String,
		require:true
	}
});

var Admin = mongoose.model('Admin',schemaAdmin);
module.exports=Admin;