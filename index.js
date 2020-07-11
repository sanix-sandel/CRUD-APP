const config=require('config')
const morgan=require('morgan')
const helmet=require('helmet')
const logger=require('./middleware/logger.js');
const Joi=require('joi');
const express=require('express')
const courses=require('./routes/courses')
const home=require('./routes/home')

const app=express()


app.set('view engine', 'pug');
app.set('views', './views');//directory for templates

app.use(express.json())//in order to use body in the req
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))//middleware for static content
app.use(helmet());
app.use(morgan('tiny'));
app.use('/api/courses', courses);

app.use(logger)



//Middleware for authentication
app.use(function(req, res, next){
    console.log('Authenticating...')
    next();
})

/**/

const port=process.env.PORT || 3000;
app.listen(port, ()=>console.log(`Listening on port ${port}...`));