const mongoose = require('mongoose');
const express = require('express')
const mysql = require('mysql');
const fs = require('fs');

const db = mongoose.connection;
mongoose.connect("mongodb://localhost:27017/ward", { useNewUrlParser: true });

//check db connection
db.once('open', function(){
    console.log('Connected to MongoDB');
})
    
//check for db errors
db.on('error', function(err){
    console.log(err);
})

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

const collectionName = db.collection('hbt');
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
    const parsedData = JSON.parse(JSON.stringify(results));
    const propCount = Object.keys(results).length;

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