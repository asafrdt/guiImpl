// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var formSubmissionSchema = new Schema({
    formId: String,
    name: String,
    response: Object
});


// make this available to our forms in our Node applications
module.exports = formSubmissionSchema;

