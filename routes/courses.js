const express=require('express');
const router=express.Router();

const courses=[
    {id:1, name:"course 1"},
    {id:2, name:"course 2"},
    {id:3, name:"course 3"}
]



router.get('/:id', (req, res)=>{
    const course=courses.find(c=>c.id===parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given ID was not found')
    res.send(course);
})

router.post('/create', (req, res)=>{

    const {error}=validateCourse(req.body);
    if(error) return res.status(400).send(result.error.details[0].message);

    const course ={
        id:courses.length+1, 
        name:req.body.name
    }
    courses.push(course);
    res.send(course);
})

router.put('/put/:id', (req, res)=>{
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


router.delete('//delete/:id', (req, res)=>{
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
    return Joi.validate(course, schema)
}


module.exports=router;