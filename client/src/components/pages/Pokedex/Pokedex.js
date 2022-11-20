import React, { useState } from "react";
import style from "./pokedex.module.scss";
import { Card } from "../../components/cards/Card";
import { Search } from "../../components/search/Search";
import { useSelector } from "react-redux";
import { ordered, tipos } from "../../helpers/filters";

export const Pokedex = () => {
  let pokemons = useSelector((store) => store.pokemons);
  const type = useSelector((store) => store.type);
  const order = useSelector((store) => store.order);

  if (type) pokemons = tipos(type, pokemons);
  if (order) pokemons = ordered(order, pokemons);

  const [page, setPage] = useState(0);

  const pagination = () => {
    if (pokemons.length) return pokemons.slice(page, page + 12);
    if (pokemons.info) return pokemons;
    return [];
  };

  const array = pagination();

  const nextPage = () => {
    if (pokemons.length > page + 12) {
      setPage(page + 9);
    }
  };

  const previusPage = () => {
    if (page > 0) {
      setPage(page - 12);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.search_container}>
        <Search />
      </div>

      {array.length ? (
        <div style={{width:'100%', display: 'block'}}>
          <div className={style.cards_container}>
            <Card array={array} />
          </div>
          <div className={style.buttons_container}>
            <button onClick={previusPage} className={style.button}>
              &laquo; Prev
            </button>
            <button onClick={nextPage} className={style.button}>
              Next &raquo;
            </button>
          </div>
        </div>
      ) : (
        <div className={style.loader_container}>
          <img className={style.loader}
            src={
              array.info
                ? "https://media.giphy.com/media/UHAYP0FxJOmFBuOiC2/giphy.gif"
                : "https://thumbs.gfycat.com/FrightenedAntiqueDaddylonglegs-size_restricted.gif"
            }
            alt="Not found"
          />
        </div>
      )}
    </div>
  );
};
