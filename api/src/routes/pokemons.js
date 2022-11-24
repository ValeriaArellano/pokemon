const { Router } = require("express");
const { Pokemon, Type } = require("../db.js");
const {
  info,
  forName,
  forId,
} = require("../controllers/pokemonsController.js");

const router = Router();

router.get("/", async (req, res) => {
  let { name, by } = req.query;
  let pokemonInfo = [];
  if (name) {
    name = name.toLowerCase();
    pokemonInfo = await forName(name);
    if (!pokemonInfo.length)
      return res.json({ msg: "No se encontro el pokemon" });
    return res.json(pokemonInfo);
  }

  pokemonInfo = await info(by);
  if (!pokemonInfo.length) return res.json({ msg: "No hay mas registros" });

  res.json(pokemonInfo);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const pokemonInfo = await forId(id);
  if (!pokemonInfo.id) return res.json( "No se encontro el pokemon" );
  res.json(pokemonInfo);
});

router.post("/", async (req, res) => {
  let { name, life, strength, defense, speed, height, weight, types, img } =
    req.body;
  if (
    isNaN(life) ||
    isNaN(strength) ||
    isNaN(defense) ||
    isNaN(speed) ||
    isNaN(height) ||
    isNaN(weight)
  )return res.json({ info: "Some features are not a number" });

  if (!name) return res.json({ info: "The name is required" });

  const exists = await Pokemon.findOne({ where: { name: name } });
  if (exists) return res.json({ info: "Pokemon already exists!" });

  const pokemon = await Pokemon.create({
    name: name.toLowerCase(),
    life: Number(life),
    strength: Number(strength),
    defense: Number(defense),
    speed: Number(speed),
    height: Number(height),
    weight: Number(weight),
    img: img
  });

  if (!types.length) {
    types = [1]
  };

  await pokemon.setTypes(types);
  res.json({ info: "Pokemon created!" });
});

router.put("/", async (req, res) => {
  let { name, life, strength, defense, speed, height, weight, types, img, idPoke } =
    req.body;
  if (
    isNaN(life) ||
    isNaN(strength) ||
    isNaN(defense) ||
    isNaN(speed) ||
    isNaN(height) ||
    isNaN(weight)
  )return res.json({ info: "Some features are not a number" });

  if (!name) return res.json({ info: "The name is required" });

  const pokemon = await Pokemon.update({
    name: name.toLowerCase(),
    life: Number(life),
    strength: Number(strength),
    defense: Number(defense),
    speed: Number(speed),
    height: Number(height),
    weight: Number(weight),
    img: img
  },
  { where: { idPoke: idPoke } }
  );

  if (!types.length) {
    types = [1]
  };

  await pokemon.setTypes(types);
  res.json({ info: "Pokemon edited!" });
});

module.exports = router