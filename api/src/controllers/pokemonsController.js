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
    console.log(error)
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
    console.log(error)
  }
};

module.exports = {
  info,
  forName,
  forId,
};
