import React from "react";
import { Link } from "react-router-dom";
import style from "./landingPage.module.scss";

export const LandingPage = () => {
  return (
    <div className={style.container}>
      <div className={style.container}>
        <div className={style.h1_container}>
          <h1>
            <span>Find</span> all your
            favorite 
            <span> Pokemon</span>
          </h1>
          <div className={style.p_container}>
          <p>
            See all pokemon features
          </p>
        </div>
        <Link to="/home" className={style.link}>
          <input type="submit" value="See Pokemon" className={style.link__button} />
        </Link>
        </div>
      </div>

      <div className={style.img_container}>
        <img
          src="https://media.tenor.com/74l5y1hUdtwAAAAj/pokemon.gif"
          alt="pikachu"
        />
      </div>
    </div>
  );
};
