const tickets = {
    getTickets: function getTickets(req, res){
        return res.json({
            data: [
                {
                    id: 1,
                    code: "BV102",
                }
            ]
        });
    }
};

module.exports = tickets;
