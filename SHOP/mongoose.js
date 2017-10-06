var mongoose = require('mongoose');
//mongoose.Promise = global.Promise;
//assert.equal(query.exec().constructor, global.Promise);
mongoose.connect('mongodb://shop_user:Pass_321@ds127564.mlab.com:27564/internetshop');
console.log('mongo db conect');
module.exports=mongoose;