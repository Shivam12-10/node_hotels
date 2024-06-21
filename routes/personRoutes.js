const express = require('express');
const router = express.Router();
const Person = require('./../models/person');


 //Post route to add a person

 router.post('/',async (req,res) =>{
     
    try{
      const data  = req.body //Assuming the request body contains person data
    //create a new person document using the mongoose model
    const newPerson = new Person(data);

    //save new person from the database
    //save functuon callback return krta hai

    const savedPerson = await newPerson.save();
    console.log('data saved');
    res.status(200).json(savedPerson);

    }
  
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});

  }
  } );

  router.get('/', async (req,res) =>{
    try {
      const data = await Person.find();
      console.log('data fetched');
      res.status(200).json(data);


    }catch{
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
   

    }
  });
  
  //detail of menu
  router.get('/:workType',async  (req, res) => {
     
    try {
      const workType = req.params.workType; // Extract the work typefrom the URL parameter
      // Assuming you already have a Person model and MongoDB connection set up
      if(workType == 'chef' || workType == 'manager' || workType =='waiter'){
        const response = await Person.find({ work: workType });
        console.log('response fetched');
        res.status(200).json(response);
      }else{
        res.status(404).json({error:'invalid work type'});
      }
      
      } catch (error) {
      console.error('Error fetching persons:', error);
      res.status(500).json({ error: 'Internal server error' });
      }
  });

  
  router.put('/:id', async (req, res) => {
    try {
    const personId = req.params.id; // Extract the person's ID from the URL parameter
    const updatedPersonData = req.body; // Updated data for the person
    // Assuming you have a Person model
    const response = await  Person.findByIdAndUpdate(personId, updatedPersonData, {
    new: true, // Return the updated document,update ke baad updated document ko reponse send krenge
    runValidators: true, // Run Mongoose validation that is in person.js
    });
    if (!response) {
    return res.status(404).json({ error: 'Person not found'});
    }
    // Send the updated person data as a JSON response
    console.log('data updated');
    res.status(200).json(response);
    } catch (error) {
    console.error('Error updating person:', error);
    res.status(500).json({ error: 'Internal server error' });
    }
    });

    router.delete('/:id', async(req,res) =>{
      try{
        const personId = req.params.id; // Extract the person's ID from the URL parameter
        const deletedPerson = await Person.findByIdAndRemove(personId);
        if (!deletedPerson) 
          {
          return res.status(404).json({ error: 'Person not found' });
          }
          console.log('data delete');
          res.status(200).json({message: 'Data Deleted Successfully'});

      }catch(err){
        console.error('Error updating person:', error);
        res.status(500).json({ error: 'Internal server error' });
  
      } 
    });

  module.exports = router;