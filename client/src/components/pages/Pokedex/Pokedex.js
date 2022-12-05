import React, { useState, useEffect } from "react";
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

  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
  const [currentItems, setCurrentItems] = useState([])
  const [pageNumberLimit, setPageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(2);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  

  useEffect(() => {

    const indexOfLastItem = currentPage * pokemonsPerPage;
    const indexOfFirstItem = indexOfLastItem - pokemonsPerPage;

    if(pokemons.length > 12) {
      setCurrentItems(pokemons.slice(indexOfFirstItem, indexOfLastItem))
    }else if(pokemons.length <= 12 ){
      setCurrentItems(pokemons)
    }else if(pokemons.info){
      setCurrentItems(pokemons)
    }
  }, [pokemons, currentPage])
  
  

  const pages = [];
  for (let i = 1; i <= Math.ceil(pokemons.length / pokemonsPerPage); i++) {
    pages.push(i);
  }

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          onClick={() => setCurrentPage(number)}
          className={currentPage === number ? style.active : style.element}
        >
          <p className={style.number}>{number}</p>
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <li
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={handleNextbtn}
      >
        {" "}
        &hellip;{" "}
      </li>
    );
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = (
      <li
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={handlePrevbtn}
      >
        {" "}
        &hellip;{" "}
      </li>
    );
  }

  return (
    <div className={style.container}>
      <div className={style.search_container}>
        <Search setCurrentPage={setCurrentPage}/>
      </div>

      {pokemons.length ? (
        <div style={{ width: "100%", display: "block" }}>
          <div className={style.cards_container}>
            <Card array={currentItems} />
          </div>
          <div className={style.buttons_container}>
            <ul className={style.list}>
              <li className={style.element}>
                <button
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={handlePrevbtn}
                  disabled={currentPage === pages[0] ? true : false}
                >
                  <p className={style.number}>«</p>
                </button>
              </li>
              {pageDecrementBtn}
              {renderPageNumbers}
              {pageIncrementBtn}

              <li className={style.element}>
                <button
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={handleNextbtn}
                  disabled={
                    currentPage === pages[pages.length - 1] ? true : false
                  }
                >
                  <p className={style.number}>»</p>
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className={style.loader_container}>
          <img
            className={style.loader}
            src={
              currentItems.info
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
