const mongoose = require('mongoose');

// Conectar ao MongoDB Local
mongoose.connect(`mongodb://localhost:27017/minedev`);


// Verificar se a conexão foi bem-sucedida
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro na conexão:'));
db.once('open', () => {
    console.log('Conectado ao MongoDB!');
});

exports.mongoose = mongoose