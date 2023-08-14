const database = require('../db/database.js');

const tickets = {
    getTickets: async function getTickets(req, res){
        var db = await database.openDb();

        var allTickets = await db.all(`SELECT *, ROWID FROM tickets ORDER BY ROWID DESC`);

        return res.json({
            data: allTickets
        });
    }
};

module.exports = tickets;
