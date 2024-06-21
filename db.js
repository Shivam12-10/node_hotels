const  mongoose =require ('mongoose');

//definition of MogoDb Connection URL
    
const mongoURL ='mongodb://localhost:27017/mydatabase'  //replace mydatabas with your db name

//set updb conection
mongoose.connect(mongoURL,{
    useNewUrlParser : true, useUnifiedTopology : true
})

//get a default connnection
//Mongoose maintain a default connection onject representing into Mongodb connection

const db = mongoose.connection;

//define event listener for db connection

db.on('connected', () => {
    console.log('Connected to MongoDB Server');
});

db.on('error', (err) => {
    console.error('Connection of MongoDB error', err);
});

db.on('disconnected', () => {
    console.log('DisConnected to MongoDB Server');
});

//Export the db connnection on server
module.exports = db;  


