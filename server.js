const express = require('express');
const product_info = require('./src/data/products.json');
const cat_info = require('./src/data/categories.json');

// create new express app and save it as "app"
const app = express();

// server configuration
const PORT = 8080;

//combining the two json files into a single json object
const combinedProductsData = () => {
  var cid, result = new Array();
  for (var i = 0; i < product_info.products.length; i++) {
    cid = product_info.products[i].categoryId;
    for (var j = 0; j < cat_info.categories.length; j++) {
      if (cid == cat_info.categories[j].categoryId)
        result.push(Object.assign(product_info.products[i], cat_info.categories[j]));
    }
  }
  return result;
}

// create a route for the app
app.get('/', (req, res) => {
  res.send('Hello World');
});

//creating an endpoint for retrieving all products
app.get('/products/all', (request, response) => {
  response.send(combinedProductsData());
});

//creating an endpoint for getting products by id and calling a method to find the product
app.get('/products/:id', (request, response) => {
  response.send(findProdById(request.params.id));
});

//creating an endpoint for getting products by their category ID
app.get('/category/:ctyId', (request, response) => {
  var i, result = new Array(), combinedProductData = combinedProductsData();
  for (i = 0; i < combinedProductData.length; i++) {
    if (combinedProductData[i].categoryId == request.params.ctyId)
      result.push(combinedProductData[i]); //creating an array of the matching results
  }
  response.send(result);
});

//searching across the combined json to find the required product
const findProdById = (id) => {
  const json = combinedProductsData();
  let element = json.find(product => product.id === id);
  return element;
}

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});