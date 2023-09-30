const mongoose = require('mongoose');
const { async } = require('regenerator-runtime');
const validator = require('validator');

const HomeSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    sobrenome: {type: String, required: false, default: ''},
    email: {type: String, required: false, default: ''},
    telefone: {type: String, required: false, default: ''},
    criadoEm: {type: Date, default: Date.now}
})

const ContatosModel = mongoose.model('Contato', HomeSchema);
function Contato(body){
    this.body = body;
    this.errors = [];
    this.contato = null;
}

Contato.buscaId = async function(id){
    if(typeof id !== 'string') return;
    const contato = await ContatosModel.findById(id);

    return contato;
};

Contato.prototype.register = async function(){
    this.valida();

    if(this.errors.length > 0) return;
    this.contato = await ContatosModel.create(this.body);
}

Contato.prototype.valida = function(){
    this.cleanUp();

    //Validação
    //O email precisa ser válido
    if((!validator.isEmail(this.body.email))&&(this.body.email)){
        this.errors.push('Email inválido');
    }
    if(!this.body.nome){
        this.errors.push(`Nome é um campo obrigatório`);
    }
    if((!this.body.email) && (!this.body.telefone)){
        this.errors.push('Adicione pelo menos um contato.');
    }

}
Contato.prototype.cleanUp = function(){
    for(const key in this.body){
        if(typeof this.body[key] !== 'string'){
            this.body[key] = '';
        }
    }

    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone
    };
};

Contato.prototype.edit = async function(id){
    if(typeof id !== 'string') return;
    this.valida();
    if(this.errors.length > 0) return;
    this.contato = await ContatosModel.findByIdAndUpdate(id, this.body, {new: true});


}



module.exports = Contato;