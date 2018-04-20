const Agenda = require('agenda');
const MongoClient = require('mongodb');
const JobConfiguration = require('./jobs/jobconfiguration.js');
const JobTypes = require('./jobs/jobtypes.js');
const config = require('./config.js');
const scheduler = require('./scheduler.js');

async function run() {
    console.log('Starting worker...');
    const db = await MongoClient.connect(config.WORKER_DATABASE);
    const agenda = new Agenda().mongo(db, config.JOBS_TABLE);

    //process jobs every second
    agenda.processEvery(1000);

    //ensure process shuts down gracefully
    function graceful() {
        agenda.stop(function() {
            process.exit(0);
        });
    }
    process.on('SIGTERM', graceful);
    process.on('SIGINT' , graceful);

    //Configure jobs
    JobConfiguration.defineJobs(agenda);
    JobConfiguration.setEvents(agenda);
    JobConfiguration.scheduleRecurringJobs(agenda);

    // Wait for agenda to connect. Should never fail since connection failures
    // should happen in the `await MongoClient.connect()` call.
    await new Promise(resolve => agenda.once('ready', resolve));

    // `start()` is how you tell agenda to start processing jobs.
    agenda.start();
}

run().catch((err) => {
    console.log(err);
    process.exit(-1);
});
