const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const config = require('config');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const { isAuthenticated } = require('./graphql/helpers/middlewares');
const app = express();

app.use(bodyParser.json());
app.use(isAuthenticated);
app.use(
  '/api',
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);
const PORT = 9000;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const uri = `mongodb+srv://${config.get('MONGO_USER')}:${config.get(
  'MONGO_PASSWORD'
)}@cluster0-f0dgj.mongodb.net/${config.get(
  'MONGO_DB'
)}?retryWrites=true&w=majority`;

mongoose
  .connect(uri, options)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
