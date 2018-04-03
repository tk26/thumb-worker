const Agenda = require('agenda');
const MongoClient = require('mongodb');
const config = require('./config.js');
const jobTypes = require('./jobs/jobtypes.js');

const getAgenda = async function(){
  const db = await MongoClient.connect(config.WORKER_DATABASE);
  return new Agenda().mongo(db, config.JOBS_TABLE);
}

const validateJobType = function(jobType){
  if (!jobTypes.registeredJobs.includes(jobType)){
    throw "Requested job type isn't registered.";
  }
}

exports.scheduleNow = async function(jobType, data) {
  validateJobType(jobType);
  let agenda = await getAgenda();
  agenda.now(jobType, data);
};

exports.schedule = async function(when, jobType, data) {
  validateJobType(jobType);
  let agenda = await getAgenda();
  agenda.schedule(when, jobType, data);
};
