const express = require('express');
const product_info = require('./src/data/products.json');
const cat_info = require('./src/data/categories.json');

// create new express app and save it as "app"
const app = express();

// server configuration
const PORT = 8080;

//combining the two json files into a single json object
const all_info = Object.assign(cat_info, product_info);

// create a route for the app
app.get('/', (req, res) => {
  res.send('Hello World');
});

//creating an endpoint for retrieving all products
app.get('/products/all', (request, response) => {
  response.send(all_info);
});

//creating an endpoint for getting products by id and calling a method to find the product
app.get('/products/:id', (request, response) => {
  response.send(findProdById(request.params.id));
});

//creating an endpoint for getting products by their category ID
app.get('/category/:ctyId', (request, response) => {
  var i;
  var result = new Array();
  for (i = 0; i < product_info.products.length; i++) {
    if (product_info.products[i].categoryId == request.params.ctyId)
      result.push(product_info.products[i]); //creating an array of the matching results
  }
  response.send(result);
});

//searching across the products.json to find the required product
const findProdById = (id) => {
  const key = Object.keys(product_info.products).find(product => product_info.products[product].id === id)
  return product_info.products[key]
}

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/` + all_info);
});