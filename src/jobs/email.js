const EmailClient = require('../utilities/mailer.js');

exports.welcomeEmail = async function(job){
  let welcomeEmailBody = '<p><b>thumb is more than just a ride.</b></p>';
  welcomeEmailBody = welcomeEmailBody + '<p>Start a trip as a rider or driver, or browse and see where your friends are ';
  welcomeEmailBody = welcomeEmailBody + 'before they go.  thumb is where your past travel becomes concrete and your future ';
  welcomeEmailBody = welcomeEmailBody + 'travel becomes attainable.</p>';

  const subject = 'Welcome to thumb ' + job.attrs.data.firstName + '!';
  const mailOptions = {
    from: 'welcome@thumbtravel.com',
    to: job.attrs.data.emailAddress,
    subject: subject,
    html: welcomeEmailBody
  };
  return await EmailClient.mailer.sendMail(mailOptions);
}
