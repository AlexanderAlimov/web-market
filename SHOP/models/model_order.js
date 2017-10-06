var mongoose=require('../mongoose.js');
var schemaOrder = mongoose.Schema({
	cart:[{
	name:{
		type:String,
		require:true,
	},
	model:{
		type:String,
		require:true,
	},
	category:{
		type:String,
		require:true,
	},
	count:{
		type:Number,
		require:true
	},
	price:{
		type:Number,
		require:true
	},
	path:{
		type:String
	},
	newcount:{
		type:Number,
		require:true
	},
	newprice:{
		type:Number,
		require:true
	},
	_id:{
		type:String
	}
	}]
});

var Order = mongoose.model('Order',schemaOrder);
module.exports=Order;