const mongoose = require('mongoose');

// Conectar ao MongoDB Local
//mongoose.connect(`mongodb://localhost:27017/minedev`)
mongoose.connect(`mongodb+srv://mineDevBlogUser:tl2R8rYQ3iul9S2y@cluster0.baicaa5.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{
    console.log('Conectado ao MongoDB!')
})
.catch((erro)=>{
    console.log('ERRO ao se conectado ao MongoDB!');
})

exports.mongoose = mongoose