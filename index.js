const { notifier } = require('./twilio/cron');
const server = require('./api/server');

const port = process.env.PORT || 5000;

notifier('2019-02-06T11:58'); // just testing

server.listen(port, () => {
  console.log(`server up on ${port}`);
});
