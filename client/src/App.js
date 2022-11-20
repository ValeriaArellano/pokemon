import "./App.css";
import { useEffect } from "react";
import { Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LandingPage } from "./components/pages/LandingPage";
import { Pokedex } from "./components/pages/Pokedex/Pokedex";
import { Create } from "./components/pages/Create/Create";
import { Navbar } from "./components/components/navbar/Navbar";
import { getPokemons, getTypes } from "./redux/actions";
import { Pokemon } from "./components/components/pokemon/Pokemon";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTypes());
    dispatch(getPokemons());
  });

  return (
    <>
      <Navbar />
      <Route exact path="/pokedex/:id" >
        <Pokemon />
      </Route>
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route exact path="/home">
        <Pokedex />
      </Route>
      <Route exact path="/create">
        <Create />
      </Route>
    </>
  );
}

export default App;
