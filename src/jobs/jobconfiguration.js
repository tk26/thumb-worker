const JobTypes = require('./jobtypes.js');
const EmailProcessor = require('./emailProcessor.js');
const PushNotificationProcessor = require('./pushNotificationProcessor.js');
const Success = require('../eventhandlers/success.js');
const Failure = require('../eventhandlers/failure.js');
const Start = require('../eventhandlers/start.js');

exports.defineJobs = function(agenda){
  agenda.define(JobTypes.PUSH_NOTIFICATION_PROCESSOR, PushNotificationProcessor.run);
  agenda.define(JobTypes.EMAIL_MESSAGE_PROCESSOR, EmailProcessor.run);
}

exports.setEvents = function(agenda){
  agenda.on('start', Start.onStart);
  agenda.on('success', Success.onSuccess);
  agenda.on('failure', Failure.onFailure);
}
