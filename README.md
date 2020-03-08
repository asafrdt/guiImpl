# react-form-builder-app with a Node server on Heroku

## Demo

Demo of the project can be seen at [Demo React Form Builder](https://asaf-form-builder.herokuapp.com/)


## Deploy to Heroku

```bash
git clone https://github.com/asafrdt/Form-Builder.git
cd react-form-builder/
heroku create
git push heroku master
```

This deployment will automatically:

  * detect [Node buildpack](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-nodejs)
  * build the app with
    * `npm install` for the Node server
    * `npm run build` for create-react-app
  * launch the web process with `npm start`
    * serves `../form-builder-ui/build/` as static files
    * customize by adding API, proxy, or route handlers/redirectors

👓 More about [deploying to Heroku](https://devcenter.heroku.com/categories/deployment).

## Mongoose Database Connection

A datbase named `"formbuilder"` , a collection `"forms"` must be created in your MongoDb and URI of Mongoose database collection must be placed in `line [9] server/index.js`

`
 mongoose.createConnection("mongodb+srv://<username>:<password>@cluster0-55xpb.mongodb.net/formbuilder");
`

## Local Development

Because this app is made of two npm projects, there are two places to run `npm` commands:

1. **Node API server** at the root `./`
1. **Formbuilder UI** in `form-builder-ui/` directory.

### Run the API server

In a terminal:

```bash
# Initial setup
npm install

# Start the server
npm start
```

#### Install new npm packages for Node

```bash
npm install package-name --save
```

### Run the Formbuilder UI

The React app is configured to proxy backend requests to the local Node server. (See [`"proxy"` config](form-builder-ui/package.json))

In a separate terminal from the API server, start the UI:

```bash
# Always change directory, first
cd form-builder-ui/

# Initial setup
npm install

# Start the server
npm start
```
