const knex = require("knex")({
    client: "mysql2",
    connection: {
        host: "localhost",
        user: "root",
        password: "020896130597",
        database: "apigames"
    }
});

module.exports = knex;