const accountSid = 'ACfc3768248eb5f3d4f50189870ca23e55';
const authToken = '3a65422556a96a857a9d80e009a6122e';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'Your plant is in need of watering!',
    from: '+17745411025',
    to: '+15083970183'
  })
  .then(message => console.log(message))
  .done();
