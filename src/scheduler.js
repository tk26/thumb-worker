const Agenda = require('agenda');
const MongoClient = require('mongodb');
const config = require('./config.js');

exports.getScheduler = async function(){
    const db = await MongoClient.connect(config.WORKER_DATABASE);
    let scheduler = new Agenda().mongo(db, config.JOBS_TABLE);
    return scheduler;
}
