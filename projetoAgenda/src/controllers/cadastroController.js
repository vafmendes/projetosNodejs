const Cadastro = require('../models/CadastroModel');

exports.cadastro = (req, res)=>{
    res.render('../views/cadastro');
    
}

exports.register = async (req, res)=>{
    const cadastro = new Cadastro(req.body);
    try{
        await cadastro.register();
        if(cadastro.errors.length > 0){
            req.flash('errors', cadastro.errors);
            req.session.save(()=>{
                return res.redirect('back');
            });
            return;
        }

        req.flash('success', 'Seu usuário foi criado com sucesso');
            req.session.save(()=>{
                return res.redirect('back');
            });
    }catch(e){
        console.log(e);
        return res.render('../views/includes/404');
    }
}