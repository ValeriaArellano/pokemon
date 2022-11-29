const axios = require("axios");
const { Pokemon, Type } = require("../db.js");

const info = async (by) => {
  const api = await axios("https://pokeapi.co/api/v2/pokemon");
  const data = await api.data;
  const db = await Pokemon.findAll({ include: Type });

  let base = [...db, ...data.results];

  if (by === "2") {
    base = [...db];
  } else if (by === "1") {
    base = [...data.results];
  }

  let pokemonInfo = [];
  for (i = 0; i < base.length; i++) {
    if (!base[i]) return pokemonInfo;
    if (base[i].url) {
      const pokemon = await axios(base[i].url);
      const info = await pokemon.data;

      pokemonInfo.push({
        id: info.id,
        name: info.name,
        type: info.types.map((t) => t.type.name),
        img: info.sprites.versions["generation-v"]["black-white"].animated
          .front_default,
        strength: info.stats[1].base_stat,
      });
    } else {
      pokemonInfo.push({
        id: base[i].id,
        idPoke: base[i].idPoke,
        name: base[i].name,
        type: base[i].types.map((t) => t.name),
        strength: base[i].strength,
        img: base[i].img,
      });
    }
  }
  return pokemonInfo;
};

const forName = async (name) => {
  try {
    const db = await Pokemon.findOne({
      where: {
        name: name,
      },
      include: Type,
    });
    if (db) {
      const pokemonDb = [
        {
          id: db.id,
          idPoke: db.idPoke,
          name: db.name,
          type: db.types.map((t) => t.name),
          img: db.img,
        },
      ];
      return pokemonDb;
    } else {
      const api = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await api.data;
      const pokemonName = [
        {
          id: data.id,
          name: data.name,
          type: data.types.map((t) => t.type.name),
          img: data.sprites.versions["generation-v"]["black-white"].animated
            .front_default,
        },
      ];
      return pokemonName;
    }
  } catch (error) {
    return [];
  }
};

const forId = async (id) => {
  try {
    const api = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await api.data;

    const pokemonId = {
      id: data.id,
      name: data.name,
      type: data.types.map((t) => t.type.name),
      img: data.sprites.versions["generation-v"]["black-white"].animated
        .front_default,
      life: data.stats[0].base_stat,
      strength: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      speed: data.stats[5].base_stat,
      height: data.height,
      weight: data.weight,
    };

    return pokemonId;
  } catch (error) {
    console.log(error);
  }
  try {
    const db = await Pokemon.findByPk(id, { include: Type });
    const pokemonDb = {
      id: db.idPoke,
      name: db.name,
      type: db.types.map((t) => t.name),
      img: db.img,
      life: db.life,
      strength: db.strength,
      defense: db.defense,
      speed: db.speed,
      height: db.height,
      weight: db.weight,
    };

    return pokemonDb;
  } catch (error) {
    console.log(error);
  }
};

const createPokemon = async (req, res) => {
  let { name, life, strength, defense, speed, height, weight, types, img } =
    req.body;
  if (!name) {
    throw new Error("The name is required")
  } else if(/\d/.test(name)){
    throw new Error("The name can\'t contain a number")
  }else{
    const exists = await Pokemon.findOne({ where: { name: name } });
    if (exists) throw new Error("Pokemon already exists!")
  }

  try {
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
  
    if (types.length) {
      await pokemon.setTypes(types);
      return "Pokemon created!"
      
    }else{
      types = [1];
      await pokemon.setTypes(types);
      return 'pokemon created!'
    }
    

  } catch (error) {
    return error
  }
};

const updatePokemon = async (req, res) => {
  const { id } = req.params;
  let { name, life, strength, defense, speed, height, weight, img } =
    req.body;

  if(/\d/.test(name)){
    throw new Error("The name can\'t contain a number")
  }

try {
  const exists = await Pokemon.findByPk(id);
  await exists.update({
    name: name ? name.toLowerCase() : exists.name,
    life: life ? parseInt(life) : exists.life,
    strength: strength ? parseInt(strength) : exists.strength,
    defense: defense ? parseInt(defense) : exists.defense,
    speed: speed ? parseInt(speed) : exists.speed,
    height: height ? parseInt(height) : exists.height,
    weight: weight ? parseInt(weight) : exists.weight,
    img: img ? img : exists.img
  },
  );

  if(req.body.type.length){
    await exists.setTypes(req.body.type);
  }

  return "Pokemon edited!"
} catch (error) {
  console.log(error)
  throw new Error('Error while editing')
}
}


module.exports = {
  info,
  forName,
  forId,
  createPokemon,
  updatePokemon
};
