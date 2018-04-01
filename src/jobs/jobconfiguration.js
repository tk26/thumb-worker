const JobTypes = require('./jobtypes.js');
const Email = require('./email.js');
const Success = require('../eventhandlers/success.js');
const Failure = require('../eventhandlers/failure.js');

exports.defineJobs = function(agenda){
    agenda.define(JobTypes.WELCOME_EMAIL, Email.welcomeEmail);
}

exports.setEvents = function(agenda){
    agenda.on('success', Success.onSuccess);
    agenda.on('failure', Failure.onFailure);
}

exports.scheduleRecurringJobs = function(agenda){

}
