function config(){
  const APP_NAME = 'Worker';
  switch(process.env.NODE_ENV){
      case 'dev':
          return {
            'ETHEREAL_CREDENTIALS': {'user': 'qfc6epmx43mulopu@ethereal.email', 'password': 'Tn99WBwt2UahFxvSs1'},
            'DATABASE': 'mongodb://localhost/thumb',
            'WORKER_DATABASE': 'mongodb://localhost/worker',
            'LOGGER_DATABASE': 'mongodb://localhost/worker',
            'JOBS_TABLE': 'jobs',
            'LOG_LEVEL': 'info',
            'APP_NAME': APP_NAME
          };

      case 'test':
          return {
            'ETHEREAL_CREDENTIALS': {'user': 'qfc6epmx43mulopu@ethereal.email', 'password': 'Tn99WBwt2UahFxvSs1'},
            'DATABASE': 'mongodb://localhost/thumb_test',
            'WORKER_DATABASE': 'mongodb://localhost/worker_test',
            'LOGGER_DATABASE': 'mongodb://localhost/worker_test',
            'JOBS_TABLE': 'jobs',
            'LOG_LEVEL': 'info',
            'APP_NAME': APP_NAME
          };

      case 'prod':
          var DB_USER = process.env.DB_USER;
          var DB_PASSWORD = process.env.DB_PASSWORD;

          return {
              'SENDGRID_API_KEY': process.env.SENDGRID_API_KEY,
              'DATABASE': 'mongodb://'+DB_USER+':'+DB_PASSWORD+'@ds151207.mlab.com:51207/thumb',
              'WORKER_DATABASE': 'mongodb://'+DB_USER+':'+DB_PASSWORD+'@ds231245.mlab.com:31245/thumb-worker',
              'JOBS_TABLE': 'jobs',
              'LOG_LEVEL': 'info',
              'APP_NAME': APP_NAME
            };

      default:
          throw "Invalid configuration choice. NODE_ENV include ('dev', 'test', 'prod')";
  }
}

module.exports = config()
