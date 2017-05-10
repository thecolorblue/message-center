var admin = require('firebase-admin');

function writeNewPost(data) {
  // Get a key for a new Post.
  var newPostKey = admin.database().ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {
    received_at: Date()
  };
  updates['/posts/' + newPostKey] = data;
  // updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return admin.database().ref().update(updates);
}


module.exports = {
  writeNewPost: writeNewPost,
};