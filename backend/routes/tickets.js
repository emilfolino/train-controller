const express = require('express');
const router = express.Router();

const tickets = require("../models/tickets.js");

router.get('/', (req, res) => tickets.getTickets(req, res));

module.exports = router;
