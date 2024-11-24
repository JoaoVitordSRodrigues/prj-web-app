const PlayerModel = require('../models/PlayerModel')

class PlayerController {
    static async listPlayers(req, res){
        try {
            const players = await PlayerModel.getAllPlayers();
            
            return res.render('players', {players}); // Retornando a resposta ao cliente
        } catch (error) {
            return res.status(500).json({ message: "Controller: Erro ao listar jogadores", error });
        }
    }

    static async addPlayer(req, res){
        try{
            const {name, age, position, team} = req.body;
            
            if(!name){
                return res.status(422).json({msg : "O nome é obrigatorio"})
            }

            if(!age){
                return res.status(422).json({msg : "A idade é obrigatoria"})
            }
            
            if(!position){
                return res.status(422).json({msg : "A posição é obrigatoria"})
            }
            
            if(!team){
                return res.status(422).json({msg : "O time é obrigatorio"})
            }

            const player = await PlayerModel.createPlayer(name, age, position, team);
            console.log("Jogador criado");

            return res.redirect('/players');
        } catch (error){
            console.log("Controller: Nao foi possivel adicionar novo jogador", error)
        }
    }

    static async findPlayer(req, res) {
        try {
            const playerId = req.params.id;
    
            const player = await PlayerModel.findPlayerById(playerId);
    
            if (!player) {
                console.log("Controller: Jogador não encontrado");
                return res.status(404).send("Jogador não encontrado");
            }
    
            return res.render("edit", { player });
        } catch (error) {
            console.log("Controller: Não foi possível encontrar jogador", error);
            return res.status(500).send("Erro ao buscar jogador");
        }
    }
    
    static async deletePlayer(req, res) {
        try {
            const playerId = req.params.id;
    
            const player = await PlayerModel.deletePlayerById(playerId);
    
            return res.render("players");
        } catch (error) {
            console.log("Controller: Não foi possível deletar jogador", error);
            return res.status(500).send("Erro ao deletar jogador");
        }
    }

    static async updtPlayer(req, res) {
        try {
            const { id, name, age, position, team } = req.body;  // Extrai os dados

            // Verificação de campos obrigatórios
            if (!id || !name || !age || !position || !team) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
            }
            
            // Se passar pela verificação, chama a função de atualização
            const data = { id, name, age, position, team };

            // // console.log(id)
            const player = await PlayerModel.updtPlayerById(data);
    
            return res.status(200).json({ message: 'Jogador atualizado com sucesso.' });
        } catch (error) {
            console.log("Controller: Não foi possível editar jogador", error);
            return res.status(500).send("Erro ao editar jogador");
        }
        
    }
}


module.exports = PlayerController;