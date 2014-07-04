var express = require('express');
var DataStore = require("nedb");
var db = new DataStore({filename: "./radar.db", autoload: true});

var app = express();

app.configure(function () {
  app.use(defaultContentTypeMiddleware);
  app.use(express.bodyParser());
  app.use(express.logger('dev'));
  app.use(logErrors);
  app.use(express.static(__dirname + '/public'));
});

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function defaultContentTypeMiddleware(req, res, next) {
  if (req.method == 'POST' || req.method == "PUT") {
    req.headers['content-type'] = 'application/json';
  }
  next();
}


var updateItem = function(req, res) {
  if (!req.body._id) {
    return newItem(req, res);
  }
  db.update({ _id: req.body._id }, req.body, function(err, updatedDoc) {
    if (err) {
      console.log("Error happened.");
      console.log(err);
      res.send(err);
    } else {
      console.log("Document updated.");
      console.log(updatedDoc);
      res.send({id: updatedDoc._id});
    }
  });
};

var queryItem = function(req, res) {
  db.find(req.body, function(err, docs) {
    if (err) {
      console.log("Error happened.");
      console.log(err);
      res.send(err);
    } else {
      console.log("Document(s) updated.");
      console.log(docs);
      res.send(docs);
    }
  });
};

var allItems = function(req, res) {
  db.find({}, function(err, docs) {
    if (err) {
      console.log("Error happened.");
      console.log(err);
      res.send(err);
    } else {
      console.log("Document(s) retrieved.");
      console.log(docs);
      res.send(docs);
    }
  });
};

var newItem = function(req, res) {
  console.log("Body is " + JSON.stringify(req.body));
  db.insert(req.body, function(err, newDoc) {
    if (err) {
      console.log("Error happened.");
      console.log(err);
      res.send(err);
    } else {
      console.log("Document created.");
      console.log(newDoc);
      res.send({id: newDoc._id});
    }
  });
};

var deleteItem = function(req, res) {
  console.log("Body is " + JSON.stringify(req.body));
  db.remove(req.body, function(err, numRemoved) {
    if (err) {
      console.log("Error happened.");
      console.log(err);
      res.send(err);
    } else {
      console.log("Document(s) deleted.");
      console.log(numRemoved);
      res.send({});
    }
  });
};

app.post('/item/delete', deleteItem);
app.post('/item/new', newItem);
app.post('/item/update', updateItem);
app.post('/item/query', queryItem);
app.get('/item/all', allItems);
app.get('/kill', function (req, res) {
  res.send("Stopping Radar Server");
  process.exit(0);
});

app.listen(8882);
console.log('Radar Server listening on port 8882...');

