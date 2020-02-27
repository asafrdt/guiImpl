const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const mongoose = require('mongoose');
const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

var Form = require('./models/form');

mongoose.connect('mongodb://localhost/formbuilder');

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

  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )

  app.use(bodyParser.json())

  app.post('/form', (req, res) => {
    console.log(req.body.payload)

    var formName = "";
    // create a new Form called Form1
    var form = new Form({
      name: req.body.payload.form.name,
      inputs: req.body.payload.form.inputs
    });

    // call the custom method.
    // forms will now be Form1
    // form.getFormName(function (err, name) {
    //   if (err) throw err;
    //   console.log('Form name is ' + name);
    //   formName = name;
    // });

    // call the built-in save method to save to the database
    form.save(function (err) {
      if (err) throw err
      console.log('Form saved successfully!');
    });

    res.set('Content-Type', 'application/json');
    res.send('{"message":"' + formName + '"}');
  })

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../form-builder-ui/build')));

  // Answer API requests.
  app.get('/api', function (req, res) {

    var formName = "";
    // create a new Form called Form1
    var form = new Form({
      name: 'Form1'
    });

    // call the custom method.
    // forms will now be Form1
    form.getFormName(function (err, name) {
      if (err) throw err;
      console.log('Form name is ' + name);
      formName = name;
    });

    // call the built-in save method to save to the database
    form.save(function (err) {
      if (err) throw err
      console.log('Form saved successfully!');
    });

    res.set('Content-Type', 'application/json');
    res.send('{"message":"' + formName + '"}');
  });

  // app.post('/form', function (req, res) {
  //   console.log(req.body)
  //   res.set('Content-Type', 'application/json');
  //   res.send('{"message":"' + req + '"}');
  // });

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, '../form-builder-ui/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker ' + process.pid}: listening on port ${PORT}`);
  });
}
