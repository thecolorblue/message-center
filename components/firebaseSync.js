var admin = require('firebase-admin');
var outgoing = require('./outgoing.js');
var serviceAccount = require("../firebase_auth.json");

var serverStartTime = Math.floor(new Date() / 1);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pm-message-center.firebaseio.com"
});

var postsRef = admin.database().ref('/posts');
// Save the date at which we last tried to send a notification
function updateNotification(uid, postId){
  var update = {};
  update['/posts/' + postId + '/lastNotificationTimestamp'] =
    admin.database.ServerValue.TIMESTAMP;
  update['/user-posts/' + uid + '/' + postId + '/lastNotificationTimestamp'] =
    admin.database.ServerValue.TIMESTAMP;
  admin.database().ref().update(update);
}

/**
 * Send a new star notification email to the user with the given UID.
 */
// [START single_value_read]
function sendNotificationToUser(uid, postId) {
  // Fetch the user's email.
  var userRef = admin.database().ref('/users/' + uid);
  userRef.once('value').then(function(snapshot) {
    var email = snapshot.val().email;
    var postRef = admin.database().ref('/posts/' + postId);
    postRef.once('value').then(function(thepost) {
      if(!thepost.val().lastNotificationTimestamp || thepost.val().lastNotificationTimestamp>serverStartTime){ // Stop notifications for old stars
        // Send the email to the user.
        if (email) {
          outgoing.sendNotificationEmail(email).then(function() {
            updateNotification(uid, postId);
          }, function(reason) { // Email send failure
            console.log(reason); // Error
        });
        }
      } else {
        updateNotification(uid, postId);
      }
    });
  }).catch(function(error) {
    console.log('Failed to send notification to user:', error);
  });
}
// [END single_value_read]


/**
 * Update the star count.
 */
// [START post_stars_transaction]
function updateStarCount(postRef) {
  postRef.transaction(function(post) {
    if (post) {
      post.starCount = post.stars ? Object.keys(post.stars).length : 0;
    }
    return post;
  });
}
// [END post_stars_transaction]

/**
 * Keep the likes count updated and send email notifications for new likes.
 */
function startListeners() {
  console.log('listen for changes');
  postsRef.on('child_added', function(postSnapshot, prevChildKey) {
    var postReference = postSnapshot.ref;
    var post = postSnapshot.val();
    var postId = postSnapshot.key;
    if (post.sent === true && post.confirmed === false) {
      outgoing.sendMail(post.to, post.from, post.subject, post.text)
        .then(function(response) {
        console.log('message sent: ', response);
        postReference.set(Object.assign(post, { confirmed: true }));
      });
    }
  });
}

module.exports = {
  startListeners: startListeners
}
