const { Router } = require("express");
const { Pokemon } = require("../db.js");
const {
  info,
  forName,
  forId,
  createPokemon,
  updatePokemon
} = require("../controllers/pokemonsController.js");
const router = Router();

router.get("/", async (req, res) => {
  let { name, by } = req.query;
  let pokemonInfo = [];

  try {
    if (name) {
      name = name.toLowerCase();
      pokemonInfo = await forName(name);
      if (!pokemonInfo.length)
        return res.json({ info: "No se encontro el pokemon" });
      return res.status(200).json(pokemonInfo);
    }
    pokemonInfo = await info(by);
    if (!pokemonInfo.length) return res.json({ info: "There are no more pokemon" });
    res.json(pokemonInfo);
  } catch (error) {
    return res.status(400).json({ info: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pokemonInfo = await forId(id);
    if (!pokemonInfo.id) return res.status(400).json({ info: "No se encontro el pokemon" });
    res.status(200).json(pokemonInfo);
  } catch (error) {
    res.status(400).json({ info: 'Error del servidor' });
  }
});

router.post("/", async (req, res) => {
  try {
    const response = await createPokemon(req, res)
    return res.status(200).json({info: response})
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const response = await updatePokemon(req, res)
    return res.status(200).json({info: response})
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pokemonToDelete = await Pokemon.findByPk(id);
    pokemonToDelete.destroy();
    return res.status(200).json({ info: "Pokemon deleted!" });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});

module.exports = router;
