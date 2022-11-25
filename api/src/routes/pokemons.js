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
  if (!pokemonInfo.id) return res.json("No se encontro el pokemon");
  res.json(pokemonInfo);
});

router.post("/", async (req, res) => {
  let { name, life, strength, defense, speed, height, weight, types, img } =
    req.body;

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
    img: img,
  });

  if (!types.length) {
    types = [1];
  }

  await pokemon.setTypes(types);
  return res.json({ info: "Pokemon created!" });
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let { name, life, strength, defense, speed, height, weight, types, img } =
      req.body;

    const exists = await Pokemon.findByPk(id);

    await exists.update({
      name: name ? name : exists.name,
      life: life ? parseInt(life) : exists.life,
      strength: strength ? parseInt(strength) : exists.strength,
      defense: defense ? parseInt(defense) : exists.defense,
      speed: speed ? parseInt(speed) : exists.speed,
      height: height ? parseInt(height) : exists.height,
      weight: weight ? parseInt(weight) : exists.weight,
      img: img ? img : exists.img,
    });
    if (!types.length) {
      types = exists.types;
    }
    await exists.setTypes(types);
    return res.status(200).json({ info: "Pokemon edited!" });
  } catch (error) {
    return res.status(400).json({ info: "Error when editing" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pokemonToDelete = await Pokemon.findByPk(id);
    pokemonToDelete.destroy();
    return res.status(200).json({ info: "Pokemon deleted!" });
  } catch (error) {
    return res.status(400).json({ info: "Error when deleting" });
  }
});

module.exports = router;
