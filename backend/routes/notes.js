const express = require('express')
const router = express.Router()

const Notes = require('../models/Notes')
const fetchuser = require('../middleware/fetchuser')
const { findByIdAndUpdate } = require('../models/User')

// Gett All the notes of a user who is logged in
router.get('/fetchallnotes', fetchuser, async(req,res)=>{
    try{
        const note = await Notes.find({ user: req.user.id})
        return res.status(201).json(note)
    }
    catch(err){
        return res.status(401).json({message:'Internal Server Error'})
    }
})

// Add a new note for the logged in user
router.post('/addnote', fetchuser, async(req,res)=>{
    const { title, description, tag} = req.body
    try {
        const newnote = new Notes({ title, description, tag, user: req.user.id })
        // console.log(newnote)
        await newnote.save()
        return res.status(201).json({message: 'Note added successfully', data:newnote})  
    } catch (error) {
        return res.status(401).json({message:'Internal Server Error'})        
    }  
})

// Update an existing note, login required
router.put('/updatenote/:id', fetchuser, async(req,res)=>{
    const { title, description, tag} = req.body
    const updates = {}
    if(title){
        updates.title = title
    }   
    if(description){
        updates.description = description
    }   
    if(tag){
        updates.tag = tag
    }
    try {
        const note = await Notes.findById(req.params.id)
        if(!note){
            return res.status(401).json({message: 'Not Found'})
        }
        if(req.user.id !== note.user.toString()){
            return res.status(401).json({message: 'Access Denied'})
        }
        await Notes.findByIdAndUpdate(req.params.id, {$set: updates}, {new: true})
        return res.status(201).json({message:'Note Updated',data:updates})
    } catch (error) {
        return res.status(401).json({message:'Internal Server Error'})        
    }   
})

// Delete an existing Note, login required
router.delete('/deletenote/:id', fetchuser, async(req,res)=>{
    try {
        const note = await Notes.findById(req.params.id)
        if(!note){
            return res.status(401).json({message: 'Not Found'})
        }
        if(note.user.toString()!==req.user.id){
            return res.status(401).json({message: 'Access Denied'})
        }
        await Notes.findByIdAndDelete(req.params.id)
        res.status(201).json({message: 'Deleted Successfully'})
    } catch (error) {
        return res.status(401).json({message:'Internal Server Error'})        
    }
})

module.exports = router