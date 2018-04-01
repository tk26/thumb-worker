exports.onFailure = function(err, job){
    console.log('Job failed with error: %s', err.message); 
}