const express = require('express');
const mongoose = require('mongoose');//connect mongoDB
const bodyParser = require('body-parser');//Convert incoming data into a selected formar=t
const cors = require('cors');//Allow third party app(React) api

const app = express();  //we stored all express method inside app, so that we can decrease load time
const PORT = process.env.PORT || 5000; //told where to launch our server

//connected MongoDB, we used mongoDB connect API
const mongoDBAtlasURL = 'mongodb+srv://PremSitaRam:Premchannd123@cluster0.3qy03tc.mongodb.net/ProductData?retryWrites=true&w=majority'
//used mongoose drivers to send data from node to mongoDB
mongoose.connect( mongoDBAtlasURL , {
  useNewUrlParser: true, //to avoid errors while sending data
  useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB Atlas');  //if mongoDb is connected
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);  //when error is recieved from MongoDB
  });


  //imported Middlewares: can only be use dwith express
app.use(bodyParser.json()); //every input data will be converted into json format
app.use(cors()); //we told our browser to let api take the data to other interface, so that browser do not block the response

//define Schema of database
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String, //string: cloud mongodb has limited storage in free version 
});

const Product = mongoose.model('Product', productSchema);  // stored all data of database in Product variable

//API endpoint
//here we are using POST method to create new product in database
app.post('/api/products', async (req, res) => {
  try{
    const { name, description, imageUrl } = req.body;//request structure should have name, description, imageUrl 
    const product = new Product({ name, description, imageUrl }); 
    await product.save();
    res.status(200).send('Product Saved');
  }  
  //error handling
  catch(err) {
        res.status(200).send('Error in saving');
      }
   
  });

  //fetching data from database using gET Method

  app.get('/api/products', async (req, res) => {
    try{
      const products = await Product.find({});
      res.status(200).json(products);
    }
    catch (err){
      res.status(500).send('Error fetching products');
    }
  });
  
  //Server listens
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });