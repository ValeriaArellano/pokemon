import React, { useState } from "react";
import style from "./search.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { filters, getByName, order, type } from "../../../redux/actions";

export const Search = () => {
  const dispatch = useDispatch();
  const [pokemons, setPokemons] = useState("");

  const options = useSelector((store) => store.types);

  const handleInputChange = (e) => {
    setPokemons(e.target.value);
  };

  const byTipo = (e) => {
    dispatch(type(e.target.value));
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(getByName(pokemons));
    setPokemons("");
  };

  const creadoBy = (e) => {
    dispatch(filters(e.target.value));
  };

  const orderBy = (e) => {
    dispatch(order(e.target.value));
  };

  return (
    <div className={style.container}>
      <form onSubmit={submit} className={style.field}>
        <input
          type="text"
          id="searchterm"
          value={pokemons}
          onChange={handleInputChange}
          placeholder="Find your pokemon..."
        />
        <input className={style.button} type="submit" value="Find!" />
      </form>
      <div className={style.field2}>
        <select className={style.field2__button} name="Type" onChange={byTipo}>
          <option value="">Type:</option>
          {options?.map((p) => (
            <option value={p.name} key={p.slot} className={style.field2__button__options}>
              {p.name}
            </option>
          ))}
        </select>
        <select name="creado" className={style.field2__button} onChange={creadoBy}>
          <option value="0">Filter by:</option>
          <option value="1">API</option>
          <option value="2">Fandom</option>
        </select>
        <select name="Ordenar" className={style.field2__button} onChange={orderBy}>
          <option value="" >Sorter by:</option>
          <option value="a-z" >A-Z</option>
          <option value="z-a" >Z-A</option>
          <option value="fuerza+" >Strength+</option>
          <option value="fuerza-" >Strength-</option>
        </select>
      </div>
    </div>
  );
};
