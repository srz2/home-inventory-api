const express = require('express')
const mongoose = require('mongoose')
const auth = require('../middleware/check-auth');
const router = express.Router()

const Item = require('../models/Item')

router.get('/', auth, (req, res, next) => {
    Item.find()
    .exec()
    .then(docs => {
        console.log(`Found ${docs.length}`);
        res.status(200).json({
            count: docs.count,
            items: docs
        })
    })
    .catch(err => {
        res.status(500).json({
            message: "Failed to get items",
            error: err
        })
    })
})

router.get('/:id', auth, (req, res, next) => {
    const id = req.params.id;
    console.log('Getting item:', id);
    Item.findById(id)
    .exec()
    .then(doc => {
        if (doc) {
            res.status(200).json({
                item: doc
            })
        } else {
            res.status(404).json({
                message: 'Item with given id not found',
                id: id,
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'Failed to retreive item with id',
            id: id,
            error: err
        })
    })
})

router.post('/', auth, (req, res, next) => {
    const newItem = new Item({
        _id: mongoose.Types.ObjectId(),
        created: new Date(),
        name: req.body.name,
        description: req.body.description,
        brandCompany: req.body.brandCompany,
        quantity: req.body.quantity,
        location: req.body.location,
        color: req.body.color,
        estimatedCost: req.body.estimatedCost,
        sku: req.body.sku,
        tags: req.body.tags
    })
    
    newItem.save()
    .then(result => {
        res.status(201).json({
            message: 'Successfully created new item',
            createdItem: result,
            url: `/items/${result._id}`
        })
    })
    .catch(error => {
        res.status(500).json({
            message: "Failed to save new item"
        })
    })
})

router.delete('/:id', auth, (req, res, next) => {
    const id = req.params.id;
    console.log('Deleting:', id);
    Item.remove({
        _id: id
    })
    .exec()
    .then(results => {
        res.status(200).json(results)
    })
    .catch(err => {
        res.status(500).json({
            message: "Failed to remove item",
            id: id,
            error: err
        })
    })
})

router.put('/:id', auth, (req, res, next) => {
    const id = req.params.id;
    console.log('Updating:', id);
    Item.findByIdAndUpdate(id, req.body)
    .exec()
    .then(result => {
        res.status(201).json({
            message: "Successfully updated item",
            id: id,
            url: `/items/${result.id}`
        })
    })
    .catch(err => {
        res.status(500).json({
            message: "Failed to update item",
            id: id,
            newItem: req.body
        })
    })
})

module.exports = router;