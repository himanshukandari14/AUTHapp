const mongoose = require('mongoose');
require('dotenv').config();

 const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((error) => {
        console.error("Error in connection to db", error);
        process.exit(1);
    });
}
module.exports  = dbConnect;