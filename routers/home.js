const express = require('express');
const club = require('../models/club');
const Router = express.Router();
const Club = require('../models/club');

Router.get('/', (err,res)=>{
    res.render('index');
})

// create / insert data

Router.post('/add',(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;

    // console.log(name,email)

    const club = new Club({
        name,
        email,
        address
    })
    club.save(err=>{
        if(err){
            console.log("err is ")
        }else{
            res.redirect('/')
        }
    })
    
})

//find data

Router.get('/show',(req,res)=>{
    Club.find((err,docs)=>{
        if(err) throw err;

        res.render('show',{
            employees :docs
        })
        

    })
})

//update data


Router.get('/edit/:id',(req,res)=>{
   
    Club.findOneAndUpdate({_id: req.params.id},req.body,{new:true},(err,docs)=>{
        if(err){
            console.log("cant update")
        }else{
            res.render('edit',{employeedata:docs})
        }
    })
})

Router.post('/edit/:id',(req,res)=>{
    Club.findByIdAndUpdate({_id:req.params.id},req.body,(err,docs)=>{
        if(err){
           console.log("err") 
        }else{
            res.redirect('/show')
        }
    })
})

//Delete data

Router.get('/delete/:id',(req,res)=>{
    Club.findByIdAndDelete({_id:req.params.id},req.body,(err,docs)=>{
        if(err){
            console.log("err is ")
        }else{
            console.log("Deleted")
            res.redirect('/show')
        }
    })
})

module.exports = Router;