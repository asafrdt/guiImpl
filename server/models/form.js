var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var formSchema = new Schema({
    id: String,
    name: String,
    inputs: Object
});

// make this available to our forms in our Node applications
module.exports = formSchema;

