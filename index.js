//require express
const express = require('express');

//Importaçãodo mongoose
const mongoose = require('mongoose');
const logger = require('./middlewares/logger');
const auth = require('./middlewares/auth');
//import do controlador Pratos
const pratosRoutes = require('./Controllers/controllers/pratos');
//import do controlador Restaurante
const restauranteRoutes = require('./Controllers/controllers/restaurante');
//import do controlador User
const userRoutes = require('./Controllers/controllers/user');

//Definições base
const app = express();
const PORT = 3000;

// Middleware para análise de JSON
app.use(express.json());
app.use(logger);

//só utilizamos no caminho onde queremos autenticação
app.use('/pratos', auth);
app.use('/restaurantes', auth);

//definição da rota para controlador Pratos
app.use('/pratos', pratosRoutes);
//definição da rota para controlador Restaurante
app.use('/restaurantes', restauranteRoutes);
//definição da rota para controlador User
app.use('/user', userRoutes);

// Rota básica para teste
app.get('/', (req, res) => {
 res.send('Servidor funcionando!');
});

// Iniciar o servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

//Ligação à BD, confirmar URL desejado e BD
mongoose.connect('mongodb+srv://TDW_DATABASE:123@tdw.pb3x6.mongodb.net/tutorial_tdw?retryWrites=true&w=majority&appName=TDW', {
 useNewUrlParser: true,
 useUnifiedTopology: true,
});
//sucesso
mongoose.connection.on('connected', () => {
 console.log('Conectado ao MongoDB');
});
//erro
mongoose.connection.on('error', (err) => {
 console.error('Erro na conexão ao MongoDB:', err);
});

