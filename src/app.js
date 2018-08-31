const express = require('express');
const fs = require('fs');
const path = require('path');
const graphqlHTTP = require('express-graphql');
const {buildSchema} = require('graphql');

const schema = buildSchema(fs.readFileSync(path.join(__dirname, "schema.gql"), "utf8"));

const root = {
    hello: () => 'Hello world!'
};

const app = express();
const port = 3000;

app.get('/api/hello', (req, res) => {
    res.json('Hello world!');
});

app.use('/api/gql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(port, () => console.log(`Listenning at ${port}`));