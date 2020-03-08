const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const mongoose = require('mongoose');
const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

const connection = mongoose.createConnection("mongodb+srv://Asafrdt:asaf135790@cluster0-8jbjb.mongodb.net/test?retryWrites=true&w=majority");


// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
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

  const autoIncrement = require('mongoose-auto-increment');
  autoIncrement.initialize(connection);

  const formSchema = require('./models/form');
  formSchema.plugin(autoIncrement.plugin, { model: 'Form', field: 'formId', startAt: 1 });

  const Form = connection.model('Form', formSchema);

  // form post method
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

  // get form by id
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

  // get all forms
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
  app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, '../form-builder-ui/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker ' + process.pid}: listening on port ${PORT}`);
  });
}
