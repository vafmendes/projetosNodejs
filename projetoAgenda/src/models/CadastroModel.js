const mongoose = require('mongoose');
const validator = require('validator');

const CadastroSchema = new mongoose.Schema({
    nomeCompleto: {type: String, required: true},
    email:{type: String, required: true},
    senha: {type: String, required: true}
})

const CadastroModel = mongoose.model('Cadastro', CadastroSchema);

class Cadastro {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async register(){
        this.valida();
        if(this.errors.length > 0) return;
        try{
            this.user = await CadastroModel.create(this.body);
        }catch(e){
            console.log(e);
        }

    }

    valida(){
        this.cleanUp();
        //Validação
        //O email precisa ser válido
        if(!validator.isEmail(this.body.email)){
            this.errors.push('Email inválido');
        }
        // A senha precisa ser de no máximo de 8 caracteres
        if(this.body.senha.length < 3 || this.body.senha.length  > 9){
            this.errors.push('A senha precisa ter entre 3 e 8 caracteres');
        }

    }
    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }

        this.body = {
            nomeCompleto: this.body.nomeCompleto,
            email: this.body.email,
            senha: this.body.senha
        }
    }

}


module.exports = Cadastro;