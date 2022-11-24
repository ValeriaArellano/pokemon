const { Router } = require("express");
const axios = require("axios");
const { Type } = require("../db.js");

const router = Router();

router.get('/', async (req, res) => {
    const api = await axios('https://pokeapi.co/api/v2/type');
    const types = await api.data;
    for( t of types.results ) {
        const exists = await Type.findOne({where: { name: t.name }})
        if(exists) return res.json(await Type.findAll())
        await Type.create({ name: t.name})
    }
    res.json(await Type.findAll());
})



module.exports = router;