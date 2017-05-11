var admin = require('firebase-admin');

function writeNewPost(data) {
  // Get a key for a new Post.
  var newPostKey = admin.database().ref().child('posts').push().key;
  var envelope = JSON.parse(data.envelope);
  var group = envelope.to.push(envelope.from);

  // sort alphabetically
  group.sort(function(a, b) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  });

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {
    received_at: Date()
  };
  
  updates['/posts/' + newPostKey] = data;
  updates['/messages/' + encodeURIComponent(data.subject) + '/' + encodeURIComponent(group.join('+'))] = data;

  return admin.database().ref().update(updates);
}


module.exports = {
  writeNewPost: writeNewPost,
};
