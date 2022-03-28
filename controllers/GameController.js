var Game = require("../models/Game");

class GameController{
    async index(req, res){
        var games = await Game.findAll();
        res.status(200);
        res.json(games);
    }

    async findGame(req, res){
        var id = req.params.id;
        if(!isNaN(id)){
            var game = await Game.findById(id);
            if(game != undefined){
                res.status(200);
                res.json(game);
            }else{
                res.status(400);
                res.json({err: "Não existe jogo com este ID!"});
            }
        }else{
            res.status(400);
            res.json({err: "URL inválida!"});
        }        
    }

    async create(req, res){
        var {title, year, price} = req.body;
        if(title != undefined && year != undefined && price != undefined){
            var game  = await Game.findTitle(title);
            if(!game.status){
                var result = await Game.new(title, year, price);
                if(result.status){
                    res.status(200);
                    res.send("O jogo foi adicionado com sucesso!");
                }else{
                    res.status(500);
                    res.json({err: result.err})
                }
            }else{
                res.status(400);
                res.json({err: "O jogo já está cadastrado!"});
            }
        }else{
            res.status(400);
            res.json({err: "Dados inválidos!"});
        }
    }

    async remove(req, res){
        var id = req.params.id;
        var result = await Game.deleteById(id);
        if(result.status){
            res.status(200);
            res.send("O jogo foi deletado com sucesso!");
        }else{
            res.status(406);
            res.send(result.err);
        }
    }

    async edit(req, res){
        var id = req.params.id;
        var {title, year, price} = req.body;
        var result = await Game.updateById(id);
        if(result.status){
            res.status(200);
            res.send("Jogo atualizado com sucesso!");
        }else{
            res.status(400);
            res.send(result.err);
        }
    }
}

module.exports = new GameController();