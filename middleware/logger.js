//Install a middleware function in a request process pipeline
function log(req, res, next){
    console.log('Logging')
    next();
}

module.exports =log;