const express = require('express'); // Importing express
   const app = express(); // Creating an express app

   // Create a route that sends a response when visiting the homepage
   app.get('/', (req, res) => {
     res.send('<h1>Hello, Express.js Server!</h1>');
   });

   app.get('/', (req, res) => {
     res.send('Hello, Express.js Server!');
   });

   // Set up the server to listen on port 4000
   const port = 4000;
   app.listen(port, () => {
     console.log(`Server is running on port ${port}`);
   });