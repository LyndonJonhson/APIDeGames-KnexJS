class HomeController{
    async index(req, res){
        res.send("HOME PAGE!");
    }
}

module.exports = new HomeController();