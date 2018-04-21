let chai = require('chai').should();
const jobTypes = require('../../src/jobs/jobtypes.js');

const mockery = require('mockery');
const nodemailerMock = require('nodemailer-mock');

let emailJobs;

describe('Email-Jobs', () => {
  before(() => {
    mockery.enable({
      warnOnUnregistered: false,
    });
    mockery.registerMock('nodemailer', nodemailerMock);
    emailJobs = require('../../src/jobs/email.js');
  });

  afterEach(function() {
    // Reset the mock back to the defaults after each test
    nodemailerMock.mock.reset();
  });

  after(function() {
    // Remove our mocked nodemailer and disable mockery
    mockery.deregisterAll();
    mockery.disable();
  });

  describe('Welcome Email', () => {
    it('it should send email to the correct user', async () => {
      const welcomeEmailAddress = 'welcomeEmail@thumb-test.com';
      const firstName = 'Welcome';
      const job = {
        'attrs': {
          'name': jobTypes.WELCOME_EMAIL,
          'data': {
            'emailAddress': welcomeEmailAddress,
            'firstName': firstName
          }
        }
      };
      let emailContent;
      let sentMail;
      try {
        await emailJobs.welcomeEmail(job);
        sentMail = nodemailerMock.mock.sentMail();
        emailContent = sentMail[0];
      }
      catch(err){
        throw err;
      }
      emailContent.to.should.equal(welcomeEmailAddress);
      emailContent.from.should.equal('welcome@thumbtravel.com');
      emailContent.subject.should.equal('Welcome to thumb ' + firstName + '!');
    });
  });
});
