const config = require('../config.js');
const logger = require('thumb-logger').getLogger('WorkerLog');

exports.onFailure = function(err, job){
  const jobName = job.attrs.name;
  const jobId = job.attrs._id.toString();
  const errorMessage = '{JobId: ' + jobId + ', jobName: ' + jobName + ', message: ' + err + '}';
  logger.error(errorMessage);
}
