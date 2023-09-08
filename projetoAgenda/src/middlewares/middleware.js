//trabalhando com middleware
exports.middewareGlobal = (req, res, next)=>{
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    next();
};

exports.outroMiddleware = (req, res, next)=>{
    next();
}

exports.checkCsrfError = (err, req, res, next) =>{
   if((err && err.code) ===  'EBADCSRFTOKEN'){
    return res.render('../views/includes/404');
   }

   next(); 
}


exports.csrfMiddleware = (req, res, next) =>{
    res.locals.csrfToken = req.csrfToken();
    next();
}