const CronJob = require('cron').CronJob;
const moment = require('moment');
const { sendMessage } = require('./send_sms');

/* takes in an object shaped like so: {
  username: 'justin',
  plant: 'bonsai',
  phone: '+19874327894',
  watering_time: 2038-02-05T05:00:00.000Z
}
  */
module.exports = {
  notifier: notification => {
    const reminderTime = notification.watering_time;
    // ensure date is not in the past
    if (reminderTime >= new Date()) {
      const notify = new CronJob(
        reminderTime,
        () => sendMessage(notification),
        null,
        true,
        'America/New_York'
      );
    } else {
      console.log(
        `reminder time (${reminderTime}) has already past and will not be set`
      );
    }
  }
};
