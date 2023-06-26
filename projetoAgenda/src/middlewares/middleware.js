//trabalhando com middleware
exports.middewareGlobal = (req, res, next)=>{
    res.locals.umaVariavelLocal = 'Este é um valor da variavel global';
    next();
};

exports.outroMiddleware = (req, res, next)=>{
    next();
}

exports.checkCsrfError = (err, req, res, next) =>{
   if((err && err.code) ===  'EBADCSRFTOKEN'){
    return res.render('../views/includes/404');
   } 
}

exports.csrfMiddleware = (req, res, next) =>{
    res.locals.csrfToken = req.csrfToken();
    next();
}