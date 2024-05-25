const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const User = require("./models/userSchema")
const PropertyDetails = require('./models/propertyDetailsSchema');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const cors = require("cors");

const secret_key = process.env.SECRET_KEY;
require("./db/conn");


var corsOptions = {
    orgin : "http://localhost:3001",
    methods : "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials : true,
}

// handlings cors
app.use(cors(corsOptions));

// used to convert incoming request object to json object.
app.use(express.json());



// Middleware function for authentication
const authenticateToken = (req, res, next) => {

    var token = req.header('Authorization');

    if (!token) return res.status(401).json("Unuthorized"); // Unauthorized

    try{
        token = token.replace("Bearer", "").trim();
        const isVerified = jwt.verify(token, secret_key);
        console.log(isVerified);
        req.user = isVerified;
        next();
    }
    catch(e){
        // res.send(e);
        console.log(e);
    }

};

// get all users
app.get("/users", async(req,res)=>{
    
    try{
        const allUsers = await User.find();
        res.send(allUsers)
    }
    catch(e){
        res.send(e);
    }

})

// register user
app.post("/register-user", (req, res) => {
    const { email, password, phone, name } = req.body;
  
    // Check if all fields are provided
    if (!email || !password || !phone || !name) {
      return res.status(400).json("All fields are required." );
    }
  
    // Check if the email already exists in the database
    User.findOne({ email })
      .then(existingUser => {
        if (existingUser) {
          return res.status(409).json("Email already exists." );
        }

        if(password.length<6){
            return res.json("Password must be atleast 6 characters.");
        }
  
        // Create a new user instance
        const newUser = new User({ email, password, phone, name });
  
        // Save the new user to the database
        return newUser.save();
      })
      .then(newUser => {
        // Generate JWT token
        const token = jwt.sign({ id: newUser._id }, secret_key, { expiresIn: '1h' });
  
        // Send the token as a response
        res.status(201).json({ token });
      })
      .catch(error => {
        console.log(error);
        res.status(500).json("Internal server error." );
      });
});

// login user
app.post("/login", async(req,res)=>{

    const {email, password} = req.body;

    if( !email || !password ){
        return res.status(400).json("Email and password are required.")
    }

    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json("Email is not registered.");
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch){
           return res.status(401).json("Invalid Credentials!")
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, secret_key, { expiresIn: '1h' });

        return res.status(201).json({token});

    }
    catch(e){
        console.error(error);
        res.status(400).json("Internal server error." );
    }
    
})


// get all properties
app.get("/all-properties", authenticateToken, async(req,res)=>{

    try{
        const allProperty = await PropertyDetails.find();
        console.log("all properties",allProperty);
        res.status(201).json(allProperty);
        console.log(allProperty)
    }
    catch(e){
        // res.status(400).send(e);
        console.log(e)
    }

})

// get individual property by id
app.get("/all-properties/:id", authenticateToken, async(req,res)=>{

    try{
        const _id = req.params.id;

        const individualProperty = await PropertyDetails.findById(_id).populate('owner', 'name email phone'); // Only include name, email, and phone;
     
        console.log("individual property by id - ", individualProperty);
        
        res.status(200).json(individualProperty);
    }
    catch(e){
        // internal server error
        // res.status(500).send(e);
        console.log(e)
    }
    
})

// get properties by city
app.get("/all-properties/:city", authenticateToken, async(req,res)=>{

    try{
        const city = req.params.city;
        const allPropertyByCity = await PropertyDetails.find({city});
        console.log("all properties by city",allPropertyByCity);

        if(allPropertyByCity.length==0){
            // page not found - 404
            res.status(404).send("no property found");
        }
        else{
            res.status(201).send(allPropertyByCity);
        }
    }
    catch(e){
        // internal server error
        res.status(500).send(e);
    }

})



// post property details
app.post("/sale-property", authenticateToken, async (req, res) => {
    try {
        const { address, city, state, price, bedrooms, bathrooms, hospitals, colleges } = req.body;

        // Check if all required fields are present
        if (!address || !city || !state || !price || !bedrooms || !bathrooms || !hospitals || !colleges) {
            return res.status(400).json("All fields are required.");
        }

        const newProperty = new PropertyDetails({
            address,
            city,
            state,
            price,
            bedrooms,
            bathrooms,
            hospitals,
            colleges,
            owner: req.user.id // Associate property with authenticated user
        });

        // Save the new property
        await newProperty.save();

        return res.status(201).json("Successfully Posted!");
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal server error.");
    }
});


// my all properties
app.get("/my-properties", authenticateToken, async(req,res)=>{

    try{
        const id = req.user.id;
        const myProperties = await PropertyDetails.find({owner:id});
        res.status(201).send(myProperties);
        console.log(myProperties);
    }
    catch(e){
        res.status(404).send(e);
    }

})

// individual property by id
app.get("/my-properties/:id", authenticateToken, async(req,res)=>{

    try{
        const _id = req.params.id;
        const myProperty = await PropertyDetails.findByIdAndUpdate({_id});
        console.log(myProperty);
        res.json(myProperty)
    }
    catch(e){
        // res.status(404).send(e);
        console.log(e);
    }

})

// update property
app.patch("/my-properties/:id", authenticateToken, async(req,res)=>{

    try{
        const _id = req.params.id;
        const owner_id = req.user.id;
        const updatePropertyDetail = await PropertyDetails.findByIdAndUpdate({_id, owner: owner_id }, req.body, { new: true });
        console.log(updatePropertyDetail);
        res.status(201).json(updatePropertyDetail)
    }
    catch(e){
        res.status(404).json(e);
    }

})

// delete property
app.delete("/my-properties/:id", authenticateToken, async(req,res)=>{

    try{
        const _id = req.params.id;
        const deleteProperty = await PropertyDetails.findByIdAndDelete({_id});
        console.log(deleteProperty);
        res.status(201).json(deleteProperty)
    }
    catch(e){
        res.status(404).json(e);
        console.log(e)
    }

})

// like property
app.post('/like-property', authenticateToken, async (req, res) => {
    const { propertyId, liked } = req.body;
    try {
      const property = await PropertyDetails.findById(propertyId);
      if (liked) {
        property.likes += 1;
      } else {
        property.likes -= 1;
      }
      await property.save();
      res.status(200).json({ likes: property.likes });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update likes' });
    }
  });

app.listen(port, ()=>{
    console.log(`server is running at port number - ${port}`);
})