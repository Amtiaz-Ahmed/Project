const express           = require('express');
const app               = express();
const path              = require('path');
const cookieParser      = require('cookie-parser');

const db                = require('./config/mongoose-connection');
const usersRouter       = require('./routes/usersRouter');
const ownersRouter      = require('./routes/ownersRouter');
const productsRouter    = require('./routes/ProductsRouter');
const indexRouter    = require('./routes/indexRouter');

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,('public'))));
app.use(cookieParser());
app.set('view engine','ejs');


app.use('/owners'   , ownersRouter);
app.use('/users'    , usersRouter);
app.use('/products' , productsRouter);

app.get('/', (req,res)=>{
    res.send('hey');
});

app.listen(3000);
