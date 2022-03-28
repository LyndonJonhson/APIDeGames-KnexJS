const knex = require("../database/connection");

class User{
    async findByEmail(email){
        try{
            var user = await knex.where({email: email}).select().table("users");
            if(user.length > 0){
                return user[0];
            }else{
                return undefined;
            }
        }catch(err){
            console.log(err);
            return undefined;
        }        
    }

    async new(name, email, password){
        try{
            await knex.insert({name, email, password}).table("users");
            return {status: true};
        }catch(err){
            console.log(err);
            return {status: false, err: err};
        }
    }
}

module.exports = new User();