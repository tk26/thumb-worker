let chai = require('chai');
let should = chai.should();
const scheduler = require('../src/scheduler.js');
const exceptions = require('../src/utilities/exceptions.js');
const jobTypes = require('../src/jobs/jobtypes.js');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const welcomeEmailData = {emailAddress: "test@test.com", firstName: "Testing"};

describe('Scheduler', () => {
  describe('scheduleJobNow', () => {
    it('it should throw exception when called with unregistered job', () => {
      let promise = scheduler.scheduleJobNow("Unregistered Job");
      return promise.should.be.rejectedWith(exceptions.UNREGISTERED_JOB);
    });

    it('it should successfully schedule job now when provided valid job type', async() => {
      try{
        let job = await scheduler.scheduleJobNow(jobTypes.WELCOME_EMAIL, welcomeEmailData);
        job.attrs.name.should.equal(jobTypes.WELCOME_EMAIL);
      } catch (error){
        throw error;
      }
    });
  });

  describe('scheduleJob', () => {
    it('it should throw exception when called with unregistered job', () => {
      let promise = scheduler.scheduleJob(new Date().getDate(), "Unregistered Job");
      return promise.should.be.rejectedWith(exceptions.UNREGISTERED_JOB);
    });

    it('it should successfully schedule job at specified date when provided date and valid job type', async() => {
      let scheduledTime = new Date().getDate();
      try {
        let job = await scheduler.scheduleJob(scheduledTime, jobTypes.WELCOME_EMAIL, welcomeEmailData);
        job.attrs.name.should.equal(jobTypes.WELCOME_EMAIL);
      } catch (error){
        throw error;
      }
    });
  });
});
