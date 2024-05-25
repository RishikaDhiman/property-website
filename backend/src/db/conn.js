const mongoose = require("mongoose");
// mongodb://localhost:27017/RealEstate
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("connection successfull");
}).catch((e)=>{
    console.log("Error in mognoose",e);
})