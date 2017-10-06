var mongoose=require('../mongoose.js');
var schemaCategory = mongoose.Schema({
	categoryname : { 
		type : String,
		require:true,
		unique:true
	}
});

var Category = mongoose.model('Category',schemaCategory);
module.exports=Category;