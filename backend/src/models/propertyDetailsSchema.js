const mongoose = require("mongoose");
const {Schema} = mongoose;

const propertySchema = new Schema({
    address:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    state:{
        type: String,
        required: true,
    },
    price:{
        type: String,
        required: true,
    },
    bedrooms:{
        type: Number,
        required: true,
    },
    bathrooms:{
        type: Number,
        required: true,
    },
    hospitals:{
        type: Number,
        required: true,
    },
    colleges:{
        type: Number,
        required: true,
    },
    likes:{
        type: Number,
        default:0
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    }
})

const PropertyDetails = mongoose.model('PropertyDetails', propertySchema);

module.exports = PropertyDetails;