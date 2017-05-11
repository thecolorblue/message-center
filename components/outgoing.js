var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

/**
 * Send the new star notification email to the given email.
 */
function sendNotificationEmail(address) {
  var mailOptions = {
    from: '"Firebase Database Quickstart" <noreply@firebase.com>',
    to: address,
    subject: 'New star!',
    text: 'One of your posts has received a new star!'
  };
  // return transport.sendMail(mailOptions).then(function() {
  //   console.log('New star email notification sent to: ' + address);
  // });
}

function sendMail (to, from, subject, text) {
  return sg.API(sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
      personalizations: [
        {
          to: [
            {
              email: to
            }
          ],
          subject: subject
        }
      ],
      from: {
        email: from
      },
      content: [
        {
          type: 'text/plain',
          value: text
        }
      ]
    }
  }));
}

module.exports = {
  sendNotificationEmail: sendNotificationEmail,
  sendMail: sendMail
};