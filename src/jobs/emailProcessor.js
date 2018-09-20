const { MessageDeliveryService } = require('thumb-messaging');

exports.run = async function(){
  return await MessageDeliveryService.processEmails();
}
