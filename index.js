const express = require('express');
const db = require('./config/mongoose');
const errorHandler = require('./middleware/ErrorHandler');
require('dotenv').config();
const port = process.env.PORT;

// DATABASE CONNECTION 
db();



// CREATING APP SERVER 
const app = express();

// MIDDLEWARE 
app.use(express.json());

// ROUTES FOR THE SERVER 
app.use('/api/contact', require('./routes/ContactRoutes'));
app.use('/api/user', require('./routes/UserRoutes'));
app.use(errorHandler);


app.listen(port, (err)=>{
    if (err) {console.log(err); return}
    console.log(`yup server running at port: http://localhost:${port}`)
})