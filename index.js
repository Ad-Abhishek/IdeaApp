const express = require('express');
const serverConfig = require('./configs/server.config');
const mongoose = require('mongoose');
const dbConfig = require('./configs/db.config');
const userModel = require('./models/user.model');

const app = express();

// Logic to connect to MongoDB and create an ADMIN user 
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;



db.on("error", () => {
    console.log('error while connecting to DB');
})

db.once("open", () => {
    console.log('database is connected');

    init();

})

const init = async() => {

    let admin = await userModel.findOne({
        userId : "admin"
    });

    if(admin) {
        console.log('admin user already present');
        return;
    };

    admin = await userModel.create({
        name: "Abhishek Adhikari",
        userId: "admin",
        email: "admin@email.com",
        userType: "ADMIN",
        password: "12345"
    });

    console.log(admin);
}


app.listen(serverConfig.PORT, () => {
    console.log(`server started on port ${serverConfig.PORT}`)
});