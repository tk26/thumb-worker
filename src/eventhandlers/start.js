const config = require('../config.js');
const logger = require('thumb-logger').getLogger('WorkerLog');

exports.onStart = function(job){
  const jobName = job.attrs.name;
  const jobId = job.attrs._id.toString();
  const message = 'JobId: ' + jobId + ' with jobName: ' + jobName + ' started...';
  logger.info(message);
}
