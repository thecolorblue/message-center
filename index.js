/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var admin = require('firebase-admin');
var express = require('express');
var multer  = require('multer');
var browserify = require('browserify-middleware');
var bodyParser = require('body-parser');

var incoming = require('./components/incoming.js');
var outgoing = require('./components/outgoing.js');
var sync = require('./components/firebaseSync.js');

var upload = multer({ dest: './uploads/' });

var app = express();


// Set our simple Express server to serve up our front-end files
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

//provide browserified versions of all the files in the script directory
app.use('/scripts', browserify(__dirname + '/src', {
  transform: [[ "babelify", { presets: [ "es2015", "react" ] } ]]
}));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

app.post("/webhook/message/incoming", upload.array('attachments', 12), function(req, res) {
  incoming.writeNewPost(req.body).then(function(response) {
    res.send(200);
  })
  .catch(function(err) {
    console.error(err);
    res.send(500, err);
  })
});

app.post("/posts", bodyParser.json(), function(req, res) {
  
  var postData = {
    author: req.body.author,
    uid: req.body.uid,
    to: req.body.to,
    from: 'support@ploughmens.com',
    text: req.body.text,
    received_at: Date(),
    subject: req.body.subject,
    sent: true,
    confirmed: false,
    authorPic: req.body.authorPic
  };

  // Get a key for a new Post.
  var newPostKey = admin.database().ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  // updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  admin.database().ref().update(updates)
    // .then((updateResponse)=> {
    //   console.log('update response: ', updateResponse);
    //   return outgoing.sendMail(req.body.to, req.body.from, req.body.subject, req.body.text)
    // })
    .then(function() {
      console.log('message sent');
      // postReference.set({ confirmed: true });
      res.end(200);
    });

})


// Start the Firebase server
sync.startListeners();

// Listen for HTTP requests
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});