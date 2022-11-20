import React from "react";
import style from "./card.module.scss";
import { Link } from "react-router-dom";

export const Card = ({ array }) => {
  return (
    <>
      {array.length &&
        array.map((p) => (
          <Link
            to={`/pokedex/${p.id}`}
            key={p.name}
            style={{ textDecoration: "none" }}
          >
            <div>
              <div className={style.pokemon_card}>
                <div className={style.pokemon_card__img}>
                  <img src={p.img ? p.img : "https://assets.stickpng.com/images/580b57fcd9996e24bc43c325.png"} alt="pokemon"/>
                </div>
                <div className={style.pokemon_card__types}>
                  <div className={style.pokemon_card__title_id}>
                    <h3>
                      #{p.idPoke ? p.idPoke : p.id}-{p.name}
                    </h3>
                  </div>
                  <div className={style.pokemon_card__types__spans}>
                    {p.type.map((t, index) => (
                      <span key={index} className={style[`${t}`]}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
    </>
  );
};
