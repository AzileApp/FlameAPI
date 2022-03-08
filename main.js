const express = require("express");
const bodyParser = require('body-parser')
const request = require('request');
const fetch = require('node-fetch');
const app = express()

app.get('/', function(req, res) {
    res.send("Flame API is operational, to use ")
});

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.get('/api/webhooks/:id/:token', function(req, res) {
    var id = req.params.id
    var token = req.params.token
    request('https://discord.com/api/webhooks/' + id + "/" + token, function(error, response, body) {
        res.status(response && response.statusCode).send(body)
    });

});

app.post('/api/webhooks/:id/:token', function(req, res) {

    const id = req.params.id
    const token = req.params.token

    fetch(`https://discord.com/api/webhooks/${id}/${token}`, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(req.body)
    }).then(response => {
        res.json(req.body);
    })

});

app.listen(8000)
console.log('App is ready.');