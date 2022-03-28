const knex = require("../database/connection");

class Game{
    async findAll(){
        try{
            var games = await knex.select("id", "title", "year", "price").table("games");
            return games;
        }catch(err){
            console.log(err);
            return undefined;
        }
    }

    async findById(id){
        try{
            var game = await knex.where({id: id}).select("id", "title", "year", "price").table("games");
            if(game.length > 0){
                return game;
            }else{
                return undefined;
            }            
        }catch(err){
            console.log(err);
            return undefined;
        }
    }

    async findTitle(title){
        try{
            var game = await knex.where({title: title}).select().table("games");
            if(game.length > 0){
                return {status: true};
            }else{
                return {status: false};
            }
        }catch(err){
            console.log(err);
            return {err: err};
        }
    }

    async new(title, year, price){
        try{
            await knex.insert({title, year, price}).table("games");
            return {status: true};
        }catch(err){
            console.log(err);
            return {status: false, err: err};
        }        
    }

    async deleteById(id){
        var game = await this.findById(id);
        if(game != undefined){
            try{
                await knex.where({id: id}).delete().table("games");
                return {status: true};
            }catch(err){
                return {status: false, err: err};
            }
        }else{
            return {status: false, err: "O jogo não existe, portanto não pode ser deletado!"};
        }
    }

    async updateById(id, title, year, price){
        var game = await this.findById(id);
        if(game != undefined){
            var editGame = {};
            if(title != undefined){
                editGame.title = title;
            }
            if(year != undefined){
                editGame.year = year;
            }
            if(price != undefined){
                editGame.price = price;
            }
            try{
                await knex.where({id: id}).update(editGame).table("games");
                return {status: true};
            }catch(err){
                return {status: false, err: err};
            }
        }else{
            return {status: false, err: "Não existe um jogo com este ID!"};
        }
    }
}

module.exports = new Game();