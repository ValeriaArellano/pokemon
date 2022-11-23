import React, { useState } from "react";
import style from "./search.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { filters, getByName, sort, type } from "../../../redux/actions";

export const Search = () => {
  const dispatch = useDispatch();
  const [pokemons, setPokemons] = useState("");

  const options = useSelector((store) => store.types);

  const handleInputChange = (e) => {
    setPokemons(e.target.value);
  };

  const byTipe = (e) => {
    dispatch(type(e.target.value));
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(getByName(pokemons));
    setPokemons("");
  };

  const createdBy = (e) => {
    dispatch(filters(e.target.value));
  };

  const sorterBy = (e) => {
    dispatch(sort(e.target.value));
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
        <select className={style.field2__button} name="Type" onChange={byTipe}>
          <option value="">Type:</option>
          {options?.map((p) => (
            <option value={p.name} key={p.slot} className={style.field2__button__options}>
              {p.name}
            </option>
          ))}
        </select>
        <select name="creado" className={style.field2__button} onChange={createdBy}>
          <option value="0">From:</option>
          <option value="1">API</option>
          <option value="2">DB</option>
        </select>
        <select name="Ordenar" className={style.field2__button} onChange={sorterBy}>
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
