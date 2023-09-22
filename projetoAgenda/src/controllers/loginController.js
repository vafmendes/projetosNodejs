const Login = require('../models/CadastroModel');

exports.index= (req, res)=>{
    res.render('../views/login');
}

exports.login = async (req, res)=>{
    const login = new Login(req.body);
    try{
        await login.login();
        if(login.errors.length > 0){
            req.flash('errors', login.errors);
            req.session.save(()=>{
                return res.redirect('back');
            });
            return;
        }

        req.flash('success', 'Login realizado com sucesso');
        req.session.user = login.user;
            req.session.save(()=>{
                return res.redirect('/');
            });
    }catch(e){
        console.log(e);
        return res.render('../views/includes/404');
    }
};

exports.logout = function(req, res){
    req.session.destroy();
    res.redirect('/');
}

