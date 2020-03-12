const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const mongoose = require('mongoose');
const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;
const passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;


var connection = mongoose.createConnection("mongodb+srv://Asafrdt:asaf135790@cluster0-8jbjb.mongodb.net/test?retryWrites=true&w=majority");


// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) { //cluster.isMaster: true if the porcess is master.
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  //When a new worker is forked the cluster module will emit a 'fork' event. 
  //This can be used to log worker activity, and create a custom timeout
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork(); 
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();

  






const bodyParser = require('body-parser')


  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../form-builder-ui/build')));
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )

  app.use(bodyParser.json())
  passport.use(new GitHubStrategy({
    clientID: '6f676a95fde7c2bbae31',
    clientSecret: 'b0eb0b5e9506757cbf1f87f92ba1570f20174f54',
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
  ));
  var autoIncrement = require('mongoose-auto-increment');
  autoIncrement.initialize(connection);

  var formSchema = require('./models/form');
  formSchema.plugin(autoIncrement.plugin, { model: 'Form', field: 'formId', startAt: 1 });

  var Form = connection.model('Form', formSchema);



app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
  // after creating a form, client side send to the server side the form details
  // and this function save the form to the Database  
  app.post('/form', async (req, res) => {

    var form = new Form({
      name: req.body.payload.form.name,
      inputs: req.body.payload.form.inputs
    });

    await form.save().catch(function (err) {
      console.log.length(err)
    })

    res.sendStatus(200);
  });

  // when user want to submit a form, the client send a get request
  // and the server get the form fields from the db and send it back to the client.
  app.get('/form/:formId', async (req, res) => {

    var formId = req.params.formId;
    var form = await Form.find({ formId: formId }).catch(function (err) {
      console.log.length(err)
    })

    var formObj = {
      "formId": form[0]['formId'],
      "name": form[0]['name'],
      "inputs": form[0]['inputs']
    }

    res.set('Content-Type', 'application/json');
    res.send(formObj);
  });

  var formSubmissionSchema = require('./models/formSubmission');
  var FormSubmission = connection.model('FormSubmission', formSubmissionSchema);
//*********************************************************************************** */
// var CountersSchema = requiere('./models/identitycounters')
// var Counters = connection.model('Counters', CountersSchema);

//*********************************************************************************** */

app.delete('/deleteForm/:id', function(req,res) {
  console.log("id = " + req.params.id);
  Form.deleteOne({formId: req.params.id}, req.body, function(err,data)
  {
      if(!err){
          console.log("Deleted");
      }
  }
  );
});

  // get all forms
  // formlist page ask all the forms from the server for present it to the client
  app.get('/forms', async (req, res) => {
    var formSubmissionCount = [];
    var formsListMap = {}

    const formsList = await Form.find({}).catch(function (err) {
      console.log.length(err)
    })

    formsList.map(async form => {
      var formObj = {
        "formId": form.formId,
        "name": form.name,
        "inputs": form.inputs
      }
      formsListMap[form.formId] = formObj;
      formSubmissionCount.push(sum(form.formId))
    })

    const submissionCounts = await Promise.all(formSubmissionCount)

    Object.keys(submissionCounts).map((key) => {
      var pointer = parseInt(key) + 1;

      if (formsListMap[pointer].formId == pointer) {
        formsListMap[pointer]["submissionCount"] = submissionCounts[key]
      }
    })

    res.set('Content-Type', 'application/json');
    res.send(formsListMap);
  });

  // get form submission count by form id
  async function sum(id) {
    var submissions = await FormSubmission.find({ formId: id }).catch(function (err) {
      console.log.length(err)
    })
    return submissions.length;
  }

  // post submission methd
  app.post('/submit', async (req, res) => {

    var formSubmission = new FormSubmission({
      formId: req.body.payload.form.formId,
      name: req.body.payload.form.name,
      response: req.body.payload.form.response
    });

    await formSubmission.save().catch(function (err) {
      console.log.length(err)
    })
    res.sendStatus(200);
  });

  // get submissions by form id
  app.get('/submission/:formId', async (req, res) => {
    var formId = req.params.formId;
    var submissionsList = {};

    var form = await Form.find({ formId: formId }).catch(function (err) {
      console.log.length(err)
    })

    var submissions = await FormSubmission.find({ formId: formId }).catch(function (err){
      console.log.length(err)
    })

    submissions.forEach((submission) => {
      var formSubmissionObj = {
        "formId": submission.formId,
        "name": submission.name,
        "response": submission.response
      }
      submissionsList[submission._id] = formSubmissionObj;
    });

    submissionsList['formControls'] = form[0].inputs;

    res.set('Content-Type', 'application/json');
    res.send(submissionsList);
  });

  

  // All remaining requests return the React app, so it can handle routing.
  // app.get('*', function (request, response) {
  //   response.sendFile(path.resolve(__dirname, '../form-builder-ui/build', 'index.html'));
  // });

  app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker ' + process.pid}: listening on port ${PORT}`);
  });
}
