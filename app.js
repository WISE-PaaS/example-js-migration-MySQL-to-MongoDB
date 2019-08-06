const mongoose = require('mongoose');
const express = require('express')
const mysql = require('mysql');
const fs = require('fs');

const dbName = 'mongodb://b5e5398f-f1cb-4c6d-9ec2-23407a72647e:9Zz3AZDvpzkc3C7iev0WliKAT@40.83.78.152:27017/401612f6-2c0f-4596-b446-a242dda9e16c'
mongoose.connect(dbName, { useNewUrlParser: true })
   .then(() => console.log('Connected to the MongoDB...'))
   .catch(err => console.log('Could not connect to MongoDB...', err));

const db = mongoose.connection;
// mongoose.connect("mongodb://localhost:27017/world", { useNewUrlParser: true });

    
// //check db connection
// db.once('open', function(){
//     console.log('Connected to MongoDB');
// })
    
// //check for db errors
// db.on('error', function(err){
//     console.log(err);
// })

const collectionName = db.collection('hbt');

//create connection to local MySQL DB
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '@Dvantechp275',
  database : 'ward'
});

connection.connect(function(err) {
    if (!err) {
      console.log('Connected to the MySQL...');
      return;
    }
});

// init app
const app = express();

app.get('/', function(req,res){
    res.sendStatus(200);
})

////If you wish to reconstruct your schema you may set up your own schema
// const hbtSchema = new mongoose.Schema({
//     patient: String,
//     heartbeat: Number,
//     ts: Date,
// });

////Remember to use the schema you set if you had set one
//const hbtData = mongoose.model('hbt', hbtSchema);

//set an api route to check if DB has data
app.get('/hbt', function(req,res){
    hbtData.find({}, function(err,hbts){
        if(err){
          console.log(err);
        }
        else{
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.send({ heartbeats: hbts });
        }
    })
})

const fileName = 'test.json';
//Query MySQL DB
connection.query('select * from `heartbeat`', function(err,results,fields){
    if(err){throw err;}
    //export the file, this part not neccessary/////////////////////
    fs.writeFile(fileName,JSON.stringify(results), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    ////////////////////////////////////////////////////////////////
    console.log(results);
    const parsedData = JSON.parse(JSON.stringify(results));
    const propCount = Object.keys(results).length;

    // //get the entries with a for loop and save
    // for(var i=0;i<propCount;i++){
    //     ////If you use your own schema, remember to parse your data into your schema then save
    //     // var newHbt = new hbtData({
    //     //     patient: parsedData[i].patient,
    //     //     heartbeat: parsedData[i].heartbeat,
    //     //     ts: parsedData[i].ts
    //     // });
    //     // newHbt.save(function(err){
    //     //     if(err){console.log(err);}
    //     // }); 
        
    //     parsedData[i].ts = new Date(parsedData[i].ts);
    //     collectionName.insertOne(parsedData[i],function(err){
    //         if(err){console.log(err);}
    //     });
    // }
    for(var i=0;i<propCount;i++){
        parsedData[i].ts = new Date(parsedData[i].ts);
    };
    collectionName.insertMany(parsedData,function(err){
        if(err){console.log(err);}
    });
    console.log('Done!');
})

const port = process.env.PORT || 3030;

app.listen(port, function() {
    console.log(`Listening on port ${port}...`);
});