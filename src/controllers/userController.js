const UserModel = require('../models/UserModel')

class UserController {
    static async listUsers(req, res){
        try {
            const users = await UserModel.getAllUsers();
            console.log(users)
            
            return res.render('users', {users}); // Retornando a resposta ao cliente
        } catch (error) {
            return res.status(500).json({ message: "Erro ao listar usuários", error });
        }
    }

    static async addUser(req, res){
        try{
            const {name, age} = req.body;
            
            if(!name){
                return res.status(422).json({msg : "O nome é obrigatorio"})
            }

            if(!age){
                return res.status(422).json({msg : "A idade é obrigatoria"})
            }

            const user = await UserModel.createUser(name, age);
            console.log("Usuario criado");

            return res.redirect('/users');
        } catch (error){
            console.log("Nao foi possivel adicionar novo usuario", error)
        }
    }
}


module.exports = UserController;