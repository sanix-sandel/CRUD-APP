const config=require('config')
const morgan=require('morgan')
const helmet=require('helmet')
const logger=require('./logger.js');
const Joi=require('joi');
const express=require('express')


const app=express()


app.set('view engine', 'pug');
app.set('views', './views');//directory for templates

app.use(express.json())//in order to use body in the req
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))//middleware for static content
app.use(helmet());
app.use(morgan('tiny'));

app.use(logger)

//Middleware for authentication
app.use(function(req, res, next){
    console.log('Authenticating...')
    next();
})



const courses=[
    {id:1, name:"course 1"},
    {id:2, name:"course 2"},
    {id:3, name:"course 3"}
]

app.get('/', (req, res)=>{
    res.render('index', {title:'My Express App', message:'Hello'});
})

app.get('/api/courses/:id', (req, res)=>{
    const course=courses.find(c=>c.id===parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given ID was not found')
    res.send(course);
})

app.post('/api/courses/create', (req, res)=>{

    const {error}=validateCourse(req.body);
    if(error) return res.status(400).send(result.error.details[0].message);

    const course ={
        id:courses.length+1, 
        name:req.body.name
    }
    courses.push(course);
    res.send(course);
})

app.put('api/courses/put/:id', (req, res)=>{
    //Find the course 
    const course=courses.find(c=>c.id===parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given ID was not found')

    const result=validateCourse(req.body);
    const {error}=validateCourse(req.body);
    if(error){
        res.status(400).send(result.error.details[0].message);
        return ;
    }

    course.name=req.body.name;
    res.send(course);

    //Update course, return the update course
})


app.delete('/api/courses/delete/:id', (req, res)=>{
    //Look up the course 
    //Not existing, return 404
    const course=courses.find(c=>c.id===parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found')

    //Delete the course
    const index=courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);


})

function validateCourse(course){
    const schema={
        name:Joi.string().min(3).required()
    }
}

const port=process.env.PORT || 3000;
app.listen(port, ()=>console.log(`Listening on port ${port}...`));