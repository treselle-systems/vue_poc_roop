var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies


/* enable the encode  */
const encode = require('nodejs-base64-encode');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



/* SignUp API */
app.post('/api/v1/signup', function(req, res) {

    var saveObj = {};

    saveObj.email = req.body.userEmail;

    saveObj.first_name = req.body.first_name;
    saveObj.last_name = req.body.last_name;

    saveObj.password = encode.decode(req.body.userPwd, 'base64');


    /* Add the additional objects */

    saveObj.token = Math.floor(Math.random() * 90000) + 10000;
    var apiRes = {
        'res': 'failure'
    };
    fs.readFile("credentials.json", 'utf8', function(err, contents) {

        userDetails = JSON.parse(contents);
        for (i = 0; i < userDetails.length; i++) {
            if ((userDetails[i].email == req.body.userEmail)) {
                apiRes = {
                    'res': 'already_exist',
                };
                res.send(apiRes);
            }
        }

        if (apiRes.res == 'failure') {
            userDetails.push(saveObj);
            var saveJsonStr = JSON.stringify(userDetails);
            fs.writeFile("credentials.json", saveJsonStr, function(err) {
                apiRes = {
                    'res': 'saved',
                };
                res.send(apiRes);
            });
        }

    });

});


/* Login  API */
app.post('/api/v1/login', function(req, res) {
    var uEmail = req.body.userEmail;
    var uPwd = encode.decode(req.body.userPwd, 'base64');

    var apiRes = {
        'res': 'failure'
    };

    fs.readFile("credentials.json", 'utf8', function(err, contents) {
        var userAuthDetails = JSON.parse(contents);
        for (i = 0; i < userAuthDetails.length; i++) {
            if ((userAuthDetails[i].email == uEmail) && (userAuthDetails[i].password == uPwd)) {
                apiRes = {
                    'res': 'success',
                    'token': userAuthDetails[i].token,
                    'first_name': userAuthDetails[i].first_name,
                    'last_name': userAuthDetails[i].last_name,
                };

            }
        }
        res.send(apiRes);
    });
});

console.log('server started at 3001');
app.listen(3001);