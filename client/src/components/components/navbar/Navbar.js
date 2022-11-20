import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import classes from './navbar.module.scss';
import NavLogo from '../../../assets/logo/logo-pokemon.png';
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

export const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
  };


  return (
    <div className={classes.navbar}>
      <div className={classes.navbar__title_container}>
        <Link to={'/'}>
          <img
            src={NavLogo}
            className={classes.navbar__title_container__logo}
            alt="pokemon"
          ></img>
        </Link>
        <h1 className={classes.navbar__title_container__title}>PI Pokemon</h1>
      </div>
      <nav
        className={`${classes.navbar__nav} ${
          menuOpen && size.width < 768 ? classes.isMenu : ""
        }`}
      >
        <ul>
          <li>
            <Link to="/home" onClick={menuToggleHandler}>
              Pokedex
            </Link>
          </li>
          <li>
            <Link to="/create" onClick={menuToggleHandler}>
              Create
            </Link>
          </li>
        </ul>
      </nav>
      <div className={classes.navbar__toggle}>
        {!menuOpen ? (
          <BiMenuAltRight onClick={menuToggleHandler} />
        ) : (
          <AiOutlineClose onClick={menuToggleHandler} />
        )}
      </div>
    </div>
  );
};