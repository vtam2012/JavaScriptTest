const fs = require('fs'); // require file system package
const path = require('path'); // create paths
const express = require('express');

const app = express(); // express is a function

// parse incoming requests
app.use(express.urlencoded({extended: false})); // applied to all requests. Middleware

app.get('/currenttime', function(req, res, next){
    res.send('<h1>'+ new Date().toISOString() +'</h1>');
}); // localhost:3000/currenttime

app.get('/', function(req, res, next){
    res.send('<form action="/store-user" method="POST"><label>Your Name</label><input type="text" name="username"><button>Submit</button></form>');
}); // localhost:3000/

app.post('/store-user', function(req, res){
    const userName = req.body.username; // parse username from request body
    const filePath = path.join(__dirname,'data', 'users.json'); // absolute path
    const fileData = fs.readFileSync(filePath); // read json file from path
    const existingUsers = JSON.parse(fileData); // create Javascript array from JSON
    existingUsers.push(userName); // push username to array 
    fs.writeFileSync(filePath, JSON.stringify(existingUsers)); // convert exisitingUsers array to text with stringify
    res.send('<h1>Username stored!</h1>');
});

app.get('/users', function(req, res){
    const filePath = path.join(__dirname,'data', 'users.json'); // absolute path
    const fileData = fs.readFileSync(filePath); // read json file from path
    const existingUsers = JSON.parse(fileData); // create Javascript array from JSON
    //res.send(existingUsers);

    let responseData = '<ul>';
    for( const user of existingUsers){
        responseData += '<li>'+ user + '</li>'
    }
    responseData += '</ul>';
    res.send(responseData);
});
app.listen(3000);
