const db = require('../config/firebase/firestore')

//interações com banco/funcoes

class UserModel{
    static async getAllUsers(){
        try{
            const snapshot = await db.collection('users').get();
            const users = [];
    
            snapshot.forEach((doc) => {
                users.push({ id: doc.id, ...doc.data() })
            });
    
            return users;
        }catch(error){
            res.status(404).json("erro ao consultar usuarios",  error)
        }

    }

    static async createUser(name, age){
        try{
            const user = await db.collection('users').add({
                name: name,
                age: age
            });
            return user; 
        }catch(error){
            res.status(404).json("erro ao adicionar usuario",  error)
        }
    }
}
// Exporta o modelo "User" para ser usado em outras partes da aplicação
module.exports = UserModel;
