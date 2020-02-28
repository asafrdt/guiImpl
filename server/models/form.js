// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var formSchema = new Schema({
    id: String,
    name: String,
    inputs: Object
});

// formSchema.methods.getFormName = function () {
//     // add some stuff to the form name
//     this.name = this.name;

//     return this.name;
// };

// the schema is useless so far
// we need to create a model using it
// var Form = mongoose.model('Form', formSchema);

// make this available to our forms in our Node applications
module.exports = formSchema;

