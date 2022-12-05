import React from "react";
import classes from "./Paginated.module.scss";

const Pagination = ({
  currentPage,
  PokemonsPerPage,
  totalPokemons,
  pagination,
  maxPageNumberLimits,
  minPageNumberLimits,
  handlePrevBtn
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPokemons / PokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  

  return (
    <nav className={classes.nav}>
      <ul className={classes.list}>
        {currentPage > 1 && (
          <li className={classes.element}>
            <p
              onClick={() => handlePrevBtn()}
              className={classes.number}
            >
              «
            </p>
          </li>
        )}
        {
          pageNumbers.map((number) => {
            if (
              number < maxPageNumberLimits + 1 &&
              number > minPageNumberLimits
            ) {
              console.log('entra')
              return (
                <li
                  key={number}
                  className={
                    currentPage === number ? classes.active : classes.element
                  }
                >
                  <p
                    onClick={() => pagination(number)}
                    className={classes.number}
                  >
                    {number}
                  </p>
                </li>
              );
            } else {
              console.log('no entra')
              return null;
            }
          })}
        {currentPage < pageNumbers.length && (
          <li className={classes.element}>
            <p
              onClick={() => pagination(currentPage + 1)}
              className={classes.number}
            >
              »
            </p>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
