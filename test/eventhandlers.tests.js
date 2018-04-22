let chai = require('chai');
let should = chai.should();
let sinon = require('sinon');
let logger = require('thumb-logger').getLogger('WorkerLog');

describe('Event Handlers', () => {
  let successHandler;
  let errorHandler;
  let startHandler;

  let job = {
    attrs: {
      name: "test",
      _id: {
        toString: function(){
          return '123';
        }
      }
    }
  }

  before(() => {
    sinon.stub(logger, 'info');
    sinon.stub(logger, 'error');
    successHandler = require('../src/eventhandlers/success.js');
    errorHandler = require('../src/eventhandlers/failure.js');
    startHandler = require('../src/eventhandlers/start.js');
  });

  after(() => {
    logger.info.restore();
    logger.error.restore();
  });

  afterEach(() => {
    logger.info.resetHistory();
    logger.error.resetHistory();
  });

  describe('On Success', () => {
    it('should log success event', () => {
      successHandler.onSuccess(job);
      sinon.assert.called(logger.info);
      sinon.assert.calledWithMatch(logger.info,'{JobId: "' + job.attrs._id.toString() + '", jobName: "' + job.attrs.name + '", message: "Completed successfully!"}');
    });
  });

  describe('On Failure', () => {
    it('should log failure event', () => {
      const testError = 'test error';
      errorHandler.onFailure('test error', job);
      sinon.assert.called(logger.error);
      sinon.assert.calledWithMatch(logger.error,'{JobId: ' + job.attrs._id.toString() + ', jobName: ' + job.attrs.name + ', message: ' + testError + '}');
    });
  });

  describe('On Start', () => {
    it('should log start event', () => {
      startHandler.onStart(job);
      sinon.assert.called(logger.info);
      sinon.assert.calledWithMatch(logger.info,'{JobId: "' + job.attrs._id.toString() + '", jobName: "' + job.attrs.name + '", message: "started..."}');
    });
  });
});
