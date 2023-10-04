const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const cadastroController = require('./src/controllers/cadastroController');
const contatosController = require('./src/controllers/contatosController');

const {loginRequired} = require('./src/middlewares/middleware');

//Rotas da home
route.get('/', homeController.index);

//Rotas de login
route.get('/login/index', loginController.index);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

//Rotas de cadastro
route.get('/cadastro', cadastroController.cadastro);
route.post('/cadastro/register', cadastroController.register);

//Rota de contatos
route.get('/contatos/', loginRequired, contatosController.contato);
route.post('/contatos/register', contatosController.register);
route.get('/contatos/:id', loginRequired, contatosController.editIndex);
route.post('/contatos/edit/:id', loginRequired, contatosController.edit);
route.get('/contatos/delete/:id', loginRequired, contatosController.delete);


module.exports = route;
