const express = require("express") // Importa o módulo Express para criar e configurar o servidor web
const app = express() // Cria uma instância da aplicação Express
const handlebars = require("express-handlebars").engine // Importa o motor de templates Handlebars para renderizar views
const bodyParser = require("body-parser") // Importa o body-parser para lidar com dados de requisição no formato URL e JSON
const path = require('path') // Importa o módulo path para manipular caminhos de diretórios e arquivos
require("dotenv").config();

const port = process.env.PORT || 8081;// porta do servidor

app.set('views', path.join(__dirname, 'src', 'views'));// Configura o diretório das views para src/views (o local onde as views estão no projeto)
app.engine("handlebars", handlebars({defaultLayout: "main"}))// Configura o motor de templates Handlebars com o layout padrão "main"
app.set("view engine", "handlebars")// Define "handlebars" como o motor de templates padrão do Express
app.use(bodyParser.urlencoded({extended: false}))// Configura o body-parser para interpretar dados de formulários (URL-encoded) nas requisições
app.use(bodyParser.json())// Configura o body-parser para interpretar dados em JSON nas requisições
app.use('/src', express.static('./src'));
app.use(express.static('src'))

const db = require("./src/config/firebase/firestore")// importando confgs do banco firestore

const playerRouter = require('./src/routes/playerRoutes')


// Rota inicial do projeto
app.get('/', function(req, res){
    res.render("index");
})

app.use(playerRouter);


// Rodando um servidor na porta 8081
app.listen(port, function(error){
    if (error) {
        console.error("Erro ao iniciar o servidor:", error);
        return;
    }
    console.log("Servidor Ativo na porta:", port);
})

