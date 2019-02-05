require('dotenv').config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'Your plant is in need of watering!',
    from: '+17745411025',
    to: '+15083970183'
  })
  .then(message => console.log(message))
  .done();
