'use strict';
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs');
var name;
var arr;
var recentarr;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function(req,res){
  var html = fs.readFileSync('./index.html').toString();
  res.send(html);
 });

//I don't use this get method but it's here for the mvp. It's literally useless.

// app.get('/tasks', function(req,res){
//   fs.readFile('./tasks.json', function(err, data) {
//   if (err) throw err;
//   recentarr = JSON.parse(data);
//   res.send(recentarr+'');
// });
// });

app.post('/tasks', function(req,res){
  fs.readFile('./tasks.json', function(err, data) {
        if (err) throw err;
        arr = JSON.parse(data);
        console.log(req.body.remindex);
        if(!req.body.remindex){
        arr[0].push(req.body.task);
        arr[1].push(req.body.due);
        fs.writeFile('./tasks.json', JSON.stringify(arr), function(err) {
          if (err) throw err;
        });
        console.log('arr : ',arr)
        res.send(arr);
      }
      else{
        arr[0].splice(req.body.remindex,1,'removed');
        arr[1].splice(req.body.remindex,1,'removed');
        fs.writeFile('./tasks.json', JSON.stringify(arr), function(err) {
          if (err) throw err;
        });
        res.send('bravo son!')
      }
      });
});

app.listen(4000, function(){
  console.log('express server listenin on 4000');
});
