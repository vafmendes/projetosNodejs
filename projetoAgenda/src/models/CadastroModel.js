const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs  = require('bcryptjs');

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

    async login(){
        this.valida();
        if(this.errors.length > 0) return;
        this.user = await CadastroModel.findOne({email: this.body.email});
    
        if(!this.user){
            this.errors.push('Usuário não existe');
            return;
        }

        if(this.errors.length > 0) return;
    
        if(!bcryptjs.compareSync(this.body.senha, this.user.senha)){
            this.errors.push('Senha Inválida');
            this.user = null;
            return;
        }
    
    
    
    }

    async register(){
        this.valida();
        if(this.errors.length > 0) return;

        await this.userExists();

        if(this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.senha = bcryptjs.hashSync(this.body.senha, salt);

            this.user = await CadastroModel.create(this.body);

    }

    async userExists(){
            const user = await CadastroModel.findOne({email: this.body.email});
            if(user){
                this.errors.push('Usuário já existe.');
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