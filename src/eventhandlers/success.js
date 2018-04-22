const config = require('../config.js');
const logger = require('thumb-logger').getLogger('WorkerLog');

exports.onSuccess = function(job){
  const jobName = job.attrs.name;
  const jobId = job.attrs._id.toString();
  const message = '{JobId: "' + jobId + '", jobName: "' + jobName + '", message: "Completed successfully!"}';
  logger.info(message);
}
