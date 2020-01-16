//DEFINES
const _config = require('./config');

//IMPORTS
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

//INTIALIZATION
mongoose.set('useCreateIndex', true);
const app = express();
app.use(express.json());
app.use(routes);
serve();

function serve() {
    console.log(`=======================================`)
    console.log(`| ${_config.productInfo.name} - v ${_config.productInfo.version} |`)
    console.log(`=======================================`)
    console.log(`| Iniciando servidor em: ${_config.port}.`)
    console.log(`| Tentando conexão com banco de dados.`)
    mongoose.connect("mongodb+srv://omnistack:1cqVz3uFHwzT3TxB@clusterino-hliyo.gcp.mongodb.net/omnistack10?retryWrites=true&w=majority", {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }, (err) => {
        if (err) {
            console.log(`| Conexão com banco de dados falhou. ${err}`);
            console.log(`=======================================`)
        }else {
            console.log(`| Conectado ao banco com sucesso.`)
            console.log(`=======================================`)
        }
    })
    app.listen(_config.port, () => {
        console.log(`=======================================`)
        console.log(`| Servidor Iniciado em localhost:${_config.port}`)
        console.log(`=======================================`)
    });
}
