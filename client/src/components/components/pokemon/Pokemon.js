import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./pokemon.module.scss";
import Stats from "../../components/stats/index";

export const Pokemon = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    async function detalles() {
      const data = await fetch(`http://localhost:3001/pokemons/${id}`);
      const pokemon = await data.json();
      setPokemon(pokemon);
    }
    detalles();
  }, [id]); 

  return (
    <>
      <div className={style.container}>
        <h1>#{pokemon.id} {pokemon.name}</h1>
        <div className={style.img}>
          <img
            src={pokemon.img ? pokemon.img : "https://assets.stickpng.com/images/580b57fcd9996e24bc43c325.png"}
            alt="pokemon"
          />
          <div className={style.parrafo}>
            <p>peso: {pokemon.weight}kg</p>
            <p>altura: {pokemon.height}ft</p>
          </div>
        </div>

        <div className={style.type}>
          {pokemon.type
            ? pokemon?.type.map((t) => <h3 className={style[`${t}`]}>{t}</h3>)
            : null}
        </div>
        <div className={style.meter}>
          <div className={style.type}>
            <Stats valor={pokemon.life} nombre={"HP"} />
            <Stats valor={pokemon.strength} nombre={"Fuerza"} />
          </div>
          <div className={style.type}>
            <Stats valor={pokemon.defense} nombre={"Defensa"} />
            <Stats valor={pokemon.speed} nombre={"Velocidad"} />
          </div>
        </div>
      </div>
    </>
  );
};
