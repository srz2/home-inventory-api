const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    quantity: String,
    location: String,
    color: String,
    estimatedCost: String,
    sku: String,
    tags: [String],
})

module.exports = mongoose.model("Item", itemSchema);