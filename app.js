const express = require('express');
const app = express()
const mongoose = require('mongoose')
// const User = require("./Model/Schema")
const StudentModel = require('./Model/Schema')
const DB_Uri= "mongodb+srv://shivkumar:shivkumarproject@cluster0.ukvzdar.mongodb.net/10xStudentClass";
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.use(express.json());

mongoose.connect(DB_Uri)
.then(()=>console.log("Database Connected Successfully"))
.catch(err => console.log(err))


/// Create a new Class

app.post('/v1/myClass', async(req, res)=>{
    console.log(req.body)
    try {
        const newClass =  new StudentModel(req.body);
        const savedetails = await newClass.save()
        res.status(200).json(savedetails)
        }catch(error){
            res.json(error)
        }
})


/// Register a new student to class
app.post('/v1/myClass/:myClassId/students', async(req, res)=>{
    console.log(req.body)
    const studentId = Math.floor(Math.random()*100)
    try {
        const newClass =  new StudentModel(req.body);
        const savedetails = await newClass.save()
        res.status(201).json({
            status:"success",
            studentId
        })
        }catch(error){
            res.json(error)
        }
})

///  List out all classes

app.get('/v1/myClass', async(req, res)=>{
    console.log(req.body)
    try {
        // const allDetals =  new StudentModel(req.body);
        const classes = await StudentModel.find({})
        res.status(200).json({classes})
        }catch(error){
            res.json(error)
        }
})
/// Get a specific class

app.get('/v1/myClass/:myClassId', async(req, res)=>{
    console.log(req.body)
    try {
        // const allDetals =  new StudentModel(req.body);
        const classes = await StudentModel.find({myClassId: req.params.myClassId})
        res.status(200).json({classes})
        }catch(error){
            res.json(error)
        }
})
/// Get all students in a specific class

app.get('/v1/myClass/:myClassId/students', async(req, res)=>{
    console.log(req.body)
    try {
        // const allDetals =  new StudentModel(req.body);
        const classes = await StudentModel.find({students: req.params.students})
        res.status(200).json({classes})
        }catch(error){
            res.json(error)
        }
})
///Get one student details

app.get('/v1/myClass/:myClassId/students/:studentId', async(req, res)=>{
    console.log(req.body)
    try {
        // const allDetals =  new StudentModel(req.body);
        const classes = await StudentModel.find({studentId: req.params.studentId})
        res.status(200).json({classes})
        }catch(error){
            res.json(error)
        }
})




app.put('/v1/myClass/:myClassId/students/:studentId', async(req, res)=>{
    console.log(req.body)
    try {
        // const allDetals =  new StudentModel(req.body);
        const updatestudent = await StudentModel.findByIdAndUpdate(req.params.studentId, {$set:req.body})
        res.status(200).json(updatestudent)
        }catch(error){
            res.json(error)
        }
})


app.delete('/v1/myClass/:myClassId', async(req, res)=>{
    console.log(req.body)
    try {
        // const allDetals =  new StudentModel(req.body);
        const deleteClass = await StudentModel.deleteOne({myClassId:req.params.myClassId} )
        res.status(200).json("deleteClass")
        }catch(error){
            res.json(error)
        }
})


/// - Delete a class

app.delete('/v1/myClass/:myClassId', async(req, res)=>{
    console.log(req.body)
    try {
        // const allDetals =  new StudentModel(req.body);
        const classDelete = await StudentModel.deleteOne({myClassId: req.params.myClassId} )
        res.status(200).json("deleteClass")
        }catch(error){
            res.json(error)
        }
})
/// - Delete a student

app.delete('/v1/myClass/:myClassId/students/:studentId', async(req, res)=>{
    console.log(req.body)
    try {
        // const allDetals =  new StudentModel(req.body);
        const studentDelete = await StudentModel.deleteOne({studentId: req.params.studentId} )
        res.status(200).json("deleteClass")
        }catch(error){
            res.json(error)
        }
})


app.get('*', (req, res)=>{
    res.status(404).send("Faild API")
})


app.listen(5000, ()=>console.log("Your Port Is Up At 5000"));