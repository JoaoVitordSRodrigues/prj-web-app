const db = require('../config/firebase/firestore')

//interações com banco/funcoes

class PlayerModel{
    static async getAllPlayers(){
        try{
            const snapshot = await db.collection('footballplayers').get();
            const players = [];
            
            if(!snapshot){
                console.log('Model: Nenhum jogador encontrado')
            }
            
            snapshot.forEach((doc) => {
                players.push({ id: doc.id, ...doc.data() })
            });
    
            return players;
        }catch(error){
            res.status(404).json("Model: Erro ao consultar jogadores",  error)
        }

    }

    static async createPlayer(name, age, position, team){
        try{
            const player = await db.collection('footballplayers').add({
                name: name,
                age: age,
                position: position,
                team: team
            });
            return player; 
        }catch(error){
            res.status(404).json("Model: Erro ao adicionar jogadores",  error)
        }
    }

    static async findPlayerById(playerId) {
        try {
            const findPlayer = db.collection("footballplayers").doc(playerId);
            const player = await findPlayer.get();
    
            if (!player.exists) {
                console.log("Model: Jogador não encontrado");
                return null;
            }
    
            return {
                id: player.id,
                ...player.data(), // Combina os dados do documento com o ID
            };
        } catch (error) {
            console.log("Model: Erro ao buscar jogador", error);
            throw error;
        }
    }

    static async deletePlayerById(playerId) {
        try {
            const res = await db.collection('footballplayers').doc(playerId).delete();
            if (res) {
                console.log('Jogador excluído com sucesso');
            } else {
                console.log('Erro ao excluir jogador');
            }
        } catch (error) {
            console.log("Model: Erro ao buscar jogador", error);
            throw error;
        }
    }

    static async updtPlayerById(data){
        try {
            const {id, ...updateData} = data;  // Extrai o id e cria um novo objeto com o restante dos dados

            const player = db.collection('footballplayers').doc(id);

            const res = await player.update(updateData);  // Atualiza apenas os outros campos, sem o id

            if (res) {
                console.log('Jogador editado com sucesso');
            } else {
                console.log('Erro ao editar jogador');
            }

            return player;
        } catch (error) {
            console.log("Model: Erro ao buscar jogador", error);
            throw error;
        }
    }
    


    
}
// Exporta o modelo "Player" para ser usado em outras partes da aplicação
module.exports = PlayerModel;
