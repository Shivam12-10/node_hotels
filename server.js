// // console.log('Im gonna be best developer');

// // function add (a,b){
// // }

// // var add = function(a,b){
// //     return a+b;
// // }

// // var add = (a,b) => {return(a+b)};
// // var add = (a,b) => a+b;
// // var result = add (2,7);
// // console.log(result);
// // (function(){
// //     console.log('shivam is added');
// // })();

// /* function callback(){

//     // console.log('shivam is calling a callback function');
//     console.log('now adding is completely successful');
// }
// const add = function(a,b,callback){
//     var result = a+b;
//     console.log('result :' +result ); //main function works completely
//     callback();
// }

// add(3,4,callback); */

// // const add = function(a,b,shivam){
// //     var add = a+b;
// //     console.log('result :' +add ); //main function works completely
// //     shivam();
// // }
// // add(2,5,function(){
// //     console.log('add successfully');
// // });
// // add(2,5,()=>
// //         console.log('add successfully')
// //     );


// // var fs = require ('fs');
// // var os = require('os');
// // var user = os.userInfo();
// // console.log(user.username);

// // fs.appendFile('greetings.txt','Hi'+ user.username + '!\n',()=>{console.log('file is created')});

// // console.log(os);

// // const notes = require('./notes.js');
// // console.log('server file is available');

// // var age = notes.age;
// // console.log(age);
// // var result = notes.addnumber(age+18,10);
// // console.log('result is now'+result);


// // var _ = require('lodash');
// // var data = ["person","person",1,2,1,2,'name','age','2'];
// // var filter = _.uniq(data);
// // console.log(filter);
// // console.log(_.isString('shivam'));

// /*---------------------LECTURE 03-------------------------*/

// // const jsonString = '{"name": "John", "age": 30, "city": "New York"}';
// // const jsonObject = JSON.parse(jsonString); 
// // console.log(jsonObject.name);

// // const objectToConvert = { name: "Alice", age: 25 };
// //  const jsonStringified = JSON.stringify(objectToConvert); 
// //  console.log(jsonStringified);

// //  console.log(typeof jsonStringified);

// const express = require('express')
// const app = express()

// app.get('/', function (req, res) {
//   res.send('Hello This is My World')
// })

// app.get('/paneer', function (req, res) {
//     res.send('Sure sir, I would love to serve paneer')
//   })

//   app.get('/idli', function (req, res)  {
//     var custom_idli = {
//         name : 'rawa idli',
//         size : 'medium',
//         is_sambhar : false,
//         is_chutney : true

//     }
//     res.send(custom_idli)
//     // res.send('Sure sir, I would love to serve Idli with chutney')
//   })

//   app.post('/items',(req,res)=>{res.send('data is saved');})
// app.listen(3000, () => {
//     console.log('lisening on port 3000');
// })

//--------------------------Lecture 05------------------------------//

const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body me bejh dega


const MenuItem = require('./models/MenuItem');

app.get('/', function (req, res) {
    res.send('Hello This is My Hotel')
  });
  
 
  //[post of menu]

  app.post('/postmenu',async (req,res) =>{
     
    try{
      const data  = req.body //Assuming the request body contains person data
    //create a new person document using the mongoose model
    const newMenu = new MenuItem(data);

    //save new person from the database
    //save functuon callback return krta hai

    const savedMenu = await newMenu.save();
    console.log('data saved');
    res.status(200).json(savedMenu);

    }
  
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});

  }
  } );
  
  //parameterised api call

  app.get('/menu', function (req, res) {
    res.send('Hello This is My  Hotel Menu ')
  });

  // Import the router files
const personRoutes = require('./routes/personRoutes');

// Use the routers
app.use('/person', personRoutes);
  
//comment added
  app.listen(3000, () => {
         console.log('lisening on port 3000');
    });
