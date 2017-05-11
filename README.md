# Message Center (the name is a work in progress)

Simple to use web mail client. Currently, the stack looks like:

- sendgrid
- firebase
- google auth
- message center

The goals of this project is:

- handle all emails for a domain
- allow anyone to read and respond to emails
- organize emails by subject and senders + receivers
- create a platform for adding more features

## Getting started

Create a `.env` file that has these keys:

- SENDGRID_API_KEY
- FIREBASE_URL

Get your `.json` auth file from firebase, put it in the root folder of this project, and name it `firebase_auth.json`.

`npm install && node index.js`
