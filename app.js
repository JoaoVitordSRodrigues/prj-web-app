const express = require("express")
const app = express()

app.listen(8081, function(error){
    if (error) {
        console.error("Erro ao iniciar o servidor:", err);
        return;
    }
    console.log("Servidor Ativo na porta 8081");
})
