const express = require('express');
const package_info = require('./package.json');

// create new express app and save it as "app"
const app = express();

// server configuration
const PORT = 8080;

// create a route for the app
app.get('/', (req, res) => {
  res.send('Hello World');
});

//creating an endpoint for retrieving server details from the app
app.get('/info', (request, response) => {
  response.send({
    serverName: package_info.serverName,
    serverVersion: package_info.serverVersion,
  });
});

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});