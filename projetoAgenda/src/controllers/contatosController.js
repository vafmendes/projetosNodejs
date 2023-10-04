const Contato = require("../models/ContatosModel");

exports.contato = (req, res)=>{
    res.render('../views/contatos',{
        contato: {}
    });
};

exports.register = async (req, res)=>{
    try{
        const contato = new Contato(req.body);
        await contato.register();

        if(contato.errors.length > 0){
            req.flash('errors', contato.errors);
            req.session.save(()=>{
                return res.redirect('back');
            });
            return;
        }

        req.flash('success', 'Seu usuário foi criado com sucesso');
        req.session.save(()=>{return res.redirect(`/contatos/${contato.contato._id}`)});
        return;
    }catch(e){
        console.log(e);
        return res.render('../views/includes/404');
    }
}

exports.editIndex = async(req, res) =>{
    try{
        if(!req.params.id) return res.render('../views/includes/404');

        const contato = await Contato.buscaId(req.params.id);

        if(!contato){
            return res.render('../views/includes/404');
        }

        res.render('../views/contatos',{contato});
    }catch(e){
        console.log(e);
        return res.render('../views/includes/404');
    }
};

exports.edit = async (req, res) =>{
    try {
        if(!req.params.id) return res.render('../views/includes/404');
        const contato = new Contato(req.body);
        await contato.edit(req.params.id);

        if(contato.errors.length > 0){
            req.flash('errors', contato.errors);
            req.session.save(()=>{ res.redirect('back');});
            return;
        }
      req.flash('success', 'Contato editado com êxito!!!');
      req.session.save(()=>{return res.redirect(`/contatos/${contato.contato._id}`)});
      return;   
    } catch (e) {
        console.log(e);
        return res.render('../views/includes/404');    
    }    
}

exports.delete = async (req, res) =>{
        if(!req.params.id) return res.render('../views/includes/404');

        const contato = await Contato.delete(req.params.id);

        if(!contato){
            return res.render('../views/includes/404');
        }

        req.flash('success', 'Seu contato foi apagado com sucesso!!!');
        req.session.save(()=> res.redirect('back'));
        return;
    
}