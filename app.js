const express = require("express") // Importa o módulo Express para criar e configurar o servidor web
const app = express() // Cria uma instância da aplicação Express
const handlebars = require("express-handlebars").engine // Importa o motor de templates Handlebars para renderizar views
const bodyParser = require("body-parser") // Importa o body-parser para lidar com dados de requisição no formato URL e JSON
const path = require('path') // Importa o módulo path para manipular caminhos de diretórios e arquivos

// Configura o diretório das views para src/views (o local onde as views estão no projeto)
app.set('views', path.join(__dirname, 'src', 'views'));

// Configura o motor de templates Handlebars com o layout padrão "main"
app.engine("handlebars", handlebars({defaultLayout: "main"}))
// Define "handlebars" como o motor de templates padrão do Express
app.set("view engine", "handlebars")

// Configura o body-parser para interpretar dados de formulários (URL-encoded) nas requisições
app.use(bodyParser.urlencoded({extended: false}))
// Configura o body-parser para interpretar dados em JSON nas requisições
app.use(bodyParser.json())

// Rota inicial do projeto
app.get('/', function(req, res){
    res.render("index")
})

// Rodando um servidor na porta 8081
app.listen(8081, function(error){
    if (error) {
        console.error("Erro ao iniciar o servidor:", error);
        return;
    }
    console.log("Servidor Ativo na porta 8081");
})

