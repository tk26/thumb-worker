const Agenda = require('agenda');
const MongoClient = require('mongodb');
const JobConfiguration = require('./jobs/jobconfiguration.js');
const JobTypes = require('./jobs/jobtypes.js');
const config = require('./config.js');
const scheduler = require('./scheduler.js');
const logger = require('thumb-logger').getLogger('WorkerLog');

async function run() {
    logger.info('Starting worker...');
    const db = await MongoClient.connect(config.WORKER_DATABASE);
    const agenda = new Agenda().mongo(db, config.JOBS_TABLE);

    //Configure jobs
    JobConfiguration.defineJobs(agenda);
    JobConfiguration.setEvents(agenda);
    //process jobs every second
    agenda.every('1 minutes', JobTypes.EMAIL_MESSAGE_PROCESSOR);
    agenda.every('1 minutes', JobTypes.PUSH_NOTIFICATION_PROCESSOR);

    //ensure process shuts down gracefully
    function graceful() {
        agenda.stop(function() {
            logger.info('Stopping worker...');
            process.exit(0);
        });
    }
    process.on('SIGTERM', graceful);
    process.on('SIGINT' , graceful);


    // Wait for agenda to connect. Should never fail since connection failures
    // should happen in the `await MongoClient.connect()` call.
    await new Promise(resolve => agenda.once('ready', resolve));

    // `start()` is how you tell agenda to start processing jobs.
    agenda.start();
}

run().catch((err) => {
    logger.error(err);
});
