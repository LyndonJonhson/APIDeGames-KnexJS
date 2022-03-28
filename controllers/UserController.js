const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const jwtSecret = "mfldfildfildimfdl";

class UserController{
    async auth(req, res){
        var {email, password} = req.body;
        if(email != undefined){
            var user = await User.findByEmail(email);
            if(user != undefined){
                var correct = await bcrypt.compareSync(password, user.password);              
                if(correct){
                    jwt.sign({name: user.name, email: user.email}, jwtSecret, {expiresIn: "24h"}, (err, token) => {
                        if(err){
                            res.status(500);
                            res.json({err: "Falha interna"});
                        }else{
                            res.status(200);
                            res.json({token: token});
                        }
                    });
                }else{
                    res.status(401);
                    res.json({err: "Credenciais inválidas"});
                }
            }else{
                res.status(404);
                res.json({err: "O E-mail enviado não existe"});
            }
        }else{
            res.status(400);
            res.json({err: "E-mail inválido"});
        }
    }

    async create(req, res){
        var {name, email, password} = req.body;
        var user = await User.findByEmail(email);
        if(user != undefined){
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);
            var result = User.new(name, email, password);
            if(result.status){
                res.status(200);
                res.send("Conta criada com sucesso!");
            }else{
                res.status(500);
                res.json({err: "Falha interna!"});
            }
        }else{
            res.status(406);
            res.json({err: "Email já utilizado!"});
        }
    }
}

module.exports = new UserController();