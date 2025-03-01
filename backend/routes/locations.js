const express = require('express');
const router = express.Router();
const Location = require('../models/locations');
const { Mongoose } = require('mongoose');

//Get all
//delete one
//post

router.get('/', async (req, res) => {
    const locations = await Location.find({});
    res.status(200).json(locations);
});

router.post('/', async (req, res) => {
    const { tags, name, coords, location, type, descr } = req.body;

    try{
        const newLocation = await Location.create({ tags, name, coords, location, type, descr })
        res.status(200).json(newLocation);
    
    }catch(err){
        res.status(400).json({ msg: err.msg });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if (!Mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ msg: 'Invalid ID' });
    }
    const location = await Location.findOneAndDelete({_name: id});

    if (!location) {
        res.status(400).json({ msg: 'Location not found' });
    }

    res.status(200).json(location);
});
module.exports = router;