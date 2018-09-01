const express = require('express');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const graphqlHTTP = require('express-graphql');
const {buildSchema} = require('graphql');

const schema = buildSchema(fs.readFileSync(path.join(__dirname, 'schema.gql'), 'utf8'));

const ritoKey = 'RGAPI-34b74ecc-36c2-4d37-b382-a025f6cc2d71';

const root = {
    summoner: args => {
        return new Promise((resolve, reject) => {
            if (args) {
                axios.get(`https://euw1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${args.name}?api_key=${ritoKey}`)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error)
                });
            } else {
                reject('nono');
            }
        });
    }
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