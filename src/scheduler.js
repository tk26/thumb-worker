const Agenda = require('agenda');
const MongoClient = require('mongodb');
const config = require('./config.js');
const jobTypes = require('./jobs/jobtypes.js');
const exceptions = require('./utilities/exceptions.js');

const getAgenda = async function(){
  const db = await MongoClient.connect(config.WORKER_DATABASE);
  return new Agenda().mongo(db, config.JOBS_TABLE);
}

const validateJobType = function(jobType){
  if (!jobTypes.registeredJobs.includes(jobType)){
    throw exceptions.UNREGISTERED_JOB;
  }
}

exports.scheduleJobNow = async function(jobType, data) {
  validateJobType(jobType);
  let agenda = await getAgenda();
  return agenda.now(jobType, data);
};

exports.scheduleJob = async function(when, jobType, data) {
  validateJobType(jobType);
  let agenda = await getAgenda();
  return agenda.schedule(when, jobType, data);
};
