const CronJob = require('cron').CronJob;
const moment = require('moment');
const { sendMessage } = require('./send_sms');

/* two ways to do this:
  1) when a watering schedule is created, schedule a job for each watering time
  2) check the server every minute to see if there is a watering in the next hour.
    if there is, send a notification.
  
  The first approach seems simpler to me right now. So we need to add:
  1) when a watering time is added, schedule a reminder if notifications is TRUE
  2) when a watering time is deleted, deleted the reminder

  We'll need to reformat the date, either here (probably) or before the function is called.
*/

/* takes in an object shaped like so: {
  username: 'justin',
  plant: 'bonsai',
  phone: '+19874327894',
  watering_time: 2038-02-05T05:00:00.000Z
}
  */
module.exports = {
  notifier: notification => {
    console.log('nofier', notification);

    // will also need a phone number to pass to send_sms
    // function takes in a date and schedules a new Cronjob
    const reminderTime = notification.watering_time; // redundant? do i need to convert to a date?
    console.log(`reminderTime is ${reminderTime}`);

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
