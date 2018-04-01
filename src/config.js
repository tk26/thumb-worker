function config(){
  const APP_NAME = 'Thumb Worker';
  switch(process.env.NODE_ENV){
      case 'dev':
          return {
            'ETHEREAL_CREDENTIALS': {'user': 'qfc6epmx43mulopu@ethereal.email', 'password': 'Tn99WBwt2UahFxvSs1'},
            'DATABASE': 'mongodb://localhost/thumb',
            'WORKER_DATABASE': 'mongodb://localhost/worker',
            'JOBS_TABLE': 'jobs'
          };

      case 'test':
          return {
            'ETHEREAL_CREDENTIALS': {'user': 'qfc6epmx43mulopu@ethereal.email', 'password': 'Tn99WBwt2UahFxvSs1'},
            'DATABASE': 'mongodb://localhost/thumb_test',
            'WORKER_DATABASE': 'mongodb://localhost/worker_test',
            'JOBS_TABLE': 'jobs'
          };

      case 'prod':
          var DB_USER = process.env.DB_USER;
          var DB_PASSWORD = process.env.DB_PASSWORD;

          return {
              'SENDGRID_API_KEY': process.env.SENDGRID_API_KEY,
              'DATABASE': 'mongodb://'+DB_USER+':'+DB_PASSWORD+'@ds151207.mlab.com:51207/thumb',
              'WORKER_DATABASE': 'mongodb://'+DB_USER+':'+DB_PASSWORD+'@ds151207.mlab.com:51207/worker',
              'JOBS_TABLE': 'jobs'
            };

      default:
          throw "Invalid configuration choice. NODE_ENV include ('dev', 'test', 'prod')";
  }
}

// Export for use in init_api
module.exports = config()
