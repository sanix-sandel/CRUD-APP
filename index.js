const express=require('express')

const app=express()

app.use(express.json())//in order to use body in the req

const courses=[
    {id:1, name:"course 1"},
    {id:2, name:"course 2"},
    {id:3, name:"course 3"}
]

app.get('/', (req, res)=>{
    res.send('Hello world');
})

app.get('/api/courses', (req, res)=>{
    res.send(course);
})

app.post('/api/courses', (req, res)=>{
    const course ={
        id:courses.length+1, 
        name:req.body.name
    }
    courses.push(course);
    res.send(course);
})



const port=process.env.PORT || 3000;
app.listen(port, ()=>console.log(`Listening on port ${port}...`));