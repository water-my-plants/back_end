require('dotenv').config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports = {
  sendMessage: notification => {
    client.messages
      .create({
        body: `Hi, ${notification.username}! Your ${
          notification.plant
        } is due for watering!`,
        from: process.env.TW_PHONE,
        to: notification.phone
      })
      .then(message => console.log(message))
      .catch(err => console.log('caught!', err))
      .done();
  }
};

// check notifications table every minute
// if there is a notification that minute, send out sms and delete notification from table
